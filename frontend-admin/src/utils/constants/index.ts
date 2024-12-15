export const FIREBASE_STORAGE_URL = '';
export const FIREBASE_STORAGE_PATH = {
    ORDERS_IMG: 'orders',
    PRODUCTS_IMG: 'products',
    FEEDBACKS_IMG: 'feedbacks',
};

export const PROVINCE_ID = {
    HOCHIMINH_ID: '79',
}

export const ZALO_PHONE = '0357223172';

export enum ORDER_STATUS {
    SUCCESS = 'success',
    FAILURE = 'failure',
}

export const STATUS_CODE = {
    CREATE_SUCCESS: 201,
    CREATE_ERROR: 400,
    UPDATE_SUCCESS: 200,
    UPDATE_ERROR: 400,
    DELETE_SUCCESS: 200,
    DELETE_ERROR: 400,
}

export const ANONYMOUS_REVIEW_LIMIT = 10;
export const LIMIT_PER_PAGE = 10;

export enum SORT_BY {
    CREATED_AT = 'createdAt',
    UPDATED_AT = 'updatedAt',
}

export enum SORT_ORDER {
    ASC = 'asc',
    DESC = 'desc',
}

export const ORDER_STATUS_LABEL = {
    pending: 'Chờ xử lý',
    processing: 'Đang xử lý',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy'
} as const;

export type OrderStatus = keyof typeof ORDER_STATUS_LABEL;

export const getOrderStatusLabel = (status: OrderStatus): string => {
    return ORDER_STATUS_LABEL[status] || status;
};

// Màu sắc cho từng trạng thái
export const ORDER_STATUS_COLORS = {
    pending: 'gold',
    processing: 'blue',
    completed: 'green',
    cancelled: 'red'
} as const;

export const GOOGLE_MAP_URL = import.meta.env.VITE_GOOGLE_MAP_URL;

