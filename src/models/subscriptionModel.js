import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        selectedPlan: { type: String, enum: ["Basic", "Premium", "Pro"], required: true },
        price: { type: Number, required: true },
        startDate: { type: Date, default: Date.now },
        endDate: { type: Date, required: true },
        paymentId: { type: String, required: true },
        status: { type: String, enum: ["active", "expired"] },
        planDuration: { type: String, enum: ["monthly", "year"], required: true },
        isSubscribed: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
);

const Subscriptions = mongoose.models.subscriptions || mongoose.model("subscriptions", subscriptionSchema);

export default Subscriptions;
