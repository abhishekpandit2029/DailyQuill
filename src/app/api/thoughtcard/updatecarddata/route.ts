import { connect } from "@/dbConfig/dbConfig";
import ThoughtCard from "@/models/thoughtCardModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PATCH(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id, title, content, tags, isSoftDelete } = reqBody;

        if (!id) {
            return NextResponse.json({ error: "Something went wrong, please try again later" }, { status: 400 });
        }

        const updatedThoughtCard = await ThoughtCard.findByIdAndUpdate(
            id,
            { title, content, tags, isSoftDelete },
            { new: true }
        );

        if (!updatedThoughtCard) {
            return NextResponse.json({ error: "Something went wrong, please try again later" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Content updated successfully",
            success: true,
            updatedThoughtCard,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
