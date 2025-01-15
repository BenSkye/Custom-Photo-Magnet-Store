import { Button } from '../../button/Button';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ZALO_PHONE } from '../../../utils/constants';
import { IHeroSection } from '../../../types/heroSection';

interface HeroSectionProps {
    heroSection: IHeroSection;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ heroSection }) => {
    return (
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-16">
            {/* Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-4xl font-bold mb-4">{heroSection.title}</h1>
                <p className="text-gray italic mb-4">{heroSection.subTitle}</p>
                <p className="text-gray mb-6">
                    {heroSection.description}
                </p>
                <div className="flex gap-4 justify-center lg:justify-start">
                    <Link to="/order">
                        <Button
                            variant="primary"
                            bgColor="bg-purple"
                            className="transform transition-all duration-300 ease-in-out hover:scale-105"
                        >
                            <ShoppingCartOutlined className="text-lg" />
                            ĐẶT NGAY
                        </Button>
                    </Link>
                    <a href={`https://zalo.me/${ZALO_PHONE}`} target="_blank" rel="noopener noreferrer">
                        <Button
                            variant="secondary"
                            icon={<img src='/icons8-zalo-32.png' className="w-6 h-6" alt="zalo" />}
                            className="transform transition-all duration-300 ease-in-out hover:scale-105"
                        >
                            NHẮN ZALO
                        </Button>
                    </a>
                </div>
            </div>

            {/* Images */}
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                {heroSection.images.map((image: any, index: any) => (
                    <img
                        key={index}
                        src={image.imageUrl}
                        alt="Tường ảnh nam châm"
                        className="rounded-lg w-full transform transition-all duration-300 ease-in-out hover:scale-105"
                    />
                ))}
            </div>
        </div>
    );
};