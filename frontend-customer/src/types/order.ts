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