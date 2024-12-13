import { Schema, model } from "mongoose";
import { IPriceConfig } from "../interface/priceConfig.interface";
import { COLLECTION_DOCUMENT_NAME, COLLECTION_NAME_CONST, IS_ACTIVE } from '../utils/constants';

const priceConfigSchema = new Schema<IPriceConfig>({
    normalPerImagePrice: {
        type: Number,
        required: true
    },
    bulkPerImagePrice: {
        type: Number,
        required: true
    },
    // shippingFee: {
    //     type: Number,
    //     required: true
    // },
    bulkDiscountThreshold: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: IS_ACTIVE.DEFAULT,
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME_CONST.PRICE_CONFIG
})

export const priceConfigModel = model<IPriceConfig>(COLLECTION_DOCUMENT_NAME.PRICE_CONFIG, priceConfigSchema);
