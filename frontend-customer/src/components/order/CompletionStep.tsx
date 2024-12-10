import { Button } from 'antd';

interface CompletionStepProps {
    onPrev: () => void;
    orderInfo: any;
}

export const CompletionStep: React.FC<CompletionStepProps> = ({ onPrev, orderInfo }) => {
    return (
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Đặt hàng thành công!</h2>
            <p className="mb-4">Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất.</p>
            <Button size="large" onClick={onPrev}>Quay lại trang chủ</Button>
        </div>
    );
};