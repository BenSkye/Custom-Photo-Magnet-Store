import { Schema, model } from "mongoose";
import { IProductCard } from '../interface/productCard.interface';
import { COLLECTION_DOCUMENT_NAME, COLLECTION_NAME_CONST } from '../utils/constants';

const productCardSchema = new Schema<IProductCard>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME_CONST.PRODUCT_CARD
})

export const productCardModel = model<IProductCard>(COLLECTION_DOCUMENT_NAME.PRODUCT_CARD, productCardSchema);