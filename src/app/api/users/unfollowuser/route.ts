import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PATCH(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id, followersId } = reqBody;

        if (!id || !followersId) {
            return NextResponse.json({ error: "Invalid data provided" }, { status: 400 });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $pull: { followersLists: { follower_id: followersId }, followingsLists: { follower_id: followersId } } },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User successfully unfollowed",
            success: true,
            updatedUser,
        });
    } catch (error: any) {
        console.log(error, "error");
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
