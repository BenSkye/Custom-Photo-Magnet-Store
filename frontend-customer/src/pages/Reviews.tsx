import { useState } from 'react';
import { Review } from '../types/review';
import { Form, Select, Button, Rate, Image } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import ReviewModal from '../components/modal/ReviewModal';
import { AnimateWrapper } from '../utils/animate/AnimateWrapper';

const initialReviews: Review[] = [
    // { name: 'Nguyen Van A', role: 'Khách hàng', comment: 'Sản phẩm rất tốt!', rating: 5 },
    // { name: 'Nguyen Van A', role: 'Khách hàng', comment: 'Sản phẩm rất tốt!', rating: 5 },
];

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
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [filterRating, setFilterRating] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = (values: Review) => {
        setReviews([...reviews, values]);
        form.resetFields();
        setIsModalOpen(false);
    };

    const filteredReviews = filterRating !== null
        ? reviews.filter(review => review.rating === filterRating)
        : reviews;

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

            {/* Filter and Add Review Button */}
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
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    <EditOutlined />Viết bình luận
                </Button>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-row gap-6">
                {filteredReviews.length > 0 ? (filteredReviews.map((review, index) => (
                    <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-2 mb-3">
                            <h3 className="font-bold text-lg">{review.name}</h3>
                            <span className="text-gray-600">({review.role})</span>
                        </div>
                        <p className="text-gray-700 mb-3 line-clamp-3 break-all overflow-hidden text-ellipsis">
                            {review.comment}
                        </p>
                        <Rate disabled defaultValue={review.rating} />
                    </div>
                ))) : (<>Xin lỗi, nhưng hiện tại chưa có bình luận nào!</>)}
            </div>

            {/* Review Modal */}
            <ReviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </div>
    );
}