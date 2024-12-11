import { Form, Input, Button, Select } from 'antd';
import { OrderInfo } from '../../types/orderInfor';
import { fetchDistricts, fetchWards } from '../../services/districWardService';
import { PROVINCE_ID } from '../../utils/constants';
import { useEffect, useState } from 'react';
import { District } from '../../types/district';
import { Ward } from '../../types/ward';

interface InfoStepProps {
    onPrev: () => void;
    onNext: () => void;
    onSubmit: (values: OrderInfo) => void;
    initialValues?: OrderInfo | null;
}

export const InfoStep: React.FC<InfoStepProps> = ({ onPrev, onNext, onSubmit, initialValues }) => {
    const [form] = Form.useForm();
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [loading, setLoading] = useState({
        districts: false,
        wards: false
    });

    useEffect(() => {
        const initializeForm = async () => {
            if (initialValues) {
                if (initialValues.district) {
                    setSelectedDistrict(initialValues.district);
                    await loadWards(initialValues.district);
                }
                // Set tất cả các giá trị form sau khi đã load xong wards
                form.setFieldsValue(initialValues);
            }
        };

        initializeForm();
    }, [initialValues, form]);

    const loadWards = async (districtId: string) => {
        setLoading(prev => ({ ...prev, wards: true }));
        try {
            const data = await fetchWards(districtId);
            setWards(data);
            return data;
        } catch (error) {
            console.error('Error fetching wards:', error);
            return [];
        } finally {
            setLoading(prev => ({ ...prev, wards: false }));
        }
    };

    useEffect(() => {
        const fetchDistrictData = async () => {
            setLoading(prev => ({ ...prev, districts: true }));
            try {
                const data = await fetchDistricts(PROVINCE_ID.HOCHIMINH_ID);
                setDistricts(data);
            } catch (error) {
                console.error('Error fetching districts:', error);
            } finally {
                setLoading(prev => ({ ...prev, districts: false }));
            }
        };
        fetchDistrictData();
    }, []);

    const handleDistrictChange = async (districtId: string, keepWard = false) => {
        setSelectedDistrict(districtId);
        if (!keepWard) {
            form.setFieldsValue({ ward: undefined });
        }
        await loadWards(districtId);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const district = districts.find(d => d.id === values.district)?.full_name || '';
            const ward = wards.find(w => w.id === values.ward)?.full_name || '';
            const fullAddress = `${values.addressDetail}, ${ward}, ${district}, TP.HCM`;

            onSubmit({
                ...values,
                address: fullAddress
            });
            onNext();
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto border-2 border-gray-300 rounded-xl p-4">
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Tên người nhận"
                    name="fullName"
                    rules={[{ required: true, message: 'Vui lòng nhập tên người nhận!' }]
                    }
                >
                    <Input placeholder="Xin ghi rõ họ và tên" className="border-none rounded-xl shadow-lg	" />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' },
                    {
                        pattern: /^(0|84)(3|5|7|8|9)[0-9]{8}$/,
                        message: 'Số điện thoại không hợp lệ!'
                    },
                    {
                        validator: (_, value) => {
                            if (value && !/^[0-9]+$/.test(value)) {
                                return Promise.reject('Vui lòng chỉ nhập số!');
                            }
                            return Promise.resolve();
                        }
                    }]}
                    validateTrigger="onBlur"
                >
                    <Input
                        placeholder="Số điện thoại"
                        maxLength={10}
                        className="border-none rounded-xl shadow-lg	"
                        onKeyPress={(e) => {
                            const charCode = e.which ? e.which : e.keyCode;
                            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                e.preventDefault();
                            }
                        }}
                    />
                </Form.Item>

                <div className="space-y-4">
                    <Form.Item
                        label="Quận/Huyện"
                        name="district"
                        rules={[{ required: true, message: 'Vui lòng chọn Quận/Huyện!' }]}
                    >
                        <Select
                            placeholder="Chọn Quận/Huyện"
                            onChange={(value) => handleDistrictChange(value)}
                            loading={loading.districts}
                        >
                            {districts.map(district => (
                                <Select.Option key={district.id} value={district.id}>
                                    {district.full_name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Phường/Xã"
                        name="ward"
                        rules={[{ required: true, message: 'Vui lòng chọn Phường/Xã!' }]}
                    >
                        <Select
                            placeholder="Chọn Phường/Xã"
                            disabled={!selectedDistrict}
                            loading={loading.wards}
                        >
                            {wards.map(ward => (
                                <Select.Option key={ward.id} value={ward.id}>
                                    {ward.full_name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ cụ thể"
                        name="addressDetail"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cụ thể!' }]}
                    >
                        <Input placeholder="Số nhà, tên đường..." className="border-none rounded-xl shadow-lg	" />
                    </Form.Item>
                </div>

                <Form.Item label="Ghi chú" name="note">
                    <Input.TextArea placeholder="Nếu cần gấp hoặc có lưu ý hãy cho shop biết" className="border-none rounded-xl shadow-lg	" />
                </Form.Item>

                <div className="flex justify-end gap-4">
                    <Button size="large" onClick={onPrev}>Quay lại</Button>
                    <Button type="primary" size="large" onClick={handleSubmit} className="bg-blue-500">
                        Tiếp tục
                    </Button>
                </div>
            </Form>
        </div>
    );
};