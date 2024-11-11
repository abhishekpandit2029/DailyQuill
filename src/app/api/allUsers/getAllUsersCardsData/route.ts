import { connect } from "@/dbConfig/dbConfig";
import allUserCardData from "@/models/allUserCardDataModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET() {
  try {
    const thoughtCards = await allUserCardData.find();

    const response = NextResponse.json({
      thoughtCards,
    });

    response.headers.set('Cache-Control', 'no-cache, must-revalidate');
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
