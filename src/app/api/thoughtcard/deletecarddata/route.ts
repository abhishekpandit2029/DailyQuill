import { connect } from "@/dbConfig/dbConfig";
import thoughtCardModel from "@/models/thoughtCardModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: "Something went wrong, please try again later" }, { status: 400 });
        }

        const deletedThoughtCard = await thoughtCardModel.findByIdAndDelete(id);

        if (!deletedThoughtCard) {
            return NextResponse.json({ error: "Something went wrong, please try again later" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Content deleted successfully",
            success: true,
            deletedThoughtCard,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
