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

export enum PRICE {
    SHIPPING_FEE = 25000,
}

export const GOOGLE_MAP_URL = import.meta.env.VITE_GOOGLE_MAP_URL;

