import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { Register } from "@/models/schemas";
import { hashPassword } from "@/lib/hashpassword";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email, password, name } = await request.json();

    const hashedPassword = hashPassword(password);

    const newUser = new Register({ email, password: hashedPassword, name });
    await newUser.save();

    return NextResponse.json(
      {
        message: "User registered successfully, Now you can log in.",
        success: true,
      },
      { status: 201 }
    );
  } catch (error: Error | unknown) {
    return NextResponse.json(
      {
        message: "User registration failed",
      },
      { status: 500 }
    );
  }
}
