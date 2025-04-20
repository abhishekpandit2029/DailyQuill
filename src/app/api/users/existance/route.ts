import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const nodemailer = require("nodemailer");

connect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, type } = body;
    if (!email) {
      return NextResponse.json({ exists: false, error: 'Email is required' }, { status: 500 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ exists: false, error: 'User does not exist' }, { status: 500 });
    }

    if (password) {
      const isPasswordCorrect = await bcryptjs.compare(password, user.password);
      if (!isPasswordCorrect) {
        return NextResponse.json({ exists: false, error: 'Invalid password' }, { status: 500 });
      }
    }

    const tokenData = {
      email, password, type, cat: Date.now(), db_password: user.password,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '15m',
    });

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `DailyQuill > ${type} password request`,
      html: `<div
        style="font-family: 'Arial', sans-serif; margin: 0; padding: 10px; padding-right: 20px; padding-left: 20px; padding-bottom: 20px;  background-color: #f4f7fa; max-width: 800px; margin: 0 auto; background-color: #ffffff; border-radius: 8px;">
        <div style="font-size: 16px; line-height: 1.4;">
            <p style="font-size: 16px;">Hey ${user?.username},</p>
            <p style="font-size: 15px;">We received a request to ${type} your password on DailyQuill.</p>
            <p style="font-size: 15px;">If you ${type} your password, don't worry! We've got you covered. Simply click
                <span><a href="https://dailyquill.vercel.app/auth/redirect-rpfp?token=${token}">here</a></span> to ${type} it.
            </p>
            <p style="font-size: 15px;">If you didn't request this, please ignore this email or contact us if you have
                any concerns.</p>
        </div>
    </div>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      exists: true,
      message: 'User found, email sent',
      email: user.email,
      full_name: user.full_name,
      username: user.username,
      password: user.password,
      token,
      type
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ exists: false, error: 'Internal server error' }, { status: 500 });
  }
}
