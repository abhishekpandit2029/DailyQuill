import { connect } from "@/dbConfig/dbConfig";
import thoughtCardModel from "@/models/thoughtCardModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connect();

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userID = searchParams.get("userID");
        const blogID = searchParams.get("blogID");

        let thoughtCards;

        if (userID) {
            thoughtCards = await thoughtCardModel.find({ userID }).sort({ _id: -1 });
        } else if (blogID) {
            thoughtCards = await thoughtCardModel.find({ _id: blogID });
        } else {
            thoughtCards = await thoughtCardModel.find().sort({ _id: -1 });;
        }

        return NextResponse.json({
            message: "Thoughts fetched successfully",
            success: true,
            thoughtCards,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
