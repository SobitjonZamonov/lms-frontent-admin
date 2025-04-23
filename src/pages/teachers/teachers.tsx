import { Layout, theme, Table, Tag, Space, Button } from 'antd';
import ShareIcon from '../students/assets/shareIcon1';
import SortIcon from '../students/assets/sortIcon';
import AddStudent from '../students/assets/addstudentIcon';
import React, { useState } from 'react';
import type { TableColumnsType, TableProps } from 'antd';
import Edit from '../students/assets/edit';
import Delete from '../students/assets/delete';
import { Link } from 'react-router-dom';
import SidebarLayout from '../../components/layout/layout';

const { Content } = Layout;

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
    key: React.Key;
    id: number;
    fio: string;
    birthDate: string;
    gender: string;
    kontakt: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: '#',
        dataIndex: 'id',
        width: 50,
        align: 'center',
    },
    {
        title: 'O\'qituvchilar F.I.O',
        dataIndex: 'fio',
        width: 200,
    },
    {
        title: 'Tug\'ilgan sana',
        dataIndex: 'birthDate',
        width: 120,
        align: 'center',
    },
    {
        title: 'Jinsi',
        dataIndex: 'gender',
        width: 100,
        align: 'center',
        render: (gender) => (
            <Tag color={gender === 'Qiz' ? 'pink' : 'blue'}>{gender}</Tag>
        ),
    },
    {
        title: 'Kontakt',
        dataIndex: 'kontakt',
        width: '225px',
        align: 'center'
    },
    {
        title: 'Imkoniyatlar',
        key: 'actions',
        width: 150,
        align: 'center',
        render: (_, record) => (
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
                ><Edit /></Button>
                <Button type="link" size="small" danger><Delete /></Button>
            </Space>
        ),
    },
];

const dataSource: DataType[] = [
    {
        key: 1,
        id: 1,
        fio: 'Qodirov Azizbek',
        birthDate: '05.05.1985',
        gender: 'O\'g\'il',
        kontakt: '+998 (93) 123-45-67'
    },
    {
        key: 2,
        id: 2,
        fio: 'Karimova Zuhra',
        birthDate: '15.03.1980',
        gender: 'Qiz',
        kontakt: '+998 (93) 123-45-67'
    },
    {
        key: 3,
        id: 3,
        fio: 'Nosirov Jasur',
        birthDate: '22.07.1975',
        gender: 'O\'g\'il',
        kontakt: '+998 (93) 123-45-67'
    },
    {
        key: 4,
        id: 4,
        fio: 'Olimova Sarvinoz',
        birthDate: '10.01.1982',
        gender: 'Qiz',
        kontakt: '+998 (93) 123-45-67'
    },
    {
        key: 5,
        id: 5,
        fio: 'Yusupov Sardor',
        birthDate: '30.11.1978',
        gender: 'O\'g\'il',
        kontakt: '+998 (93) 123-45-67'
    },
];

const Teachers = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <Layout>
            <SidebarLayout />
            <Content style={{
                marginLeft: 250, // Sidebar kengligiga teng bo'lishi kerak
                padding: '24px',
                minHeight: '100vh',
                marginTop: '-630px'
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
                        <h1 className='font-semibold text-[26px] text-[#1C274C]'>O'qituvchilar jadvali</h1>
                        <div className='flex gap-3.5'>
                            <Link to="/teachers/add">
                                <button className='border-2 w-[136px] h-[36px] rounded-[4px] border-[#DDDD] cursor-pointer flex justify-center items-center gap-3 font-medium text-[16px] text-[#3AADA8] hover:bg-[#DDD4]'>
                                    <AddStudent />Qo'shish
                                </button>
                            </Link>

                            <button className='border-2 w-[36px] h-[36px] rounded-[4px] border-[#DDDD] cursor-pointer flex justify-center items-center hover:bg-[#DDD4]'><ShareIcon /></button>
                            <button className='border-2 w-[36px] h-[36px] rounded-[4px] border-[#DDDD] cursor-pointer flex justify-center items-center hover:bg-[#DDD4]'><SortIcon /></button>
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
                                showTotal: (total) => `Jami ${total} ta o'qituvchi`,
                            }}
                            scroll={{ x: 'max-content' }}
                        />
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default Teachers;