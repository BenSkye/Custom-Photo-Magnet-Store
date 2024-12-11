import { ICustomer } from './customer.interface';
import { IOrderItem } from './orderItem.interface';
import { IPricing } from './pricing.interface';

export interface IOrder extends Document {
    customer: ICustomer;
    orderItems: IOrderItem[];
    pricing: IPricing;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IOrderRequest {
    customer: {
        fullName: string;
        phone: string;
        address: {
            district: string;
            ward: string;
            detailAddress: string;
        };
        note?: string;
    };
    orderItems: Array<{
        imageUrl: string;
        quantity: number;
    }>;
}