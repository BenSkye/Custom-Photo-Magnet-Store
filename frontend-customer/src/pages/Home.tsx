import { useEffect, useState } from 'react';
import { ProductCard } from '../components/card/ProductCard';
import { ReviewSection } from '../components/sections/home/ReviewSection';
import { HeroSection } from '../components/sections/home/HeroSection';
import GallerySection from '../components/sections/home/GallerySection';
import { AnonymousReviewSection } from '../components/sections/home/AnonymousReviewSection';
import { Divider } from 'antd';
import { AnimateWrapper } from '../utils/animate/AnimateWrapper';
import { getProducts } from '../services/productServices';
import { IProductCardProps } from '../types/productCardProps';
import { ProductCardSkeleton } from '../components/skeleton/ProductCardSkeleton';

export default function Home() {
    const [products, setProducts] = useState<IProductCardProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                if (data && data.length > 0) {
                    setProducts(data);
                    setLoading(false);
                } else {
                    console.log('Lỗi không thể tải thông tin sản phẩm');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <AnimateWrapper variant="slideRight" delay={0.2}>
                <HeroSection />
            </AnimateWrapper>

            <Divider>SẢN PHẨM</Divider>

            {/* Products Section */}
            <AnimateWrapper variant="slideLeft" delay={0.2}>
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
                            {loading ? (
                                <>
                                    <ProductCardSkeleton />
                                    <ProductCardSkeleton />
                                </>
                            ) : (
                                products.map((product, index) => (
                                    <ProductCard
                                        key={index}
                                        {...product}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </AnimateWrapper>

            {/* Gallery Section */}
            <AnimateWrapper variant="slideRight" delay={0.2}>
                <GallerySection />
            </AnimateWrapper>

            {/* Reviews Section */}
            <AnimateWrapper variant="slideLeft" delay={0.2}>
                <ReviewSection />
            </AnimateWrapper>
            {/* Anonymous Reviews Section */}
            <AnimateWrapper variant="slideRight" delay={0.2}>
                <AnonymousReviewSection />
            </AnimateWrapper>
        </div>
    );
}