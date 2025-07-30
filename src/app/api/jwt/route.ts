import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  const { type, token } = await request.json();

  function verifyToken(token: string) {
    try {
      const decodedUser = jwt.verify(
        token,
        JWT_SECRET as string
      ) as jwt.JwtPayload;
      return decodedUser;
    } catch (error) {
      console.error("Token verification failed:", error);
      return null;
    }
  }

  if (type === "verify") {
    console.log("Verifying token:", token);
    const decodedUser = verifyToken(token);
    if (!decodedUser) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    return NextResponse.json({ user: decodedUser }, { status: 200 });
  }
}
