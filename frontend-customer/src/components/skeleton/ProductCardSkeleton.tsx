import { Card, Skeleton } from 'antd';

export const ProductCardSkeleton = () => {
    return (
        <Card
            className="w-full max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300"
            cover={
                <Skeleton.Image
                    className="w-full h-48 object-cover"
                    active={true}
                />
            }
        >
            <Skeleton active paragraph={{ rows: 3 }} />
        </Card>
    );
};