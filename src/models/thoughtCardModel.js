import mongoose from 'mongoose';

const thoughtCardSchema = new mongoose.Schema(
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
        isSoftDelete: {
            type: Boolean,
            default: false,
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
        userID: {
            type: String,
            required: [true, "Please provide a userprofileImage"],
        },
        likes: {
            type: [String],
            require: false,
        },
    },
    { timestamps: true }
);

const thoughtCard = mongoose.models.thoughtCards || mongoose.model("thoughtCards", thoughtCardSchema);

export default thoughtCard;