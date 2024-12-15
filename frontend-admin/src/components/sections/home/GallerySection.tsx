import { Image } from 'antd';

export default function GallerySection() {
    // Data cứng cho gallery
    const galleryImages = [
        {
            id: 1,
            src: '/hinhanh.jpg',
            alt: 'Gallery 1'
        },
        {
            id: 2,
            src: '/hinhanh.jpg',
            alt: 'Gallery 2'
        },
        {
            id: 3,
            src: '/hinhanh.jpg',
            alt: 'Gallery 3'
        },
        {
            id: 4,
            src: '/hinhanh.jpg',
            alt: 'Gallery 4'
        },
        {
            id: 5,
            src: '/hinhanh.jpg',
            alt: 'Gallery 5'
        },
        {
            id: 6,
            src: '/hinhanh.jpg',
            alt: 'Gallery 6'
        },
        {
            id: 7,
            src: '/hinhanh.jpg',
            alt: 'Gallery 7'
        },
        {
            id: 8,
            src: '/hinhanh.jpg',
            alt: 'Gallery 8'
        },
    ];

    return (
        <section className="bg-gray-50 mt-8">
            <h2 className="text-2xl font-bold text-center mb-8">HÌNH ẢNH</h2>

            {/* Gallery Grid */}
            <div className="grid grid-cols-4 md:grid-cols-6 gap-1 md:gap-2">
                {galleryImages.map((image) => (
                    <Image
                        key={image.id}
                        src={image.src}
                        alt={image.alt}
                        className="rounded-lg w-full"
                    />
                ))}
            </div>
        </section>
    );
}