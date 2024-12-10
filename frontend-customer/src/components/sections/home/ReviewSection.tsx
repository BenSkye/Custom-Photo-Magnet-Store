import { ReviewImage } from '../../../types/reviewImg';
import { Image } from 'antd';

export const ReviewSection = () => {
    const reviews: ReviewImage[] = [
        { src: '/reviews.jpg', alt: 'Review 1' },
        { src: '/reviews.jpg', alt: 'Review 2' },
        { src: '/reviews.jpg', alt: 'Review 3' },
        { src: '/reviews.jpg', alt: 'Review 4' },
        { src: '/reviews.jpg', alt: 'Review 5' },
        { src: '/reviews.jpg', alt: 'Review 6' },
        { src: '/reviews.jpg', alt: 'Review 7' },
        { src: '/reviews.jpg', alt: 'Review 8' },
        { src: '/reviews.jpg', alt: 'Review 9' },
        { src: '/reviews.jpg', alt: 'Review 10' },
        { src: '/reviews2.jpg', alt: 'Review 11' },
    ];

    return (
        <section className="mt-8 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">CÁC ĐÁNH GIÁ</h2>

                <div className="grid grid-cols-6 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    <Image.PreviewGroup
                        preview={{
                            onChange: (current) => console.log(`current index: ${current}`),
                            countRender: (current, total) => `${current}/${total}`,
                        }}
                    >
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className="relative rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                            >
                                <Image
                                    src={review.src}
                                    alt={review.alt}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </Image.PreviewGroup>
                </div>
            </div>
        </section>
    );
};