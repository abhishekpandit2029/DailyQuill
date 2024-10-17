import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

connect();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});;

const uploadImage = async (image: string) => {
    try {
        const result = await cloudinary.v2.uploader.upload(image, {
            overwrite: true,
            invalidate: true,
            resource_type: "auto"
        });
        if (result.secure_url) {
            return result.secure_url;
        } else {
            throw new Error("Upload failed");
        }
    } catch (error: any) {
        throw new Error(error.message || "Image upload failed");
    }
};

export async function PATCH(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id, additional_name, bio, full_name, link, location, pronounce, language, link_alias, userprofile_image } = reqBody;

        if (!id) {
            return NextResponse.json({ error: "Something went wrong, please try again later" }, { status: 400 });
        }

        const secureUrl = await uploadImage(userprofile_image);
        console.log("secureUrl", secureUrl)

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { additional_name, bio, full_name, link, location, pronounce, language, link_alias, userprofile_image: secureUrl },
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
