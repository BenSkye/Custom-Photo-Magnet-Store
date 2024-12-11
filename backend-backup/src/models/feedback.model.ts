import { Schema, model, Document } from "mongoose";
import { IFeedback } from '../interface/feedback.interface';
import { COLLECTION_DOCUMENT_NAME, COLLECTION_NAME_CONST, IS_ACTIVE } from "../utils/constants";

const feedbackSchema = new Schema<IFeedback>({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: IS_ACTIVE.DEFAULT
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME_CONST.FEEDBACK
});

export const feedbackModel = model<IFeedback>(COLLECTION_DOCUMENT_NAME.FEEDBACK, feedbackSchema);
