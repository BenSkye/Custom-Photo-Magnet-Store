import { ProductCard } from '../components/card/ProductCard';
import { ReviewSection } from '../components/sections/home/ReviewSection';
import { HeroSection } from '../components/sections/home/HeroSection';
import GallerySection from '../components/sections/home/GallerySection';

export default function Home() {

    const products = [
        {
            image: '/combo.jpg',
            title: 'Combo 6 ảnh',
            description: 'Đặt in ảnh nam châm theo combo để được ưu đãi với giá tốt nhất. Nguyên 1 bộ 6 ảnh chỉ có giá 120k thôi...',
            price: '120k',
            priceUnit: 'bộ',
            onViewMore: () => {
                // Xử lý khi click xem thêm
            },
            onOrder: () => {
                // Xử lý khi click đặt ngay
            }
        },
        {
            image: '/anhle.jpg',
            title: 'In ảnh nam châm lẻ',
            description: 'Nếu bạn chỉ muốn in 1 vài hình nhỏ để làm kỉ niệm, tụi mình sẵn sàng đáp ứng. Có mạnh đơn giá lẻnh, tụi mình sẵn lòng in với số lượng chỉ 1 cái...',
            price: '25k',
            priceUnit: 'cái',
            onViewMore: () => {
                // Xử lý khi click xem thêm
            },
            onOrder: () => {
                // Xử lý khi click đặt ngay
            }
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <HeroSection />
            {/* Products Section */}
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
                        {products.map((product, index) => (
                            <ProductCard
                                key={index}
                                {...product}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {/* Gallery Section */}
            <GallerySection />
            {/* Reviews Section */}
            <ReviewSection />
        </div>
    );
}