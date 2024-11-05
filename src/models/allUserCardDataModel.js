import mongoose from 'mongoose';

const allUserCardDataSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a Title"],
        },
        content: {
            type: String,
            required: [true, "Please provide a Content"],
        },
        tags: {
            type: [String],
            default: [],
            required: false,
        },
        username: {
            type: String,
            required: [true, "Please provide a username"],
        },
        full_name: {
            type: String,
            required: [true, "Please provide a full_name"],
        },
        userprofileImage: {
            type: String,
            required: [true, "Please provide a userprofileImage"],
        },
    },
    { timestamps: true }
);

const allUserCardData = mongoose.models.allUserCardDatas || mongoose.model("allUserCardDatas", allUserCardDataSchema);

export default allUserCardData;
