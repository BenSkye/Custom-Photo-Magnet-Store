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

export interface OrderItem {
    imageUrl: string;
    quantity: number;
}

export interface Address {
    district: string;
    ward: string;
    detailAddress: string;
}

export interface Customer {
    fullName: string;
    phone: string;
    address: Address;
    note: string;
}
export interface Pricing {
    totalAmount: number;
    totalQuantity: number;
    pricePerImage: number;
}
export interface Order {
    _id: string;
    customer: Customer;
    orderItems: OrderItem[];
    pricing: Pricing;
    status: string;
    createdAt: string;
    updatedAt: string;
}

