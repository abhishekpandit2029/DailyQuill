import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import allUserCardData from "@/models/allUserCardDataModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, title, content, tags, full_name, userprofileImage } = reqBody;

        const newallUserCardData = new allUserCardData({
            title,
            content,
            tags,
            full_name,
            userprofileImage,
            username
        });

        const savedallUserCardData = await newallUserCardData.save();

        return NextResponse.json({
            success: true,
            savedallUserCardData,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
