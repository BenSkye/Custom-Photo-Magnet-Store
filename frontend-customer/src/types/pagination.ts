import { SORT_ORDER } from '../utils/constants';

export interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: SORT_ORDER.ASC | SORT_ORDER.DESC;
}
