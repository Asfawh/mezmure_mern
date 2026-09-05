# Mezmure AWS deployment

This deployment uses S3 + CloudFront for the Vite client and API Gateway +
Lambda for the Express API. MongoDB remains in Atlas. The AWS provider uses the
`habtamua` profile and `us-west-2`; the CloudFront certificate is created in
`us-east-1` as required by AWS.

Secrets are deliberately not represented as Terraform variables because values
passed through Terraform would be retained in state. Configure `MONGODB_URI` and
`JWT_SECRET` directly on the Lambda after the first apply.

The `.com` redirect should be added only after `mezmure.com` is registered and
delegated. As of 2026-07-21 the registry reports that the domain is not registered.

## Automatic production deployment

`.github/workflows/deploy-production.yml` deploys every push to `main` and can
also be run manually from the GitHub Actions page. It builds the Vite client,
packages and updates the Lambda API, syncs the client to S3, waits for the
CloudFront invalidation, and verifies the public site and health endpoint.

The workflow uses GitHub OIDC to assume the
`mezmure-github-actions-deploy` role. The trust policy accepts tokens only from
`Asfawh/mezmure_mern` on `refs/heads/main`, and its deployment policy is limited
to the production site bucket, Lambda function, and CloudFront distribution.
No AWS access keys or application secrets are stored in GitHub.

## Observability cost controls

The production Lambda log group is retained for 14 days and is managed by
Terraform. New Relic credentials must be stored outside Git and Terraform
state. When New Relic monitoring is enabled, use an SSM SecureString parameter
for the ingest/license key, filter CloudWatch Metric Streams to Lambda and API
Gateway namespaces only, and keep browser session replay and direct MongoDB
monitoring disabled.

The Lambda reads its New Relic ingest key from the standard-tier SecureString
parameter `/mezmure/newrelic/license-key`. Its execution role can read only that
parameter. The Node 22 ARM64 slim layer omits OpenTelemetry dependencies, and
function, platform, and extension log forwarding are disabled to limit ingest
and CloudWatch volume while retaining APM metrics, errors, and traces.

### Production monitoring inventory

The deployed low-cost configuration consists of:

- New Relic APM application `Mezmure API Production`, instrumented with the
  New Relic Node 22 ARM64 slim Lambda layer.
- New Relic browser application `Mezmure Web Production`. The production-only
  client agent records page views, SPA navigation, AJAX timing, and JavaScript
  errors. Session replay, session traces, browser logs, cookies, custom generic
  events, resource timing, and request/response payload capture are disabled.
- CloudWatch metric stream `mezmure-newrelic-metrics`, filtered to exactly
  `AWS/Lambda` and `AWS/ApiGateway`. Its Firehose uses failed-data-only backup
  in the private bucket
  `mezmure-newrelic-metrics-590183935654-us-west-2`; failed backup objects
  expire after 14 days and Firehose CloudWatch logging is disabled.
- Synthetic monitor `Mezmure Production Health`, which checks
  `https://mezmure.org/api/health` from `US_WEST_2` every 10 minutes.
- Alert policy `Mezmure Production`, with conditions for a failing health
  check, Lambda errors, and API Gateway 5xx responses. The enabled workflow
  `Mezmure Production Email Alerts` routes policy issues to the production
  email destination.
- Private dashboard `Mezmure Production Observability`, covering health-check
  success, Lambda invocations/errors, API Gateway requests, and API response
  time. API Gateway 5xx responses remain covered by the alert condition.

The browser key present in the compiled client configuration is New Relic's
public browser ingest identifier, not the Lambda license key or a New Relic
management API key. Never substitute the SSM license key or a user API key into
client code. New Relic management keys are needed only while changing the
account configuration and must not be committed. The dedicated management key
is retained in the standard-tier SecureString parameter
`/mezmure/newrelic/user-api-key`; the Lambda role has no permission to read it.

## CloudFront Free plan

The production distribution uses AWS managed cache and origin-request policies
and `PriceClass_All` so it is compatible with the CloudFront flat-rate Free
plan. A dedicated CloudFront Function preserves the site's CSP, HSTS,
Turnstile, New Relic, and
PayPal response-header allowances without relying on a custom response-header
policy. The dedicated CloudFront-scope WAF applies a Free-plan-compatible
global per-IP limit of 1,000 requests per five minutes. API Gateway separately
limits the API to 10 requests per second with a burst of 20.

The pricing-plan subscription itself is managed through AWS
PricingPlanManager, which is not represented by the pinned Terraform AWS
provider. The subscription must contain exactly this distribution and its
dedicated WAF web ACL. Do not share the function or WAF ACL with another
distribution because flat-rate plan resources must be exclusive to one plan.
The active Free subscription also contains the `mezmure.org` Route 53 hosted
zone so its standard hosted-zone, record, and DNS-query charges are covered by
the plan. Terraform manages the compatible distribution, function, WAF, and
throttling configuration; do not cancel or detach the PricingPlanManager
subscription when applying future infrastructure changes.
