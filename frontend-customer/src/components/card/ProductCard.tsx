import { IProductCard } from '../../types/productCard';
import { Card } from 'antd';
import { Button } from '../button/Button';
import {
    DollarOutlined,
    InfoCircleOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/format/formatPrice';

export const ProductCard: React.FC<IProductCard> = ({
    title,
    description,
    price,
    imageUrl,
}) => {
    return (
        <Card className="group bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02] w-full max-w-[680px]">
            <div className="flex flex-col h-full">
                <div>
                    <img
                        src={imageUrl}
                        alt="Ảnh sản phẩm"
                        className="rounded-lg w-full h-[180px] object-cover mb-3 transform transition-all duration-300 ease-in-out group-hover:scale-[1.02]"
                    />
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-sm text-gray mb-3 break-words overflow-wrap-anywhere whitespace-pre-wrap">
                        {description}
                    </p>
                </div>
                <div className="mt-auto">
                    <div className="mb-4 flex items-center">
                        <DollarOutlined className="text-red mr-2 text-xl" />
                        <span className="text-sm text-gray">Giá: </span>
                        <span className="text-2xl font-bold text-red ml-1">{formatPrice(price)}</span>
                        <span className="text-sm text-gray">/cái</span>
                    </div>
                    <div className="flex lg:flex-row gap-2 flex-col">
                        <Link to="/information" className="w-full">
                            <Button
                                variant='secondary'
                                className="w-full text-[13px] sm:text-sm py-2 px-2 sm:px-4 flex items-center justify-center gap-1 sm:gap-2 min-h-[40px] transform transition-all duration-300 ease-in-out hover:scale-[1.02]"
                            >
                                <InfoCircleOutlined className="text-lg" />
                                <span className="whitespace-nowrap">XEM THÊM THÔNG TIN</span>
                            </Button>
                        </Link>
                        <Link to="/order" className="w-full">
                            <Button
                                variant='primary'
                                className="w-full text-[13px] sm:text-sm py-2 px-2 sm:px-4 flex items-center justify-center gap-1 sm:gap-2 min-h-[40px] transform transition-all duration-300 ease-in-out hover:scale-[1.02]"
                            >
                                <ShoppingCartOutlined className="text-lg" />
                                <span className="whitespace-nowrap">ĐẶT NGAY</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Card>
    );
};