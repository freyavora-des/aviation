import crypto from "node:crypto";

type SessionPayload = {
  sub: string;
  iat: number;
  exp: number;
};

function base64urlEncode(input: string | Buffer) {
  const buf = typeof input === "string" ? Buffer.from(input) : input;
  return buf
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function base64urlDecode(input: string) {
  const normalized = input.replaceAll("-", "+").replaceAll("_", "/");
  const pad = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Buffer.from(normalized + pad, "base64").toString("utf8");
}

function getSecret() {
  const secret = process.env["AUTH_SECRET"];
  if (!secret) throw new Error("Missing AUTH_SECRET");
  return secret;
}

export function createSessionToken(userId: string, ttlSeconds = 60 * 60 * 24 * 7) {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = { sub: userId, iat: now, exp: now + ttlSeconds };
  const payloadB64 = base64urlEncode(JSON.stringify(payload));
  const sig = crypto.createHmac("sha256", getSecret()).update(payloadB64).digest();
  const sigB64 = base64urlEncode(sig);
  return `${payloadB64}.${sigB64}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  const [payloadB64, sigB64] = token.split(".");
  if (!payloadB64 || !sigB64) return null;

  const expectedSig = crypto.createHmac("sha256", getSecret()).update(payloadB64).digest();
  const expectedSigB64 = base64urlEncode(expectedSig);
  const ok = crypto.timingSafeEqual(Buffer.from(expectedSigB64), Buffer.from(sigB64));
  if (!ok) return null;

  let payload: SessionPayload;
  try {
    payload = JSON.parse(base64urlDecode(payloadB64)) as SessionPayload;
  } catch {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  if (!payload.sub || typeof payload.exp !== "number") return null;
  if (payload.exp <= now) return null;
  return payload;
}

