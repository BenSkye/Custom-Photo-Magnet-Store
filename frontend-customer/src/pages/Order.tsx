import { useState } from 'react';
import { message, Steps } from 'antd';
import { UploadStep } from '../components/order/UploadStep';
import { InfoStep } from '../components/order/InfoStep';
import { CompletionStep } from '../components/order/CompletionStep';
import type { UploadFile } from 'antd/es/upload/interface';
import { OrderInfo } from '../types/orderInfor';
import { ImageQuantity } from '../types/imageQuantity';
import { ThankYouStep } from '../components/order/ThankYouStep';


export default function Order() {
    const [current, setCurrent] = useState(0);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [imageQuantities, setImageQuantities] = useState<ImageQuantity[]>([]);
    const [orderInfo, setOrderInfo] = useState<OrderInfo | undefined>(undefined);

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
        const totalQuantity = calculateTotalImages();
        const pricePerImage = totalQuantity >= 6 ? 20000 : 25000;
        return totalQuantity * pricePerImage;
    };

    const handleConfirmOrder = async () => {
        try {
            message.success('Đặt hàng thành công!');
            next(); // Chuyển đến bước Thank You
        } catch (error) {
            console.error('Error processing order:', error);
            message.error('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
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
            title: 'Xong',
            content: <ThankYouStep />
        }
    ];

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