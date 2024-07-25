import crypto from "crypto";
import { base64UrlEncode, base64UrlDecode } from "../utils/utils";
import { JwtHeader, JwtPayload, DecodedJwt } from "./types";

const ALGORITHM = "HS256";

function createSignature(
  secret: string,
  header: string,
  payload: string
): string {
  const data = `${header}.${payload}`;
  return base64UrlEncode(
    crypto.createHmac("sha256", secret).update(data).digest("base64")
  );
}

export function encodeJwt(
  secret: string,
  id: string | number,
  payload: JwtPayload,
  ttl?: number
): string {
  const header: JwtHeader = { alg: ALGORITHM, typ: "JWT" };
  const payloadWithClaims: JwtPayload = {
    ...payload,
    sub: id,
    exp: ttl ? Math.floor(Date.now() / 1000) + ttl : undefined,
  };
  const payloadStr = JSON.stringify(payloadWithClaims);

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(payloadStr);
  const signature = createSignature(secret, encodedHeader, encodedPayload);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function decodeJwt(secret: string, jwt: string): DecodedJwt {
  const [header, payload, signature] = jwt.split(".");

  if (createSignature(secret, header, payload) !== signature) {
    throw new Error("Invalid signature");
  }

  const decodedPayload = base64UrlDecode(payload);
  const payloadObj: JwtPayload = JSON.parse(decodedPayload);
  if (payloadObj.exp && payloadObj.exp < Math.floor(Date.now() / 1000)) {
    throw new Error("Token expired");
  }

  return {
    id: payloadObj.sub!,
    payload: payloadObj,
    expires_at: new Date(payloadObj.exp ? payloadObj.exp * 1000 : Date.now()),
  };
}

export function validateJwt(secret: string, jwt: string): boolean {
  try {
    decodeJwt(secret, jwt);
    return true;
  } catch {
    return false;
  }
}
