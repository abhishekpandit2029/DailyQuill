import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Otp from "@/models/otpModel";
import User from "@/models/userModel";
import crypto from "crypto";

connect();

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    // Get latest OTP for the email (assuming only 1 record exists per email as per your logic)
    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return NextResponse.json(
        { message: "OTP not found. Please request a new one." },
        { status: 400 }
      );
    }

    // Check if OTP is expired
    const now = new Date();
    if (otpRecord.expiresAt < now) {
      await Otp.deleteOne({ email });
      return NextResponse.json(
        { message: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Compare hashed OTP
    const hashedInput = crypto.createHash("sha256").update(otp).digest("hex");
    if (otpRecord.otp !== hashedInput) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    // Delete the OTP after successful verification
    await Otp.deleteOne({ email });

    return NextResponse.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
