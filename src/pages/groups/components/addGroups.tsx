import {
    Layout,
    theme,
    Input,
    DatePicker,
    Button,
    Dropdown,
    Space,
    DatePickerProps,
    MenuProps
} from 'antd';
import CancalIcon from '../../students/assets/cancel';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import SaveChanges from '../../students/assets/saqlashIcon';
import SidebarLayout from '../../../components/layout/layout';

const { Content } = Layout;

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
};

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

const GroupsAdd = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Mutaxassislik');

    const handleSpecialtyMenuClick: MenuProps['onClick'] = (e) => {
        const selected = specialtyItems.find(item => item?.key === e.key);
        if (selected) {
            setSelectedSpecialty(selected.label as string);
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
                        <h1 className='font-semibold text-[26px] text-[#1C274C]'>Guruhlarni qo’shish</h1>
                        <div className='flex gap-3.5'>
                            <Link to="/groups">
                                <button className='border-2 w-[136px] h-[36px] rounded-[4px] border-[#DDDD] cursor-pointer flex justify-center items-center gap-3 font-medium text-[16px] text-[#FF5F5F] hover:bg-[#DDD4]'>
                                    <CancalIcon />Bekor qilish
                                </button>
                            </Link>
                            <Link to="/groups">
                                <button className='border-2 w-[103px] h-[36px] rounded-[4px] border-[#DDDD] cursor-pointer flex justify-center items-center text-[#3AADA8] font-medium text-[16px] gap-[5px] hover:bg-[#DDD4]'>
                                    <SaveChanges />Saqlash
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className='mt-6'>
                        <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: "30px" }}>
                            <div>
                                <div className='w-[637px] flex gap-[20px] ml-[-199px] mt-[40px]'>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Nomi</label>
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
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Boshlangan sana</label>
                                        <DatePicker onChange={onChange} style={{ width: "199px", height: "45px" }} />
                                    </div>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Daraja</label>
                                        <Input placeholder="Tursinjon o'gli" style={{ width: "199px", height: "45px" }} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default GroupsAdd;