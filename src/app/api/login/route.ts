import { NextRequest, NextResponse } from "next/server";
import { Login } from "@/models/schemas";
import connectDB from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import axios from "axios";
import createToken from "@/lib/jwt";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  await connectDB();

  try {
    const user = await Login.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = createToken(user);

    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
