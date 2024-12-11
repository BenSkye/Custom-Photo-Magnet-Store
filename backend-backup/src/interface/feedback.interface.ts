export interface IFeedback {
    name: string;
    role: string;
    comment: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

export interface IFeedbackQuery {
    page?: number;
    limit?: number;
    sortBy?: string;
    status?: string;
}

export interface IFeedbackData {
    name: string;
    role: string;
    comment: string;
    rating: number;
}
