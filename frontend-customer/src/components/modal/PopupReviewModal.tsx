import { StarFilled, UserOutlined, CloseOutlined } from '@ant-design/icons';
import { Review } from '../../types/review';
import { calculateTimeDistance } from '../../utils/format/formateDate';

interface ReviewModalProps {
    review: Review;
    onClose: () => void;
}

export const ReviewModal = ({ review, onClose }: ReviewModalProps) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <CloseOutlined className="text-xl" />
                </button>

                <div className="p-6">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <UserOutlined className="text-3xl text-gray-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-xl">{review.name}</h3>
                            <p className="text-gray-500">{review.role}</p>
                        </div>
                    </div>

                    <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                            <StarFilled
                                key={i}
                                className="text-2xl"
                                style={{
                                    color: i < review.rating ? '#FFD700' : '#E5E7EB',
                                    marginRight: '4px'
                                }}
                            />
                        ))}
                    </div>

                    <div className="prose max-w-none">
                        <p className="text-gray-600 text-lg leading-relaxed mb-4">
                            {review.comment}
                        </p>
                    </div>

                    <div className="text-sm text-gray-400 italic mt-4">
                        {calculateTimeDistance(review.createdAt)}
                    </div>
                </div>
            </div>
        </div>
    );
};