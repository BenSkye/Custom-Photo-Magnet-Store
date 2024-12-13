import { ArrowRightOutlined, StarFilled, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Review } from '../../../types/review';
import { useEffect, useState } from 'react';
import { getReviews } from '../../../services/reviewService';
import { PaginationParams } from '../../../types/pagination';
import { SORT_BY, SORT_ORDER } from '../../../utils/constants';
import { calculateTimeDistance } from '../../../utils/format/formateDate';
import { ReviewModal } from '../../modal/PopupReviewModal';
import { Tooltip } from 'antd';
import ReviewCardSkeleton from '../../skeleton/ReviewCardSkeleton';

export const AnonymousReviewSection = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const paginationParams: PaginationParams = {
        page: 1,
        limit: 4,
        sortBy: SORT_BY.CREATED_AT,
        sortOrder: SORT_ORDER.DESC
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await getReviews(paginationParams);
                setReviews(response.metadata.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    const handleOpenModal = (review: Review) => {
        setSelectedReview(review);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseModal = () => {
        setSelectedReview(null);
        document.body.style.overflow = 'unset';
    };


    return (
        <section className="lg:py-6 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-center mb-6 lg:mb-8">
                    ĐÁNH GIÁ TRÊN TRANG
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <ReviewCardSkeleton key={index} />
                        ))
                    ) : (
                        reviews.map((review, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                onClick={() => handleOpenModal(review)}
                            >
                                {/* User Info */}
                                <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                        <UserOutlined className="text-xl sm:text-2xl text-gray-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-base sm:text-lg truncate max-w-[150px] sm:max-w-[200px]">
                                            {review.name}
                                        </h3>
                                        <p className="text-gray-500 text-xs sm:text-sm truncate max-w-[150px] sm:max-w-[200px]">
                                            {review.role}
                                        </p>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex mb-3 sm:mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <StarFilled
                                            key={i}
                                            className="text-base sm:text-lg"
                                            style={{
                                                color: i < review.rating ? '#FFD700' : '#E5E7EB',
                                                marginRight: '2px'
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Comment */}
                                <Tooltip
                                    title={review.comment}
                                    placement="top"
                                    overlayClassName="max-w-[300px] sm:max-w-md"
                                    mouseEnterDelay={0.5}
                                >
                                    <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-3">
                                        {review.comment}
                                    </p>
                                </Tooltip>

                                {/* Time */}
                                <div className="text-xs sm:text-sm text-gray-400 italic">
                                    {calculateTimeDistance(review.createdAt)}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {selectedReview && (
                    <ReviewModal
                        review={selectedReview}
                        onClose={handleCloseModal}
                    />
                )}

                {/* View All Button */}
                <div className="text-center mt-6 sm:mt-8">
                    <Link
                        to="/reviews"
                        className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm sm:text-base"
                    >
                        <span>Xem tất cả đánh giá</span>
                        <ArrowRightOutlined className="ml-2" />
                    </Link>
                </div>
            </div>
        </section>
    );
};