export interface IPriceConfig{
    _id: string;
    normalPerImagePrice: number;
    bulkPerImagePrice: number;
    // shippingFee: number;
    bulkDiscountThreshold: number;
    isActive: boolean;
}

export interface IPriceConfigCreate {
    normalPerImagePrice: number;
    bulkPerImagePrice: number;
    // shippingFee: number;
    bulkDiscountThreshold: number;
}

