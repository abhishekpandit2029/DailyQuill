import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

connect();

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    const currentUserId = decoded.userId;
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("searchQuery");
    let filter: any = { _id: { $ne: currentUserId } };

    if (searchQuery) {
      if (mongoose.isValidObjectId(searchQuery)) {
        filter._id = { $ne: currentUserId, $eq: searchQuery };
      } else {
        filter.$or = [
          { username: { $regex: searchQuery, $options: "i" } },
          { full_name: { $regex: searchQuery, $options: "i" } },
        ];
      }
    }

    const users = await User.find(filter).select("-password");

    return NextResponse.json({
      message: "Users found",
      success: true,
      users,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
