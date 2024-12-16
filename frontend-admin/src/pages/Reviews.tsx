import { useEffect, useState } from 'react';
import { AnimateWrapper } from '../utils/animate/AnimateWrapper';
import ReviewComments from '../components/sections/review/ReviewComments';
import { Review } from '../types/review';
import { LIMIT_PER_PAGE, SORT_BY, SORT_ORDER } from '../utils/constants';
import { getReviews } from '../services/reviewService';
import { PaginationParams } from '../types/pagination';
import { message } from 'antd';

export default function Reviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [pagination, setPagination] = useState<PaginationParams>({
        page: 1,
        limit: LIMIT_PER_PAGE,
        sortBy: SORT_BY.CREATED_AT,
        sortOrder: SORT_ORDER.DESC
    });

    useEffect(() => {
        const fetchReviews = async () => {
            setReviewsLoading(true);
            try {
                const response = await getReviews(pagination);
                setReviews(response.metadata.data);
                setTotalItems(response.metadata.pagination.totalItems);
            } catch (error) {
                console.error('Error getting reviews:', error);
                message.error('Không thể tải bình luận. Vui lòng thử lại!');
            } finally {
                setReviewsLoading(false);
            }
        };
        fetchReviews();
    }, [pagination]);

    // Handle pagination change
    const handlePageChange = (page: number, pageSize: number) => {
        setPagination({
            ...pagination,
            page: page,
            limit: pageSize
        });
    };

    // Create review

    return (
        <div className="container mx-auto lg:px-4">
            <AnimateWrapper delay={0.2} variant='slideDown' >
                <h1 className="text-3xl font-bold text-center mb-4">ĐÁNH GIÁ</h1>
            </AnimateWrapper>

            {/* Review Comments Component */}
            <AnimateWrapper delay={0.2} variant='slideRight' >
                <ReviewComments
                    reviews={reviews}
                    loading={reviewsLoading}
                    totalItems={totalItems}
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />
            </AnimateWrapper>
        </div>
    );
}