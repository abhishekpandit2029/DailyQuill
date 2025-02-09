import { connect } from "@/dbConfig/dbConfig";
import Subscriptions from "@/models/subscriptionModel"
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const { userId, selectedPlan, price, planDuration, paymentId } = await req.json();

    if (!userId || !selectedPlan || !price || !planDuration || !paymentId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    if (!["monthly", "year"].includes(planDuration)) {
      return NextResponse.json({ message: "Invalid plan duration" }, { status: 400 });
    }

    const startDate = new Date();
    const endDate = new Date();

    if (planDuration === "monthly") {
      endDate.setMonth(startDate.getMonth() + 1);
    } else if (planDuration === "year") {
      endDate.setFullYear(startDate.getFullYear() + 1);
    }

    const subscription = await Subscriptions.findOneAndUpdate(
      { userId },
      { userId, selectedPlan, price, planDuration, startDate, endDate, paymentId, status: "active", isSubscribed: true },
      { upsert: true, new: true }
    );

    // const subscription = await Subscription.create({
    //   userId,
    //   selectedPlan,
    //   price,
    //   planDuration,
    //   startDate,
    //   endDate,
    //   paymentId,
    //   status: "active",
    //   isSubscribed: true
    // });

    return NextResponse.json({ message: "Subscription activated", subscription }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}