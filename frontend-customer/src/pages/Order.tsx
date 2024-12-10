import { useState } from 'react';
import { Steps } from 'antd';
import { UploadStep } from '../components/order/UploadStep';
import { InfoStep } from '../components/order/InfoStep';
import { CompletionStep } from '../components/order/CompletionStep';
import type { UploadFile } from 'antd/es/upload/interface';

export default function Order() {
    const [current, setCurrent] = useState(0);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [orderInfo, setOrderInfo] = useState<any>(null);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const handleSubmit = (values: any) => {
        setOrderInfo(values);
    };

    const steps = [
        {
            title: 'Thêm Ảnh',
            content: <UploadStep fileList={fileList} setFileList={setFileList} onNext={next} />
        },
        {
            title: 'Thông Tin',
            content: <InfoStep onPrev={prev} onNext={next} onSubmit={handleSubmit} />
        },
        {
            title: 'Hoàn Tất',
            content: <CompletionStep onPrev={prev} orderInfo={orderInfo} />
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <Steps current={current} items={steps} className="mb-8" />
            <div>{steps[current].content}</div>
        </div>
    );
}