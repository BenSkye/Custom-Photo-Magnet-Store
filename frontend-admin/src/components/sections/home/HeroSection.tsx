import { Input, Form, Image, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';
import { IHeroSection } from '../../../types/heroSection';
import type { FormInstance } from 'antd/es/form';
import { message } from 'antd';

const { TextArea } = Input;
const { Dragger } = Upload;

interface HeroSectionProps {
    heroSection: IHeroSection;
    isEditing: boolean;
    fileList: UploadFile[];
    onFileListChange: (fileList: UploadFile[]) => void;
    form: FormInstance;
    onDeleteImage: (uid: string) => void;
}

export const HeroSection = ({
    heroSection,
    isEditing,
    fileList,
    onFileListChange,
    form,
    onDeleteImage
}: HeroSectionProps) => {

    const handleChange = async (info: any) => {
        let newFileList = [...info.fileList];
        newFileList = newFileList.slice(-2);

        newFileList = newFileList.filter(file => {
            const isImage = file.type?.startsWith('image/');
            if (!isImage) {
                message.error('Chỉ chấp nhận file ảnh!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Kích thước ảnh phải nhỏ hơn 2MB!');
            }
            return isImage && isLt2M;
        });

        onFileListChange(newFileList);
    };

    // View Mode JSX
    const ViewMode = () => (
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-16">
            <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-4xl font-bold mb-4">{heroSection.title}</h1>
                <p className="text-gray-600 italic mb-4">{heroSection.subTitle}</p>
                <p className="text-gray-700 mb-6">{heroSection.description}</p>
            </div>

            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                {heroSection.images.map((img, index) => (
                    <img
                        key={index}
                        src={img.imageUrl}
                        alt={img.altText}
                        className="rounded-lg w-full"
                    />
                ))}
            </div>
        </div>
    );

    // Edit Mode JSX
    const EditMode = () => (
        <div className="flex flex-col lg:flex-row items-start gap-8 mb-16 p-6 bg-white rounded-lg shadow">
            <Form
                form={form}
                layout="vertical"
                className="w-full flex flex-col lg:flex-row gap-8"
            >
                <div className="lg:w-1/2 space-y-6">
                    <Form.Item
                        label="Tiêu đề"
                        name="title"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                    >
                        <Input
                            className="text-2xl font-bold"
                            placeholder="Nhập tiêu đề"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Tiêu đề phụ"
                        name="subTitle"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề phụ!' }]}
                    >
                        <Input
                            className="italic"
                            placeholder="Nhập tiêu đề phụ"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >
                        <TextArea
                            rows={6}
                            placeholder="Nhập nội dung mô tả"
                        />
                    </Form.Item>
                </div>

                <div className="lg:w-1/2">
                    <Form.Item label="Hình ảnh (Tối đa 2 hình)">
                        <Dragger
                            multiple
                            listType="picture"
                            fileList={fileList}
                            onChange={handleChange}
                            beforeUpload={() => false}
                            accept="image/*"
                            className="mb-8"
                            showUploadList={false}
                            maxCount={2}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Kéo thả hoặc bấm để tải ảnh lên</p>
                            <p className="ant-upload-hint">
                                Định dạng PNG, JPG, JPEG. Tối đa 2MB
                            </p>
                        </Dragger>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {fileList.map(file => (
                                <div key={file.uid} className="relative">
                                    <button
                                        onClick={() => onDeleteImage(file.uid)}
                                        className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-red-500 p-2 rounded-full z-10 hover:bg-red-500 hover:text-white transition-all duration-200 shadow-md"
                                    >
                                        <DeleteOutlined />
                                    </button>
                                    <Image
                                        src={file.originFileObj ? URL.createObjectURL(file.originFileObj as Blob) : file.url}
                                        alt={file.name}
                                        className="w-full h-40 object-cover rounded-lg shadow-md"
                                    />
                                </div>
                            ))}
                        </div>
                    </Form.Item>
                    <div className="mt-4 text-sm text-gray-500">
                        * Kích thước đề xuất: 800x600px<br />
                        * Dung lượng tối đa: 2MB
                    </div>
                </div>
            </Form>
        </div>
    );

    return isEditing ? <EditMode /> : <ViewMode />;
};