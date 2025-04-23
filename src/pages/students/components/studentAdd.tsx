import { Layout, theme, Upload, message, Input } from 'antd';
import CancalIcon from '../assets/cancel';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import UploadIcon from '../assets/upload';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import type { DatePickerProps } from 'antd';
import { DatePicker, Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import SaveChanges from '../assets/saqlashIcon';
import SidebarLayout from '../../../components/layout/layout';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
};

const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};

const items: MenuProps['items'] = [
    {
        label: 'O\'g\'il',
        key: '1',
    },
    {
        label: 'Qiz',
        key: '2',
    },
];

const menuProps = {
    items,
    onClick: handleMenuClick,
};

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};

const { Content } = Layout;

const StudentAdd = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleImageChange = (info: any) => {
        const file = info.file;
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
            message.error('Faqat JPG yoki PNG faylni yuklash mumkin!');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    return (
        <Layout>
            <SidebarLayout />
            <Content style={{
                marginLeft: 250, // Sidebar kengligiga teng bo'lishi kerak
                padding: '24px',
                minHeight: '100vh',
                marginTop: "-630px"
            }}>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: '80vh',
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <div className='w-full h-[50px] flex justify-between border-b-2 border-[#DDDD]'>
                        <h1 className='font-semibold text-[26px] text-[#1C274C]'>O'quvchilarni qo'shish</h1>
                        <div className='flex gap-3.5'>
                            <Link to="/students">
                                <button className='border-2 w-[136px] h-[36px] rounded-[4px] border-[#DDDD] cursor-pointer flex justify-center items-center gap-3 font-medium text-[16px] text-[#FF5F5F] hover:bg-[#DDD4]'>
                                    <CancalIcon />Bekor qilish
                                </button>
                            </Link>
                            <button className='border-2 w-[103px] h-[36px] rounded-[4px] border-[#DDDD] cursor-pointer flex justify-center items-center text-[#3AADA8] font-medium text-[16px] gap-[5px] hover:bg-[#DDD4]'>
                                <SaveChanges />Saqlash
                            </button>
                        </div>
                    </div>

                    <div className='mt-6'>
                        <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: "30px" }}>
                            <Upload
                                name="image"
                                showUploadList={false}
                                beforeUpload={() => false}
                                onChange={handleImageChange}
                            >
                                <label className='font-medium text-[16px] text-[#1C274C]'>Rasm</label>
                                <div
                                    className='flex flex-col justify-center items-center'
                                    style={{
                                        width: '199px',
                                        maxWidth: '500px',
                                        height: '156px',
                                        border: '1px dashed #d9d9d9',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        backgroundColor: '#fafafa'
                                    }}
                                >
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt="uploaded"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                        />
                                    ) : (
                                        <>
                                            <UploadIcon />
                                            <div style={{ marginTop: 8, color: '#1d2951' }}>Rasmni kiriting</div>
                                        </>
                                    )}
                                </div>
                            </Upload>

                            <div>
                                <div className='w-[637px] flex gap-[20px] ml-[20px]'>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Ism</label>
                                        <Input placeholder="Shokirjon" style={{ width: "199px", height: "45px" }} />
                                    </div>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Familiya</label>
                                        <Input placeholder="Sultonov" style={{ width: "199px", height: "45px" }} />
                                    </div>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Sharfi</label>
                                        <Input placeholder="Tursinjon o'gli" style={{ width: "199px", height: "45px" }} />
                                    </div>
                                </div>
                                <div className='w-[637px] flex gap-[20px] ml-[20px]'>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Tug'ilgan sana</label>
                                        <DatePicker onChange={onChange} style={{ width: "199px", height: "45px" }} />
                                    </div>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Jinsi</label>
                                        <Dropdown menu={menuProps}>
                                            <Button style={{ width: "199px", height: "45px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Space>
                                                    Jinsni tanlang
                                                </Space>
                                                <DownOutlined />
                                            </Button>
                                        </Dropdown>
                                    </div>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Yashash manzili</label>
                                        <Input placeholder="Manzil" style={{ width: "199px", height: "45px" }} />
                                    </div>
                                </div>
                                <div className='w-[637px] flex gap-[20px] ml-[-199px] mt-[40px]'>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Gurux raqami</label>
                                        <Dropdown menu={menuProps}>
                                            <Button style={{ width: "199px", height: "45px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Space>
                                                    Guruhni tanlang
                                                </Space>
                                                <DownOutlined />
                                            </Button>
                                        </Dropdown>
                                    </div>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>To'lov holati</label>
                                        <Dropdown menu={menuProps}>
                                            <Button style={{ width: "199px", height: "45px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Space>
                                                    Holatni tanlang
                                                </Space>
                                                <DownOutlined />
                                            </Button>
                                        </Dropdown>
                                    </div>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>To'lov summa</label>
                                        <Input placeholder="Summa" style={{ width: "199px", height: "45px" }} />
                                    </div>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Ota-Onasini tel raqami</label>
                                        <Input placeholder="Telefon raqami" style={{ width: "199px", height: "45px" }} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Calendar fullscreen={false} onPanelChange={onPanelChange} style={{ width: "287px", height: "407px" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default StudentAdd;