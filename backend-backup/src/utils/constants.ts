export const COLLECTION_NAME_CONST = {
    USER: 'users',
    ORDER: 'Orders',
    FEEDBACK: 'Feedbacks',
    PRICE_CONFIG: 'PriceConfigs',
    STATUS: 'StatusOrders',
}

export const COLLECTION_DOCUMENT_NAME = {
    ORDER: 'Order',
    FEEDBACK: 'Feedback',
    PRICE_CONFIG: 'PriceConfig',
    STATUS: 'StatusOrder',
}

export const ORDER_STATUS = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    SHIPPING: 'shipping',
    DELIVERED: 'delivered',
    FAILED: 'failed',
}

// export const PRICE = {
//     PRICE_PER_IMAGE: 25000,
//     BULK_DISCOUNT_PRICE: 20000,
//     PRICE_SHIPPING: 25000,
// }

export const PRICE_CONFIG = {
    MIN: 0,
    MAX: 1000000000,
}

export const BULK = {
    BULK_DISCOUNT_THRESHOLD: 6
}

export const LIMIT = {
    DEFAULT_LIMIT: 10,
    DEFAULT_PAGE: 1,
}

export const SORT_BY = {
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
}

export const STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
}

export const RATING = {
    MIN: 1,
    MAX: 5,
}

export const COMMENT = {
    MIN_LENGTH: 1,
    MAX_LENGTH: 400,
}

export const IS_ACTIVE = {
    DEFAULT: true,
    DEFAULT_INACTIVE: false,
}


