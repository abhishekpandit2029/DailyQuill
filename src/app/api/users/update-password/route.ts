import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, new_password } = reqBody;

        if (!email || !new_password) {
            return NextResponse.json(
                { error: "All fields (email, new_password) are required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        const hashedNewPassword = await bcryptjs.hash(new_password, 12);
        user.password = hashedNewPassword;
        await user.save();

        const response = NextResponse.json({
            message: "Password updated successfully",
            success: true,
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
