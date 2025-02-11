import { NextResponse, NextRequest } from "next/server";
import Subscriptions from "@/models/subscriptionModel"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(req: NextRequest, { params }: { params: Params }) {
    try {
        const { userId } = params;

        if (!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        const subscription = await Subscriptions.findOne({ userId });

        if (!subscription) {
            return NextResponse.json({ subscription: { isSubscribed: false, status: "expired", message: "No active subscription" } }, { status: 200 });
        }

        // ✅ Check if subscription is expired
        const currentDate = new Date();
        if (currentDate > subscription.endDate) {
            // ✅ Only update DB if status is still "active"
            if (subscription.status !== "expired") {
                await Subscriptions.updateOne({ userId }, { status: "expired", isSubscribed: false, });
            }
            return NextResponse.json({ subscription: { isSubscribed: false, status: "expired", message: "No active subscription" } }, { status: 200 });
        }

        return NextResponse.json({ subscription }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            message: "Server error", error: "Subscription Fetch Error"
        }, { status: 500 });
    }
}
