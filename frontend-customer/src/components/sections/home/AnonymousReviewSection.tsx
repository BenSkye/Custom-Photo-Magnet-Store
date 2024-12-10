import { StarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Review } from '../../../types/review';


export const AnonymousReviewSection = () => {
    const reviews: Review[] = [
        {
            name: "Khách hàng",
            role: "Khách mua hàng",
            comment: "Rất hài lòng với sản phẩm, in ảnh đẹp và chất lượng",
            rating: 4,

        },
        {
            name: "Khách hàng",
            role: "Khách mua hàng",
            comment: "Shop phục vụ nhiệt tình, giao hàng nhanh",
            rating: 5,
        },
        {
            name: "Khách hàng",
            role: "Khách mua hàng",
            comment: "Sản phẩm chất lượng, giá cả hợp lý",
            rating: 4,
        },
        {
            name: "Khách hàng",
            role: "Khách mua hàng",
            comment: "Sản phẩm chất lượng, giá cả hợp lý",
            rating: 4,
        },
    ];

    return (
        <section className="py-6">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-6">ĐÁNH GIÁ TRÊN TRANG</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="ml-4">
                                    <h3 className="font-semibold">{review.name}</h3>
                                    <p className="text-gray-600 text-sm">{review.role}</p>
                                </div>
                            </div>

                            <div className="flex mb-3 text-2xl">
                                {[...Array(5)].map((_, i) => (
                                    <StarFilled
                                        key={i}
                                        style={{
                                            color: i < review.rating ? '#FFD700' : '#D3D3D3',
                                            marginRight: '4px'
                                        }}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Link to="/reviews" className="flex justify-end align-center px-4">
                Xem thêm...
            </Link>
        </section>
    );
};