import { IProductCardProps } from '../../types/productCardProps';
import { Card } from 'antd';
import { Button } from '../button/Button';
import {
    DollarOutlined,
    InfoCircleOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/format/formatPrice';

export const ProductCard: React.FC<IProductCardProps> = ({
    image,
    title,
    description,
    price,
    priceUnit,
}) => {
    return (
        <Card className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-[680px] flex flex-col justify-between ">
            <div>
                <img
                    src={image}
                    alt={title}
                    className="rounded-lg w-full h-[180px] object-cover mb-3"
                />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-600 mb-3 break-words overflow-wrap-anywhere whitespace-pre-wrap">
                    {description}
                </p>
            </div>
            <div>
                <div className="mb-4 flex items-center">
                    <DollarOutlined className="text-red mr-2 text-xl" />
                    <span className="text-sm text-gray-600">Giá: </span>
                    <span className="text-2xl font-bold text-red ml-1">{formatPrice(price)}</span>
                    <span className="text-sm text-gray-600">/{priceUnit}</span>
                </div>
                <div className="flex lg:flex-row gap-2 flex-col">
                    <Link to="/information">
                        <Button
                            variant='secondary'
                            className="w-full text-[13px] sm:text-sm py-2 px-2 sm:px-4 flex items-center justify-center gap-1 sm:gap-2 min-h-[40px]"
                        >
                            <InfoCircleOutlined className="text-lg" />
                            <span className="whitespace-nowrap">XEM THÊM THÔNG TIN</span>
                        </Button>
                    </Link>
                    <Link to="/order">
                        <Button
                            variant='primary'
                            className="w-full text-[13px] sm:text-sm py-2 px-2 sm:px-4 flex items-center justify-center gap-1 sm:gap-2 min-h-[40px]"
                        >
                            <ShoppingCartOutlined className="text-lg" />
                            <span className="whitespace-nowrap">ĐẶT NGAY</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
};