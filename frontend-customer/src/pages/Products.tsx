import { ProductCard } from '../components/card/ProductCard';
import { products } from '../services/productServices';
import { AnimateWrapper } from '../utils/animate/AnimateWrapper';

export default function Products() {
    return (
        <div className="container mx-auto px-4 mt-0">
            <AnimateWrapper variant="slideLeft" delay={0.2}>
                <h2 className="text-2xl font-bold text-center mb-8">Sản phẩm</h2>
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
            </AnimateWrapper>
        </div>
    );
}