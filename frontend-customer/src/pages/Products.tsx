import { ProductCard } from '../components/card/ProductCard';
import { AnimateWrapper } from '../utils/animate/AnimateWrapper';
import { IProductCard } from '../types/productCard';
import { useEffect, useState } from 'react';
import { ProductCardSkeleton } from '../components/skeleton/ProductCardSkeleton';
import { getAllProductCards } from '../services/productCardService';

export default function Products() {
    const [products, setProducts] = useState<IProductCard[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProductCards();
                if (response.metadata && response.metadata.length > 0) {
                    setProducts(response.metadata);
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
        <div className="container mx-auto mt-0">
            <AnimateWrapper variant="slideLeft" delay={0.2}>
                <h2 className="text-2xl font-bold text-center mb-8">Sản phẩm</h2>
                <div className="w-full">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-stretch">
                            {(!products.length || loading) ? (
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