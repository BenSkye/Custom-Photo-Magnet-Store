import { useEffect, useState } from 'react';
import { Form, Button, Image, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import ReviewModal from '../components/modal/ReviewModal';
import { AnimateWrapper } from '../utils/animate/AnimateWrapper';
import ReviewComments from '../components/sections/review/ReviewComments';
import { Review } from '../types/review';
import { LIMIT_PER_PAGE, SORT_BY, SORT_ORDER, STATUS_CODE } from '../utils/constants';
import { createReview, getReviews } from '../services/reviewService';
import { PaginationParams } from '../types/pagination';


const reviewImages = [
    '/reviews.jpg',
    '/reviews.jpg',
    '/reviews.jpg',
    '/reviews.jpg',
    '/reviews.jpg',
    '/reviews.jpg',
    '/reviews.jpg',
    '/reviews.jpg',
    '/reviews.jpg',
    '/reviews.jpg',
];

export default function Reviews() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    // New states for reviews
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [pagination, setPagination] = useState<PaginationParams>({
        page: 1,
        limit: LIMIT_PER_PAGE,
        sortBy: SORT_BY.CREATED_AT,
        sortOrder: SORT_ORDER.DESC
    });

    // Fetch reviews
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
    const handleSubmit = async (values: Review) => {
        setLoading(true);
        try {
            const response = await createReview(values);
            if (response.status === STATUS_CODE.CREATE_SUCCESS) {
                form.resetFields();
                setIsModalOpen(false);
                message.success('Bình luận đã được gửi thành công!');
                // Refresh reviews after creating new one
                const refreshResponse = await getReviews(pagination);
                setReviews(refreshResponse.metadata.data);
                setTotalItems(refreshResponse.metadata.pagination.totalItems);
            } else {
                message.error('Có lỗi xảy ra vui lòng thử lại!');
            }
        } catch (error) {
            message.error('Có lỗi xảy ra vui lòng thử lại!');
            console.error('Error submitting review:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto lg:px-4">
            <AnimateWrapper delay={0.2} variant='slideDown' >
                <h1 className="text-3xl font-bold text-center mb-4">ĐÁNH GIÁ</h1>
                <p className="text-center mb-8">Dưới đây là đánh giá của những khách hàng đã từng mua sản phẩm của tụi mình nè ...</p>
            </AnimateWrapper>

            {/* Gallery Grid */}
            <AnimateWrapper delay={0.2} variant='slideLeft' >
                <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 lg:gap-4 gap-1 lg:mb-8">
                    {reviewImages.slice(0, 10).map((image, index) => (
                        <div
                            key={index}
                            className="relative rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                        >
                            <Image
                                src={image}
                                alt={`Review ${index + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </AnimateWrapper>

            {/*Review Button */}
            <div className="flex justify-end mb-8">
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    <EditOutlined />Viết bình luận
                </Button>
            </div>

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

            {/* Review Modal */}
            <ReviewModal
                form={form}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                loading={loading}
            />
        </div>
    );
}