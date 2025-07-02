// 1. Create token by encoding payload + secret key + timestamp
// 2. Validate token by decoding and checking expiry

export function generateToken(
  payload: string,
  secret: string,
  expiryMs: number
): string {
  const timestamp = Date.now() + expiryMs;
  const token = btoa(`${payload}|${timestamp}|${secret}`);
  return token;
}

export function validateToken(token: string, secret: string): boolean {
  try {
    const decoded = atob(token);
    const [, timestamp, tokenSecret] = decoded.split("|");

    if (tokenSecret !== secret) return false;
    if (Date.now() > parseInt(timestamp)) return false;

    return true;
  } catch {
    return false;
  }
}
