const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const CLOUDFLARE_TEST_SECRET_KEY =
  '1x0000000000000000000000000000000AA';

function getSecretKey() {
  if (process.env.TURNSTILE_SECRET_KEY?.trim()) {
    return process.env.TURNSTILE_SECRET_KEY.trim();
  }

  if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return CLOUDFLARE_TEST_SECRET_KEY;
  }

  return '';
}

async function requireTurnstile(req, res, next) {
  const secretKey = getSecretKey();

  // Production activation requires a secret in the Lambda environment. This
  // keeps deployments backwards-compatible while the Cloudflare widget is set
  // up, and local development uses Cloudflare's always-pass test credentials.
  if (!secretKey) return next();

  const token = req.body?.turnstileToken;
  if (!token || typeof token !== 'string') {
    return res.status(400).json({
      message: 'Please complete the security check and try again.',
    });
  }

  try {
    const body = new URLSearchParams({
      secret: secretKey,
      response: token,
    });
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) throw new Error(`Turnstile returned ${response.status}`);

    const result = await response.json();
    if (!result.success) {
      return res.status(400).json({
        message: 'Security check expired or failed. Please try again.',
      });
    }

    delete req.body.turnstileToken;
    next();
  } catch (error) {
    console.error('Turnstile verification unavailable', error);
    res.status(503).json({
      message: 'Security check is temporarily unavailable. Please try again.',
    });
  }
}

export default requireTurnstile;
