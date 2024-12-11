export interface IPriceConfig extends Document {
    _id: string;
    normalPerImagePrice: number;
    bulkPerImagePrice: number;
    shippingFee: number;
    bulkDiscountThreshold: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}