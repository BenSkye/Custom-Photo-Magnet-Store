export interface PaginationOptions {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc' ;
}

export interface PaginatedResult {
    data: any[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        limit: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}
