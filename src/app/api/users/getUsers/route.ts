import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { useState } from "react";

connect();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("searchQuery");

    if (searchQuery) {
      const users = await User.find({
        $or: [
          { username: { $regex: searchQuery, $options: "i" } },
          { full_name: { $regex: searchQuery, $options: "i" } },
        ],
      }).select("-password");
      return NextResponse.json({
        message: "Users found",
        success: true,
        users,
      });
    }

    if (!searchQuery) {
      const users = await User.find().select("-password");
      return NextResponse.json({
        message: "Users found",
        success: true,
        users,
      });
    }

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

