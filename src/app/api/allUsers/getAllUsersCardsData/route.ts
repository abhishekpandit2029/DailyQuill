import { connect } from "@/dbConfig/dbConfig";
import allUserCardData from "@/models/allUserCardDataModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const thoughtCards = await allUserCardData.find();

    return NextResponse.json({
      thoughtCards,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
