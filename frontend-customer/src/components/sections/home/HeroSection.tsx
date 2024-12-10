import { Button } from '../../button/Button';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-16">
            {/* Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-4xl font-bold mb-4">In ảnh nam châm - ANACHA</h1>
                <p className="text-gray-600 italic mb-4">Biến những khoảnh khắc tồn tại mãi theo thời gian</p>
                <p className="text-gray-700 mb-6">
                    Gian bếp là nơi giữ lửa gia đình, còn gì tuyệt vời hơn khi cùng
                    Anacha biến hóa chiếc tủ lạnh trở nên sinh động và hấp dẫn hơn
                    cùng ảnh nam châm in theo yêu cầu. Hãy gửi cho Anacha những
                    tấm ảnh mà bạn yêu thích, chúng mình sẽ biến chúng thành những
                    chiếc ảnh nam châm đầy màu sắc.
                </p>
                <div className="flex gap-4 justify-center lg:justify-start">
                    <Link to="/order">
                        <Button variant="primary"
                            bgColor="bg-purple-500/75">
                            <ShoppingCartOutlined className="text-lg" />
                            ĐẶT NGAY
                        </Button>
                    </Link>
                    <Button
                        variant="secondary"
                        icon={<img src='/icons8-zalo-32.png' className="w-6 h-6" />}  // Thêm icon Zalo
                    >
                        NHẮN ZALO
                    </Button>
                </div>
            </div>

            {/* Images */}
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                <img
                    src="/heroImg.jpg"
                    alt="Tường ảnh nam châm"
                    className="rounded-lg w-full"
                />
                <img
                    src="/heroImg.jpg"
                    alt="Ảnh nam châm cầm tay"
                    className="rounded-lg w-full"
                />
            </div>
        </div>
    );
};