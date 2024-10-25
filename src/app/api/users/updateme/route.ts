import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PATCH(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id, additional_name, bio, full_name, link, location, pronounce, language, link_alias, followersLists, followingsLists } = reqBody;

        if (!id) {
            return NextResponse.json({ error: "Something went wrong, please try again later" }, { status: 400 });
        }

        const followersListsArray = Array.isArray(followersLists) ? followersLists : [];
        const followingsListsArray = Array.isArray(followingsLists) ? followingsLists : [];

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                additional_name,
                bio,
                full_name,
                link,
                location,
                pronounce,
                language,
                link_alias,
                $push: {
                    followersLists: { $each: followersListsArray },
                    followingsLists: { $each: followingsListsArray }
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "Something went wrong, please try again later" }, { status: 404 });
        }

        return NextResponse.json({
            message: "user updated successfully",
            success: true,
            updatedUser,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
