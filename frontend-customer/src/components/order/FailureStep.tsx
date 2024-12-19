import { Button } from '../button/Button';
import { ZALO_PHONE } from '../../utils/constants';
import { ReloadOutlined, CloseCircleOutlined } from '@ant-design/icons';


interface FailureStepProps {
    onRetry: () => void;
}

export const FailureStep: React.FC<FailureStepProps> = ({ onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[500px] px-6 py-12 bg-white rounded-2xl shadow-lg">
            {/* Error Animation */}
            <div className="relative mb-8">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                    <CloseCircleOutlined className="text-4xl text-red-500"></CloseCircleOutlined>
                </div>
                <div className="absolute -bottom-2 w-full">
                    <div className="w-24 h-2 bg-red-100 rounded-full blur-sm"></div>
                </div>
            </div>

            {/* Content */}
            <div className="text-center space-y-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
                    Đặt hàng không thành công
                </h2>
                <div className="text-gray-600 space-y-2 max-w-md mx-auto">
                    <p>
                        Rất tiếc đã xảy ra lỗi trong quá trình xử lý đơn hàng của bạn.
                    </p>
                    <p>
                        Vui lòng thử lại hoặc liên hệ với chúng tôi qua Zalo để được hỗ trợ ngay.
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md px-4">
                {/* Retry Button */}
                <Button
                    onClick={onRetry}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                             text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg 
                             transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
                    icon={<ReloadOutlined className="mr-2" />}
                >
                    Thử lại
                </Button>

                {/* Zalo Contact Button */}
                <a
                    href={`https://zalo.me/${ZALO_PHONE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                >
                    <button className="w-full flex items-center justify-center gap-3 
                                     bg-gradient-to-r from-[#0068FF] to-[#0055CC] hover:from-[#0055CC] hover:to-[#004299]
                                     text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg 
                                     transition-all duration-300 ease-in-out transform hover:-translate-y-0.5">
                        <img
                            src='/icons8-zalo-32.png'
                            alt="Zalo"
                            className="w-6 h-6 object-contain"
                        />
                        <span>Liên hệ hỗ trợ</span>
                    </button>
                </a>
            </div>
        </div>
    );
};