import { Schema, model, Document } from "mongoose";
import { COLLECTION_NAME_CONST, ORDER_STATUS, COLLECTION_DOCUMENT_NAME } from "../utils/constants";
import { IAddress } from '../interface/address.interface';
import { ICustomer } from '../interface/customer.interface';
import { IOrderItem } from '../interface/orderItem.interface';
import { IPricing } from '../interface/pricing.interface';
import { IOrder } from '../interface/order.interface';

// Schemas
const addressSchema = new Schema<IAddress>({
    district: {
        type: String,
        required: true
    },
    ward: {
        type: String,
        required: true
    },
    detailAddress: {
        type: String,
        required: true
    }
}, { _id: false });

const customerSchema = new Schema<ICustomer>({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: addressSchema,
        required: true
    },
    note: {
        type: String,
        default: ''
    }
}, { _id: false });

const orderItemSchema = new Schema<IOrderItem>({
    imageUrl: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
}, { _id: false });

const pricingSchema = new Schema<IPricing>({
    totalQuantity: {
        type: Number,
        required: true
    },
    pricePerImage: {
        type: Number,
        required: true
    },
    // shippingFee: {
    //     type: Number,
    //     required: true
    // },
    totalAmount: {
        type: Number,
        required: true
    }
}, { _id: false });

// Main Schema
const orderSchema = new Schema<IOrder>({
    code: {
        type: String,
        required: true,
        unique: true
    },
    customer: {
        type: customerSchema,
        required: true
    },
    orderItems: {
        type: [orderItemSchema],
        required: true
    },
    pricing: {
        type: pricingSchema,
        required: true
    },
    status: {
        type: Schema.Types.ObjectId ,
        ref: COLLECTION_DOCUMENT_NAME.STATUS,
        required: true,
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME_CONST.ORDER
});

export const orderModel = model<IOrder>(COLLECTION_DOCUMENT_NAME.ORDER, orderSchema);