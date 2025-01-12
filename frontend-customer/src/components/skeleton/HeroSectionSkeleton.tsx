import { Skeleton } from 'antd';

export const HeroSectionSkeleton = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-16">
            {/* Text Content Skeleton */}
            <div className="lg:w-1/2">
                <Skeleton title className="mb-4" />
                <Skeleton paragraph={{ rows: 3 }} className="mb-6" />
                <div className="flex gap-4">
                    <Skeleton.Button active className="w-32" />
                    <Skeleton.Button active className="w-32" />
                </div>
            </div>

            {/* Images Skeleton */}
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                <Skeleton.Image active className="w-full h-48" />
                <Skeleton.Image active className="w-full h-48" />
            </div>
        </div>
    );
};