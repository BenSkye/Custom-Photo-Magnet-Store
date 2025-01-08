import { useEffect, useState } from 'react';
import { message, Form, UploadFile, Divider } from 'antd';
import { HeroSection } from '../components/sections/home/HeroSection';
import { getHeroSection, updateHeroSection } from '../services/heroSectionService';
import { uploadImages } from '../services/uploadService';
import { IHeroSection, IHeroImage } from '../types/heroSection';
import { Button } from '../components/button/Button';
import { SaveOutlined, EditOutlined } from '@ant-design/icons';
import { IndexedDBService } from '../services/indexedDBService';
import { AnimateWrapper } from '../utils/animate/AnimateWrapper';
import { FIREBASE_STORAGE_PATH } from '../utils/constants';
import { getAllProductCards, updateProductCard } from '../services/productCardService';
import { IProductCard } from '../types/productCard';
import { ProductCard } from '../components/card/ProductCard';

export default function Home() {
    const [form] = Form.useForm();
    const [heroSection, setHeroSection] = useState<IHeroSection>({
        title: '',
        subTitle: '',
        description: '',
        images: []
    });
    const [products, setProducts] = useState<IProductCard[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const indexedDBService = new IndexedDBService();

    useEffect(() => {
        fetchHeroSection();
        fetchProducts();
    }, []);

    useEffect(() => {
        if (heroSection) {
            form.setFieldsValue(heroSection);
            setFileList(heroSection.images.map((img: IHeroImage, index: number) => ({
                uid: `-${index}`,
                name: `image-${index}`,
                status: 'done',
                url: img.imageUrl,
            })));
        }
    }, [heroSection, form]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await getAllProductCards();
            setProducts(response.metadata);
        } catch (error) {
            console.error('Error fetching products:', error);
            message.error('Không thể tải danh sách sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    const fetchHeroSection = async () => {
        try {
            setLoading(true);
            const response = await getHeroSection();
            setHeroSection(response.metadata);
        } catch (error) {
            console.error('Error fetching hero section:', error);
            message.error('Không thể tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProduct = async (id: string, updatedData: IProductCard) => {
        try {
            setLoading(true);
            console.log('Updating product with ID:', id); // Kiểm tra ID
            console.log('Updated data:', updatedData); // Kiểm tra dữ liệu
            await updateProductCard(id, updatedData);
            await fetchProducts();
            message.success('Cập nhật sản phẩm thành công!');
        } catch (error) {
            console.error('Error updating product:', error);
            message.error('Không thể cập nhật sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();

            const uploadPromises = fileList.map(async (file) => {
                if (file.originFileObj) {
                    const path = `${FIREBASE_STORAGE_PATH}/${file.uid}-${file.name}`;
                    const url = await uploadImages(file.originFileObj, path);
                    return {
                        imageUrl: url,
                        altText: file.name
                    };
                }
                return {
                    imageUrl: file.url,
                    altText: file.name
                };
            });

            const uploadedImages = await Promise.all(uploadPromises);
            const updatedHeroSection = {
                ...values,
                images: uploadedImages
            };

            await updateHeroSection(updatedHeroSection);
            setHeroSection(updatedHeroSection);

            // Cập nhật tất cả sản phẩm
            await Promise.all(products.map(product => {
                const updatedData = {
                    _id: product._id,
                    imageUrl: product.imageUrl,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                };
                console.log('====================================');
                console.log('Updating product:', updatedData);
                console.log('====================================');
                return handleUpdateProduct(product._id, updatedData);
            }));

            setIsEditing(false);
            await indexedDBService.clearIndexedDB();
            message.success('Lưu thành công!');
        } catch (error) {
            console.error('Error saving changes:', error);
            message.error('Không thể lưu thay đổi');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        try {
            await indexedDBService.clearIndexedDB();
            form.setFieldsValue(heroSection);
            setFileList(heroSection.images.map((img: IHeroImage, index: number) => ({
                uid: `-${index}`,
                name: `${FIREBASE_STORAGE_PATH.HERO_SECTION_IMG}-${index}`,
                status: 'done',
                url: img.imageUrl,
            })));
            setIsEditing(false);
        } catch (error) {
            console.error('Error canceling:', error);
            message.error('Có lỗi xảy ra');
        }
    };

    const handleDeleteImage = async (uid: string) => {
        try {
            await indexedDBService.deleteFromIndexedDB(uid);
            setFileList(prev => prev.filter(file => file.uid !== uid));
            message.success('Đã xóa ảnh thành công');
        } catch (error) {
            console.error('Error deleting file:', error);
            message.error('Có lỗi xảy ra khi xóa ảnh');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div>
                <div className="top-0 right-0 flex gap-4 mb-4">
                    <Button
                        onClick={isEditing ? handleSave : handleEdit}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                        disabled={loading}
                    >
                        {isEditing ? (
                            <>
                                <SaveOutlined className="mr-2" />
                                {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                            </>
                        ) : (
                            <>
                                <EditOutlined className="mr-2" />
                                Chỉnh sửa
                            </>
                        )}
                    </Button>
                    {isEditing && (
                        <Button
                            onClick={handleCancel}
                            className="bg-gray-500 hover:bg-gray-600 text-white"
                            disabled={loading}
                        >
                            Hủy
                        </Button>
                    )}
                </div>

                <AnimateWrapper variant="slideRight" delay={0.2}>
                    <HeroSection
                        heroSection={heroSection}
                        isEditing={isEditing}
                        fileList={fileList}
                        onFileListChange={setFileList}
                        form={form}
                        onDeleteImage={handleDeleteImage}
                    />
                </AnimateWrapper>
            </div>

            <Divider>SẢN PHẨM</Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <ProductCard
                        key={product._id}
                        {...product}
                        isEditing={isEditing}
                        onUpdate={handleUpdateProduct}
                    />
                ))}
            </div>
        </div>
    );
}