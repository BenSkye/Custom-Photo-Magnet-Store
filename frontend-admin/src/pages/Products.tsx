import { ProductCard } from '../components/card/ProductCard';
import { getProducts } from '../services/productServices';
import { AnimateWrapper } from '../utils/animate/AnimateWrapper';
import { IProductCardProps } from '../types/productCardProps';
import { useEffect, useState } from 'react';
import { ProductCardSkeleton } from '../components/skeleton/ProductCardSkeleton';

export default function Products() {
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
        <div className="container mx-auto mt-0">
            <AnimateWrapper variant="slideLeft" delay={0.2}>
                <h2 className="text-2xl font-bold text-center mb-8">Sản phẩm</h2>
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
                            {(!products.length || loading) ? (
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
        </div>
    );
}