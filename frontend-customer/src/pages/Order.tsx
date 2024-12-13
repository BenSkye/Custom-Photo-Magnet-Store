import { useEffect, useState } from 'react';
import { message, Steps } from 'antd';
import { UploadStep } from '../components/order/UploadStep';
import { InfoStep } from '../components/order/InfoStep';
import { CompletionStep } from '../components/order/CompletionStep';
import type { UploadFile } from 'antd/es/upload/interface';
import { OrderInfo } from '../types/orderInfor';
import { ImageQuantity } from '../types/imageQuantity';
import { ThankYouStep } from '../components/order/ThankYouStep';
import { FailureStep } from '../components/order/FailureStep';
import { getCurrentPriceConfig } from '../services/priceConfigService';
import { IPriceConfig } from '../types/priceConfig';
import { UploadStepSkeleton } from '../components/skeleton/UploadStepSkeleton';


export default function Order() {
    const [current, setCurrent] = useState(0);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [imageQuantities, setImageQuantities] = useState<ImageQuantity[]>([]);
    const [orderInfo, setOrderInfo] = useState<OrderInfo | undefined>(undefined);
    const [orderStatus, setOrderStatus] = useState<'success' | 'failure' | null>(null);
    const [priceConfig, setPriceConfig] = useState<IPriceConfig | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch price config
    useEffect(() => {
        try {
            const fetchPriceConfig = async () => {
                const response = await getCurrentPriceConfig();
                const configPrice = response.metadata;
                setPriceConfig(configPrice);
            };
            fetchPriceConfig();
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching price config:', error);
        }
    }, []);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const handleSubmit = (values: OrderInfo) => {
        setOrderInfo(values);
        next();
    };

    const calculateTotalImages = () => {
        return fileList.reduce((sum, file) => {
            const quantity = imageQuantities.find(q => q.uid === file.uid)?.quantity || 1;
            return sum + quantity;
        }, 0);
    };

    const calculateTotalPrice = () => {
        // Kiểm tra nếu priceConfig chưa được load
        if (!priceConfig) return 0;

        const totalQuantity = calculateTotalImages();
        const { bulkDiscountThreshold, bulkPerImagePrice, normalPerImagePrice } = priceConfig;

        if (
            typeof bulkDiscountThreshold !== 'number' ||
            typeof bulkPerImagePrice !== 'number' ||
            typeof normalPerImagePrice !== 'number'
        ) {
            message.error('Vui lòng chọn sản phẩm để tính giá');
            return 0;
        }

        const pricePerImage = totalQuantity >= bulkDiscountThreshold
            ? bulkPerImagePrice
            : normalPerImagePrice;

        return totalQuantity * pricePerImage;
    };

    const handleConfirmOrder = async (success: boolean) => {
        if (success) {
            setOrderStatus('success');
            next();
        } else {
            setOrderStatus('failure');
            next();
        }
    };

    const steps = [
        {
            title: 'Thêm Ảnh',
            content: <UploadStep fileList={fileList}
                setFileList={setFileList}
                imageQuantities={imageQuantities}
                setImageQuantities={setImageQuantities}
                onNext={next} />
        },
        {
            title: 'Thông Tin',
            content: <InfoStep
                onPrev={prev}
                onNext={next}
                initialValues={orderInfo}
                onSubmit={handleSubmit} />
        },
        {
            title: 'Hoàn Tất',
            content: <CompletionStep
                orderInfo={orderInfo}
                totalImages={calculateTotalImages()}
                totalPrice={calculateTotalPrice()}
                onPrev={prev}
                onConfirm={handleConfirmOrder}
            />
        }
        , {
            title: orderStatus === 'success' ? 'Thành công' : 'Thất bại',
            content: orderStatus === 'success' ?
                <ThankYouStep /> :
                <FailureStep onRetry={() => setCurrent(2)} /> // Quay lại bước Hoàn tất
        }
    ];

    if (isLoading) {
        return <UploadStepSkeleton />;
    }

    return (
        <div className="container mx-auto">
            <Steps
                current={current}
                items={steps}
                className="mb-8 w-full px-4 md:px-24 lg:px-48"
                direction={window.innerWidth <= 768 ? 'vertical' : 'horizontal'}
            />
            <div>{steps[current].content}</div>
        </div>
    );
}