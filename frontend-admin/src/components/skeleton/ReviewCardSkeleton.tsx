import { Card, Skeleton } from 'antd';

export default function ReviewCardSkeleton() {
    return (
        <Card className="h-full">
            <Skeleton
                avatar={{
                    size: 48,
                    shape: "circle"
                }}
                active
                paragraph={{
                    rows: 3,
                    width: ['60%', '80%', '40%']
                }}
                title={{
                    width: '50%'
                }}
            />
        </Card>
    );
};