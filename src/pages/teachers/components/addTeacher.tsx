import { Layout, theme, Upload, message, Input } from 'antd';
import CancalIcon from '../../students/assets/cancel';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import UploadIcon from '../../students/assets/upload';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import type { DatePickerProps } from 'antd';
import { DatePicker, Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import SaveChanges from '../../students/assets/saqlashIcon';
import SidebarLayout from '../../../components/layout/layout';

const { Content } = Layout;

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
};

const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};

const genderItems: MenuProps['items'] = [
    {
        label: 'O\'g\'il',
        key: '1',
    },
    {
        label: 'Qiz',
        key: '2',
    },
];

const specialtyItems: MenuProps['items'] = [
    {
        label: 'Ingliz tili',
        key: '1',
    },
    {
        label: 'Matematika',
        key: '2',
    },
    {
        label: 'Fizika',
        key: '3',
    },
];

const experienceItems: MenuProps['items'] = [
    {
        label: '1 yil',
        key: '1',
    },
    {
        label: '2-5 yil',
        key: '2',
    },
    {
        label: '5+ yil',
        key: '3',
    },
];

const educationItems: MenuProps['items'] = [
    {
        label: 'Oliy',
        key: '1',
    },
    {
        label: 'O\'rta maxsus',
        key: '2',
    },
];

const salaryTypeItems: MenuProps['items'] = [
    {
        label: 'Oylik',
        key: '1',
    },
    {
        label: 'Soatlik',
        key: '2',
    },
];

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};

const TeacherAdd = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [selectedGender, setSelectedGender] = useState<string>('Jinsni tanlang');
    const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Mutaxassislik');
    const [selectedExperience, setSelectedExperience] = useState<string>('Tajriba');
    const [selectedEducation, setSelectedEducation] = useState<string>('Ma\'lumoti');
    const [selectedSalaryType, setSelectedSalaryType] = useState<string>('Maosh turi');

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

    const handleGenderMenuClick: MenuProps['onClick'] = (e) => {
        const selected = genderItems.find(item => item?.key === e.key);
        if (selected) {
            setSelectedGender(selected.label as string);
        }
    };

    const handleSpecialtyMenuClick: MenuProps['onClick'] = (e) => {
        const selected = specialtyItems.find(item => item?.key === e.key);
        if (selected) {
            setSelectedSpecialty(selected.label as string);
        }
    };

    const handleExperienceMenuClick: MenuProps['onClick'] = (e) => {
        const selected = experienceItems.find(item => item?.key === e.key);
        if (selected) {
            setSelectedExperience(selected.label as string);
        }
    };

    const handleEducationMenuClick: MenuProps['onClick'] = (e) => {
        const selected = educationItems.find(item => item?.key === e.key);
        if (selected) {
            setSelectedEducation(selected.label as string);
        }
    };

    const handleSalaryTypeMenuClick: MenuProps['onClick'] = (e) => {
        const selected = salaryTypeItems.find(item => item?.key === e.key);
        if (selected) {
            setSelectedSalaryType(selected.label as string);
        }
    };

    return (
        <Layout>
            <SidebarLayout />
            <Content style={{
                marginLeft: 250,
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
                        <h1 className='font-semibold text-[26px] text-[#1C274C]'>O'qituvchi qo'shish</h1>
                        <div className='flex gap-3.5'>
                            <Link to="/teachers">
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
                                        <Dropdown menu={{ items: genderItems, onClick: handleGenderMenuClick }}>
                                            <Button style={{ width: "199px", height: "45px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Space>
                                                    {selectedGender}
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
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Tel raqami</label>
                                        <Input placeholder="+998 (__) ___-__-__" style={{ width: "199px", height: "45px" }} />
                                    </div>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Mutaxassisligi</label>
                                        <Dropdown menu={{ items: specialtyItems, onClick: handleSpecialtyMenuClick }}>
                                            <Button style={{ width: "199px", height: "45px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Space>
                                                    {selectedSpecialty}
                                                </Space>
                                                <DownOutlined />
                                            </Button>
                                        </Dropdown>
                                    </div>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Tajribasi</label>
                                        <Dropdown menu={{ items: experienceItems, onClick: handleExperienceMenuClick }}>
                                            <Button style={{ width: "199px", height: "45px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Space>
                                                    {selectedExperience}
                                                </Space>
                                                <DownOutlined />
                                            </Button>
                                        </Dropdown>
                                    </div>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Ma'lumoti</label>
                                        <Dropdown menu={{ items: educationItems, onClick: handleEducationMenuClick }}>
                                            <Button style={{ width: "199px", height: "45px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Space>
                                                    {selectedEducation}
                                                </Space>
                                                <DownOutlined />
                                            </Button>
                                        </Dropdown>
                                    </div>
                                </div>

                                <div className='w-[637px] flex gap-[20px] ml-[-199px] mt-[40px]'>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Maosh turi</label>
                                        <Dropdown menu={{ items: salaryTypeItems, onClick: handleSalaryTypeMenuClick }}>
                                            <Button style={{ width: "199px", height: "45px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Space>
                                                    {selectedSalaryType}
                                                </Space>
                                                <DownOutlined />
                                            </Button>
                                        </Dropdown>
                                    </div>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Maosh sanasi</label>
                                        <DatePicker onChange={onChange} style={{ width: "199px", height: "45px" }} />
                                    </div>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Maoshi</label>
                                        <Input placeholder="Summa" style={{ width: "199px", height: "45px" }} />
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

export default TeacherAdd;