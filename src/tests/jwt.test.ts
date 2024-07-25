import { encodeJwt, decodeJwt, validateJwt } from "../lib/jwt";

const SECRET = "testsecret";

test("should encode and decode JWT correctly", () => {
  const id = "user123";
  const payload = { name: "John Doe" };
  const jwt = encodeJwt(SECRET, id, payload, 3600);

  const decoded = decodeJwt(SECRET, jwt);
  expect(decoded.id).toBe(id);
  expect(decoded.payload).toMatchObject(payload);
  expect(decoded.expires_at).toBeInstanceOf(Date);
});

test("should validate JWT correctly", () => {
  const id = "user123";
  const payload = { name: "John Doe" };
  const jwt = encodeJwt(SECRET, id, payload, 3600);
  console.log("jwt", jwt);
  expect(validateJwt(SECRET, jwt)).toBe(true);
});

test("should invalidate JWT with wrong secret", () => {
  const id = "user123";
  const payload = { name: "John Doe" };
  const jwt = encodeJwt(SECRET, id, payload, 3600);

  expect(validateJwt("wrongsecret", jwt)).toBe(false);
});
