import { connect } from "@/dbConfig/dbConfig";
import getThoughtCardModel from "@/models/thoughtCardModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get("username");

        if (!username) {
            return NextResponse.json({ error: "Username is required" }, { status: 400 });
        }

        const ThoughtCard = getThoughtCardModel(username);

        const thoughtCards = await ThoughtCard.find();

        return NextResponse.json({
            message: "Thoughts fetched successfully",
            success: true,
            thoughtCards,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
