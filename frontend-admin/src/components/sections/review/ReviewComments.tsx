import { useState } from 'react';
import { Review } from '../../../types/review';
import { Select, Pagination, Tooltip } from 'antd';
import { PaginationParams } from '../../../types/pagination';
import { ReviewModal } from '../../modal/PopupReviewModal';
import { UserOutlined, StarFilled } from '@ant-design/icons';
import { calculateTimeDistance } from '../../../utils/format/formateDate';

interface ReviewCommentsProps {
    reviews: Review[];
    loading: boolean;
    totalItems: number;
    pagination: PaginationParams;
    onPageChange: (page: number, pageSize: number) => void;
}

export default function ReviewComments({
    reviews = [],
    loading,
    totalItems,
    pagination,
    onPageChange
}: ReviewCommentsProps) {
    const [filterRating, setFilterRating] = useState<number | null>(null);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const handleOpenModal = (review: Review) => {
        setSelectedReview(review);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseModal = () => {
        setSelectedReview(null);
        document.body.style.overflow = 'unset';
    };

    const filteredReviews = filterRating !== null
        ? reviews.filter(review => review.rating === filterRating)
        : reviews;

    if (loading) return <div>Loading...</div>

    return (
        <>
            {/* Filter */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex items-center gap-2">
                    <span className="font-medium">Lọc theo đánh giá:</span>
                    <Select
                        style={{ width: 120 }}
                        value={filterRating}
                        onChange={setFilterRating}
                        placeholder="Tất cả"
                    >
                        <Select.Option value={null}>Tất cả</Select.Option>
                        {[5, 4, 3, 2, 1].map(rating => (
                            <Select.Option key={rating} value={rating}>{rating} sao</Select.Option>
                        ))}
                    </Select>
                </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-row gap-1 mb-6">
                {filteredReviews.length > 0 ? (filteredReviews.map((review, index) => (
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
                        <div className="text-red text-end cursor-pointer">
                            Ẩn đánh giá này
                        </div>
                    </div>
                ))) : (<>Chưa có bình luận nào!</>)}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mb-8">
                <div className="flex justify-center mb-8">
                    <Pagination
                        current={pagination.page}
                        total={totalItems}
                        pageSize={pagination.limit}
                        onChange={onPageChange}
                        showSizeChanger
                        showTotal={(total) => `Tổng ${total} đánh giá`}
                    />
                </div>

                {selectedReview && (
                    <ReviewModal
                        review={selectedReview}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </>
    );
}