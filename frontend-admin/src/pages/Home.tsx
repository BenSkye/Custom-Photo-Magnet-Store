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
    const [updatedProducts, setUpdatedProducts] = useState<Map<string, any>>(new Map());
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

    const handleProductFormChange = (id: string, values: any) => {
        setUpdatedProducts(prev => new Map(prev).set(id, {
            ...values,
            _id: id,
        }));
    };

    const handleUpdateProduct = async (id: string, updatedData: IProductCard) => {
        try {
            setLoading(true);
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

    const handleProductImageUpload = async (file: File) => {
        try {
            const path = `${FIREBASE_STORAGE_PATH}/products/${file.name}-${Date.now()}`;
            const url = await uploadImages(file, path);
            return url;
        } catch (error) {
            console.error('Error uploading product image:', error);
            message.error('Không thể tải lên ảnh sản phẩm');
            throw error;
        }
    };


    const handleSave = async () => {
        try {
            setLoading(true);
            // Validate và cập nhật hero section
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

            // Cập nhật hero section
            await updateHeroSection(updatedHeroSection);
            setHeroSection(updatedHeroSection);

            // Cập nhật các sản phẩm đã thay đổi - Sửa phần này
            const updatePromises = Array.from(updatedProducts.entries()).map(([id, values]) => {
                const product = products.find(p => p._id === id);
                if (product) {
                    return handleUpdateProduct(id, {
                        _id: id,
                        ...values,
                    });
                }
                return Promise.resolve();
            });

            await Promise.all(updatePromises);

            // Reset states
            setUpdatedProducts(new Map());
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
            setUpdatedProducts(new Map()); // Reset các thay đổi của sản phẩm
            await fetchProducts(); // Tải lại danh sách sản phẩm
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
        <div className="container mx-auto px-4 py-8 bg-silver">
            <div>
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
            <AnimateWrapper variant="slideLeft" delay={0.2}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <ProductCard
                            key={product._id}
                            {...product}
                            isEditing={isEditing}
                            onUpdate={handleUpdateProduct}
                            onFormChange={handleProductFormChange}
                            onImageUpload={handleProductImageUpload}
                        />
                    ))}
                </div>
            </AnimateWrapper>
            <div className="mt-4 flex gap-4 mb-4">
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
        </div>
    );
}