import { Image } from 'antd';

export default function GallerySection() {
    return (
        <section className="bg-gray-50 mt-8">

            <h2 className="text-2xl font-bold text-center mb-8">HÌNH ẢNH</h2>

            {/* Gallery Grid */}
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                {/* Add your gallery images here */}
                <Image src="/hinhanh.jpg" alt="Gallery 1" className="rounded-lg w-full" />
                <Image src="/hinhanh.jpg" alt="Gallery 2" className="rounded-lg w-full" />
                <Image src="/hinhanh.jpg" alt="Gallery 3" className="rounded-lg w-full" />
                <Image src="/hinhanh.jpg" alt="Gallery 4" className="rounded-lg w-full" />
                <Image src="/hinhanh.jpg" alt="Gallery 4" className="rounded-lg w-full" />
                <Image src="/hinhanh.jpg" alt="Gallery 4" className="rounded-lg w-full" />
                <Image src="/hinhanh.jpg" alt="Gallery 4" className="rounded-lg w-full" />
                <Image src="/hinhanh.jpg" alt="Gallery 4" className="rounded-lg w-full" />
            </div>

        </section>

    );
}