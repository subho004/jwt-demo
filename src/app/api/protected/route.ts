import { NextResponse } from "next/server";
import { encodeJwt, validateJwt } from "../../../lib/jwt";

const SECRET = "testsecret";

export async function GET(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  console.log("Received token", token);
  //   const id = "user123";
  //   const payload = { name: "John Doe" };
  //   const jwt = encodeJwt(SECRET, id, payload, 3600);
  //   console.log("jwt", jwt);
  console.log(validateJwt(SECRET, token!));
  if (!token || !validateJwt(SECRET, token)) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ message: "Authorized" });
}

// export async function GET(request: Request) {
//   // Extract the token from the request headers
//   const token = request.headers.get("Authorization")?.replace("Bearer ", "");

//   // You can log or handle the token if needed, but do not validate it
//   console.log("Received token:", token);

//   // Return a response indicating the auth check passed
//   return NextResponse.json({ message: "Auth check passed" });
// }
