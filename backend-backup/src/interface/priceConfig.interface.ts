export interface IPriceConfig{
    _id: string;
    normalPerImagePrice: number;
    bulkPerImagePrice: number;
    superBulkPerImagePrice: number;
    // shippingFee: number;
    bulkDiscountThreshold: number;
    superBulkThreshold: number;
    isActive: boolean;
}

export interface IPriceConfigCreate {
    normalPerImagePrice: number;
    bulkPerImagePrice: number;
    superBulkPerImagePrice: number;
    // shippingFee: number;
    bulkDiscountThreshold: number;
    superBulkThreshold: number;
}

