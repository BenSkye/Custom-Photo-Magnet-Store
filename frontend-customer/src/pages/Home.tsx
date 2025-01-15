import { useEffect, useState } from 'react';
import { ProductCard } from '../components/card/ProductCard';
import { HeroSection } from '../components/sections/home/HeroSection';
import { Divider } from 'antd';
import { AnimateWrapper } from '../utils/animate/AnimateWrapper';
import { ProductCardSkeleton } from '../components/skeleton/ProductCardSkeleton';
import { getAllProductCards } from '../services/productCardService';
import { IProductCard } from '../types/productCard';
import { getHeroSection } from '../services/heroSectionService';
import { IHeroSection } from '../types/heroSection';
import { HeroSectionSkeleton } from '../components/skeleton/HeroSectionSkeleton';



export default function Home() {
    const [products, setProducts] = useState<IProductCard[]>([]);
    const [heroSection, setHeroSection] = useState<IHeroSection>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, heroResponse] = await Promise.all([
                    getAllProductCards(),
                    getHeroSection()
                ]);

                if (productsResponse.metadata?.length > 0) {
                    setProducts(productsResponse.metadata);
                }

                if (heroResponse.metadata) {
                    setHeroSection(heroResponse.metadata);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-4 py-4">
            {/* Hero Section */}
            <AnimateWrapper variant="slideRight" delay={0.2}>
                {loading || !heroSection ? (
                    <HeroSectionSkeleton />
                ) : (
                    <HeroSection heroSection={heroSection} />
                )}
            </AnimateWrapper>

            <Divider>SẢN PHẨM</Divider>

            {/* Products Section */}
            <AnimateWrapper variant="slideLeft" delay={0.2}>
                <div className="w-full">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-stretch">
                            {loading ? (
                                <>
                                    <ProductCardSkeleton />
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
        </div>
    );
}