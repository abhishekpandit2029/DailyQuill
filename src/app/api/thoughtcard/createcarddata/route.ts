import { connect } from "@/dbConfig/dbConfig";
import thoughtCardModel from "@/models/thoughtCardModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, title, content, tags, isSoftDelete, full_name, userprofileImage, userID } = reqBody;

        if (!username) {
            return NextResponse.json({ error: "Username is required" }, { status: 400 });
        }

        const newThoughtCard = new thoughtCardModel({
            title,
            content,
            tags,
            isSoftDelete,
            username,
            full_name,
            userprofileImage,
            userID
        });

        const ThoughtCards = await newThoughtCard.save();

        return NextResponse.json({
            message: "Thought created successfully",
            success: true,
            ThoughtCards,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
