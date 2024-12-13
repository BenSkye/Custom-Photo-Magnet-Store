import { Skeleton, Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

export const UploadStepSkeleton = () => {
    return (
        <div className="max-w-2xl mx-auto">
            {/* Upload Area Skeleton */}
            <div className="border-2 border-dashed border-gray-200 p-8 rounded-lg mb-8 text-center">
                <p className="ant-upload-drag-icon">
                    <InboxOutlined className="text-gray-300" />
                </p>
                <Skeleton.Input active className="w-3/4 mx-auto mb-4" />
                <Skeleton.Input active className="w-1/2 mx-auto mb-2" />
                <Skeleton.Input active className="w-1/3 mx-auto" />
            </div>

            {/* Images Grid Skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 md:mb-8 lg:mt-4">
                {[1, 2, 3].map((index) => (
                    <Card key={index} className="relative">
                        {/* Badge Skeleton */}
                        <div className="absolute top-2 left-2 z-10">
                            <Skeleton.Button active size="small" className="w-16" />
                        </div>

                        {/* Image Skeleton */}
                        <Skeleton.Image
                            active
                            className="w-full h-40 md:h-32"
                        />

                        {/* Controls Skeleton */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32">
                            <Skeleton.Button active className="w-full" />
                        </div>
                    </Card>
                ))}
            </div>

            {/* Price Summary Skeleton */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <div className="flex justify-between items-center mb-4">
                    <Skeleton.Input active className="w-24" />
                    <Skeleton.Input active className="w-16" />
                </div>
                <div className="flex justify-between items-center mb-4">
                    <Skeleton.Input active className="w-24" />
                    <Skeleton.Input active className="w-24" />
                </div>
                <div className="flex justify-between items-center">
                    <Skeleton.Input active className="w-32" />
                    <Skeleton.Input active className="w-32" />
                </div>
            </div>

            {/* Button Skeleton */}
            <div className="flex justify-end gap-4">
                <Skeleton.Button
                    active
                    size="large"
                    className="w-24"
                />
            </div>
        </div>
    );
};