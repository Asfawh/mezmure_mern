import dotenv from 'dotenv';
import { jwtVerify } from 'jose';

dotenv.config();

function getSecret() {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is required');
  }

  return new TextEncoder().encode(process.env.JWT_SECRET);
}

function getBearerToken(req) {
  const authorization = req.get('authorization');

  if (!authorization?.startsWith('Bearer ')) {
    return null;
  }

  return authorization.slice(7).trim();
}

async function authenticate(req, res, next, required) {
  const token = getBearerToken(req);

  if (!token) {
    if (required) {
      return res.status(401).json({ message: 'Please log in to continue.' });
    }

    return next();
  }

  try {
    const { payload } = await jwtVerify(token, getSecret());
    req.userId = payload.id;
    return next();
  } catch {
    return res.status(401).json({ message: 'Your login has expired. Please log in again.' });
  }
}

function requireAuth(req, res, next) {
  return authenticate(req, res, next, true);
}

function optionalAuth(req, res, next) {
  return authenticate(req, res, next, false);
}

export { optionalAuth, requireAuth };
