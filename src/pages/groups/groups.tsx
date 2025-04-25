import { Layout, theme, Table, Tag, Space, Button } from 'antd';
import ShareIcon from '../students/assets/shareIcon1';
import SortIcon from '../students/assets/sortIcon';
import AddStudent from '../students/assets/addstudentIcon';
import React, { useState } from 'react';
import Edit from '../students/assets/edit';
import Delete from '../students/assets/delete';
import { Link } from 'react-router-dom';
import SidebarLayout from '../../components/layout/layout';
import { CalendarOutlined, TeamOutlined } from '@ant-design/icons';

const { Content } = Layout;

interface GroupType {
    key: string;
    id: number;
    name: string;
    startDate: string;
    level: string;
}

const columns = [
    {
        title: '#',
        dataIndex: 'id',
        width: 50,
        align: 'center',
    },
    {
        title: 'Nomi',
        dataIndex: 'name',
        key: 'name',
        render: (text: string) => <strong>{text}</strong>,
    },
    {
        title: 'Boshlangan sana',
        dataIndex: 'startDate',
        key: 'startDate',
        render: (date: string) => (
            <div className="flex items-center justify-center">
                <CalendarOutlined className="mr-2" />
                {date}
            </div>
        ),
    },
    {
        title: 'Daraja',
        dataIndex: 'level',
        key: 'level',
        render: (level: string) => (
            <Tag color={level.includes('sinf') ? 'green' : 'blue'} className="flex items-center">
                <TeamOutlined className="mr-1" />
                {level}
            </Tag>
        ),
    },
    {
        title: 'Imkoniyatlar',
        key: 'actions',
        width: 150,
        align: 'center',
        render: () => (
            <Space size="small">
                <Button
                    type="link"
                    size="small"
                    style={{
                        border: '1px solid #DDDD',
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px"
                    }}
                >
                    <Edit />
                </Button>
                <Button
                    type="link"
                    size="small"
                    danger
                    style={{
                        border: '1px solid #DDDD',
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px"
                    }}
                >
                    <Delete />
                </Button>
            </Space>
        ),
    },
];

const dataSource: GroupType[] = [
    {
        key: '1',
        id: 1,
        name: 'Yulduzcha',
        startDate: '15.05.2024',
        level: '15-guruh',
    },
    {
        key: '2',
        id: 2,
        name: 'Baxorcha',
        startDate: '15.05.2024',
        level: '1-sinf',
    },
];

const Groups = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
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
                    <div className='w-full h-[50px] flex justify-between items-center border-b-2 border-[#DDDD] pb-4'>
                        <h1 className='font-semibold text-[26px] text-[#1C274C]'>Guruhlar jadvali</h1>
                        <div className='flex gap-3.5'>
                            <Link to="/groups/add">
                                <button className='border-2 w-[136px] h-[36px] rounded-[4px] border-[#DDDD] cursor-pointer flex justify-center items-center gap-3 font-medium text-[16px] text-[#3AADA8] hover:bg-[#DDD4]'>
                                    <AddStudent />Qo'shish
                                </button>
                            </Link>

                            <button className='border-2 w-[36px] h-[36px] rounded-[4px] border-[#DDDD] cursor-pointer flex justify-center items-center hover:bg-[#DDD4]'>
                                <ShareIcon />
                            </button>
                            <button className='border-2 w-[36px] h-[36px] rounded-[4px] border-[#DDDD] cursor-pointer flex justify-center items-center hover:bg-[#DDD4]'>
                                <SortIcon />
                            </button>
                        </div>
                    </div>

                    <div style={{ marginTop: 30 }}>
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={dataSource}
                            bordered
                            size="middle"
                            pagination={{
                                pageSize: 10,
                                showSizeChanger: false,
                                showTotal: (total) => `Jami ${total} ta o'quvchi`,
                            }}
                            scroll={{ x: 'max-content' }}
                        />
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default Groups;