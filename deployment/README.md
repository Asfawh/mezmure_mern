# Mezmure AWS deployment

This deployment uses S3 + CloudFront for the Vite client and API Gateway +
Lambda for the Express API. MongoDB remains in Atlas. The AWS provider uses the
`habtamua` profile and `us-west-2`; the CloudFront certificate is created in
`us-east-1` as required by AWS.

Secrets are deliberately not represented as Terraform variables because values
passed through Terraform would be retained in state. Configure `MONGODB_URI` and
`JWT_SECRET` directly on the Lambda after the first apply. The production
Turnstile secret follows the same rule and is stored as `TURNSTILE_SECRET_KEY`
in the Lambda environment, never in Terraform or Git.

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

## Low-cost abuse protection

The AWS configuration limits the HTTP API to a target of 10 requests per
second with a burst of 20. The AWS account currently has an account-wide Lambda
concurrency quota of 10, which is already the lowest usable cap: AWS requires
all 10 executions to remain unreserved, so a lower function-level reservation
cannot be configured unless the account quota is first increased. CloudFront
applies HSTS, Content Security Policy, clickjacking, content-type, referrer,
and browser-permission headers to both the site and API. These controls have no
separate fixed monthly charge.

`client/public/robots.txt` keeps normal search-engine discovery enabled while
asking crawlers not to visit API and authenticated paths and opting out of
several common AI-training crawlers. It is crawler guidance, not an access
control.

Cloudflare Turnstile is integrated into registration and login. Local
development automatically uses Cloudflare's published always-pass test keys.
To activate real production verification:

1. Create a free Turnstile widget allowing `mezmure.org` and
   `www.mezmure.org`.
2. Add its public site key as the GitHub Actions repository variable
   `VITE_TURNSTILE_SITE_KEY`.
3. Add its secret key to the existing Lambda environment as
   `TURNSTILE_SECRET_KEY`, preserving every existing environment variable.

The server intentionally enables production verification only when the secret
is configured, so a frontend deployment cannot lock out users while the widget
is being provisioned. The former public `GET /api/users` route was removed
because it was unused and exposed account records to unauthenticated clients.

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
