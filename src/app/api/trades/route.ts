import connectDB from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { Trade } from "@/models/schemas";

export async function POST(req: NextRequest) {
  const { userId, symbol, type, volume } = await req.json();

  if (!userId || !symbol || !type || !volume) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    await Trade.create({ userId, symbol, type, volume });

    return NextResponse.json(
      { message: "Trade executed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Trade error:", error);
    return NextResponse.json(
      { error: "Failed to execute trade" },
      { status: 500 }
    );
  }
}
