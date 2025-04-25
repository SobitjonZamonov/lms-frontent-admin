import {
    Layout,
    theme,
    Input,
    Button,
    Dropdown,
    Space,
    MenuProps
} from 'antd';
import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import SidebarLayout from '../../components/layout/layout';

const { Content } = Layout;

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

const Settings = () => {
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
                        <h1 className='font-semibold text-[26px] text-[#1C274C]'>Sozlamalar</h1>
                        <Dropdown menu={{ items: specialtyItems, onClick: handleSpecialtyMenuClick }}>
                            <Button style={{ width: "199px", height: "45px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Space>
                                    {selectedSpecialty}
                                </Space>
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                    </div>

                    <div className='mt-6'>
                        <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: "30px" }}>
                            <div>
                                <div className='w-[637px] flex gap-[20px] ml-[-199px] mt-[40px]'>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Face ID</label>
                                        <Input placeholder="1234567i" style={{ width: "199px", height: "45px" }} />
                                    </div>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Api ID</label>
                                        <Input placeholder="55555555" style={{ width: "199px", height: "45px" }} />
                                    </div>
                                    <div className='flex flex-col gap-[5px]'>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Api HASH</label>
                                        <Input placeholder="b996cb497dfas365dd56" style={{ width: "199px", height: "45px" }} />
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

export default Settings;