import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Otp from "@/models/otpModel";
import User from "@/models/userModel";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { defaultProfileImage } from "@/constants/strings";
import bcrypt from "bcryptjs";

connect();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, hasUser, currentPassword, isResetPassword = false } = body;

  const existingUser = await User.findOne({ email });
  if (existingUser && !hasUser) {
    return NextResponse.json(
      { message: "Email is already in use. Please use another." },
      { status: 409 }
    );
  }

  if (hasUser) {
    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found with this email." },
        { status: 404 }
      );
    }

    if (isResetPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { message: "Current password is wrong." },
          { status: 400 }
        );
      }

      if (!existingUser.password) {
        return NextResponse.json(
          { message: "User has no password set." },
          { status: 400 }
        );
      }

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        existingUser.password
      );

      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Current password is incorrect." },
          { status: 401 }
        );
      }
    }
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

  await Otp.deleteMany({ email });
  await Otp.create({ email, otp: hashedOtp, expiresAt });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "🛡️ Your DailyQuill Verification Code",
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>DailyQuill's Verification</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Segoe UI, Tahoma, Geneva, Verdana, sans-serif;">
      
          <div style="width:100%; padding: 40px 0;">
            <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 440px; background-color: #ffffff; border-radius:12px; padding: 40px; margin: 0 auto;">
      
              <tr>
                <td style="font-size:22px; font-weight:bold; color:#111; padding-bottom:10px; text-align:center;">
                  <img src="${defaultProfileImage}" alt="DailyQuill" width="60" style="vertical-align:middle;" />
                  <span style="font-size:22px; font-weight:bold;">DailyQuill</span>
                </td>
              </tr>

              <tr>
                <td style="font-size:20px; font-weight:600; text-align:center; padding-bottom:10px;">
                  Let’s sign you up
                </td>
              </tr>

              <tr>
                <td style="font-size:13px; color:#555; text-align:center; padding-bottom:15px;">
                  Here’s your DailyQuill verification code.<br />
                  It expires in 2 minutes, so be sure to use it soon.</strong>.
                </td>
              </tr>

              <tr>
                <td style="padding-bottom:15px; text-align:center;">
                  <table align="center" cellpadding="0" cellspacing="10">
                    <tr>
                      ${otp
                        .split("")
                        .map(
                          (d) => `
                        <td style="font-size:20px; font-weight:600; border-bottom:2px solid #333; padding: 0 6px;">
                          ${d}
                        </td>
                      `
                        )
                        .join("")}
                    </tr>
                  </table>
                </td>
              </tr>
                      
              <tr>
                <td style="font-size:13px; color:#444; text-align:center; padding-bottom:5px;">
                  This code will securely sign you up using
                </td>
              </tr>
                      
              <tr>
                <td style="font-size:13px; font-weight:600; color:#637eff; text-align:center; padding-bottom:10px;">
                  ${email}
                </td>
              </tr>
                      
              <tr>
                <td style="font-size:11px; color:#999; text-align:center;">
                  If you didn’t request this email, you can safely ignore it.
                </td>
              </tr>
            </table>
          </div>
        </body>
      </html>
      `,
  });

  return NextResponse.json({
    message: "OTP sent successfully",
    name: existingUser?.username || "",
  });
}
