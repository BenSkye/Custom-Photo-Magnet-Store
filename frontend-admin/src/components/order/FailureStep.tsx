import { Button } from '../button/Button';
import { ZALO_PHONE } from '../../utils/constants';
import { ReloadOutlined } from '@ant-design/icons';

interface FailureStepProps {
    onRetry: () => void;
}

export const FailureStep: React.FC<FailureStepProps> = ({ onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] px-4 md:px-8">
            {/* Icon Error */}
            <div className="text-red-500 text-6xl md:text-7xl mb-6 animate-bounce">
                <i className="fas fa-exclamation-circle"></i>
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                Đặt hàng thất bại
            </h2>

            {/* Message */}
            <div className="text-gray-600 mb-8 text-center max-w-md">
                <p className="mb-4">
                    Rất tiếc đã xảy ra lỗi trong quá trình đặt hàng.
                </p>
                <p>
                    Vui lòng thử lại hoặc liên hệ qua Zalo để được hỗ trợ
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
                {/* Retry Button */}
                <Button
                    type="primary"
                    onClick={onRetry}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white font-medium py-2 px-6 rounded-lg"
                    icon={<ReloadOutlined />}
                >
                    Thử lại
                </Button>
                <Button
                    type="primary"
                    onClick={onRetry}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white font-medium py-2 px-6 rounded-lg"
                    icon={<ReloadOutlined />}
                >
                    Bắt đầu lại
                </Button>

                {/* Zalo Contact Button */}
                <a
                    href={`https://zalo.me/${ZALO_PHONE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                >
                    <button className="w-full flex items-center justify-center gap-2 bg-[#0068FF] hover:bg-[#0055CC] text-white py-2 px-6 rounded-lg transition-colors duration-300">
                        <img
                            src='/icons8-zalo-32.png'
                            alt="Zalo"
                            className="w-6 h-6 object-contain"
                        />
                        <span className="font-medium">Liên hệ Zalo</span>
                    </button>
                </a>
            </div>
        </div>
    );
};