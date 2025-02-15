import { ICustomer } from './customer.interface';
import { IOrderItem } from './orderItem.interface';
import { IPricing } from './pricing.interface';
import { IOrderStatus } from './status.interface';

export interface IOrder extends Document {
    code: string;
    customer: ICustomer;
    orderItems: IOrderItem[];
    pricing: IPricing;
    status: IOrderStatus;
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