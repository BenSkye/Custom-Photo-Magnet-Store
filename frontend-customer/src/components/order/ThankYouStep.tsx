import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ZALO_PHONE } from '../../utils/constants';

export const ThankYouStep: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-0">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-green-500 mb-4">
                    <svg
                        className="w-20 h-20 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Cảm ơn bạn đã đặt hàng!
                </h2>

                <p className="text-gray-600 mb-6">
                    Đơn hàng của bạn đã được xác nhận. Vui lòng liên hệ {' '}
                    <a
                        href={`https://zalo.me/${ZALO_PHONE}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 font-medium text-blue"
                    >
                        Zalo: {ZALO_PHONE} {' '}
                    </a>
                    nếu có bất kỳ thắc mắc nào hoặc cần hỗ trợ.
                </p>

                <p className="text-gray-600 mb-6">
                    Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.
                </p>

                <Button
                    type="primary"
                    size="large"
                    onClick={() => navigate('/products')}
                    className="bg-blue-500 min-w-[200px]"
                >
                    Đặt đơn hàng mới
                </Button>
            </div>
        </div>
    );
};