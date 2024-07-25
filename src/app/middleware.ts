// src/app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateJwt } from "../lib/jwt";

const SECRET = "testsecret";

export function middleware(request: NextRequest) {
  console.log("Received request:", request.url); // Log request URL
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");

  if (token) {
    console.log("Token found:", token); // Log token
    if (validateJwt(SECRET, token)) {
      console.log("JWT is valid");
      return NextResponse.next();
    } else {
      console.log("JWT is invalid");
    }
  } else {
    console.log("No token found");
  }

  return NextResponse.json({ message: "unauthorized" }, { status: 401 });
}

export const config = {
  matcher: ["/api/protected/:path*"],
};
