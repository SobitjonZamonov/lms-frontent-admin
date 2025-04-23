import { Layout, theme, Input, Card, List, Typography, Avatar, Row, Col } from 'antd';
import TableIcon from './assets/tablebuttonIcon';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import Krimlar from './assets/kirimlar';
import Chiqimlar from './assets/chiqimlar';
import BolalarSoni from './assets/bolalarSoni';
import SidebarLayout from '../../components/layout/layout';

const { Content } = Layout;
const { Title, Text } = Typography;

const teachers = [
    {
        id: 1,
        name: `Sultonov Shokirjon Tursinjon o\'g\'li`,
        birthDate: '15.05.1996',
        gender: 'O\'g\'il bola',
        phone: '+998 (93) 123-45-67',
        address: 'Toshkent.Sentr'
    },
    {
        id: 2,
        name: 'Nodirova Shodiya Tursinjon qizi',
        birthDate: '15.05.1996',
        gender: 'Qiz bola',
        phone: '+998 (93) 123-45-67',
        address: 'Toshkent.Sentr'
    },
    {
        id: 3,
        name: 'Sultonov Shokirjon Tursinjon o\'g\'li',
        birthDate: '15.05.1996',
        gender: 'O\'g\'il bola',
        phone: '+998 (93) 123-45-67',
        address: 'Toshkent.Sentr'
    },
];

const students = [
    {
        id: 1,
        name: `Sultonov Shokirjon Tursinjon o\'g\'li`,
        birthDate: '15.05.1996',
        gender: 'O\'g\'il bola',
    },
    {
        id: 2,
        name: 'Nodirova Shodiya Tursinjon qizi',
        birthDate: '15.05.1996',
        gender: 'Qiz bola',
    },
    {
        id: 3,
        name: 'Sultonov Shokirjon Tursinjon o\'g\'li',
        birthDate: '15.05.1996',
        gender: 'O\'g\'il bola',
    },
    {
        id: 4,
        name: 'Sultonov Shokirjon Tursinjon o\'g\'li',
        birthDate: '15.05.1996',
        gender: 'O\'g\'il bola',
    },
];

const data = [
    { name: '0-1', value: 40 },
    { name: '1-2', value: 24 },
    { name: '2-3', value: 12 },
    { name: '3-4', value: 10 },
    { name: '4-5', value: 8 },
    { name: '5-6', value: 4 },
    { name: '6-7', value: 2 },
];

const COLORS = ['#00bcd4', '#4dd0e1', '#80deea', '#b2ebf2', '#e0f7fa', '#f44336', '#bbdefb'];

const Dashboard = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

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
                    <div className='w-full h-[50px] border-b-2 border-[#DDDD]'>
                        <h1 className='font-semibold text-[26px] text-[#1C274C]'>Asosiy bo'lim</h1>
                    </div>

                    <Row gutter={[24, 24]} style={{ marginTop: 40 }}>
                        {/* O'qituvchilar kartasi */}
                        <Col xs={24} md={16}>
                            <Card style={{ borderRadius: 4, width: "880px" }}>
                                <div className="flex justify-between items-center mb-4">
                                    <Title level={4} className="mb-0">O'qituvchilar soni: {teachers.length} ta</Title>
                                    <div className='flex gap-2'>
                                        <button className='flex justify-center items-center border w-[50px] h-[33px] rounded-[4px] border-[#DDDD] cursor-pointer'>
                                            <TableIcon />
                                        </button>
                                        <button className='border w-[128px] h-[33px] rounded-[4px] border-[#DDDD] cursor-pointer'>O'qituvchilar</button>
                                        <button className='border w-[128px] h-[33px] rounded-[4px] border-[#DDDD] cursor-pointer'>Tarbiyachilar</button>
                                        <button className='border w-[128px] h-[33px] rounded-[4px] border-[#DDDD] cursor-pointer'>Ishchilar</button>
                                    </div>
                                </div>

                                <List
                                    itemLayout="vertical"
                                    dataSource={teachers}
                                    renderItem={(teacher) => (
                                        <List.Item key={teacher.id} className='border border-[#DDDD] rounded-[4px]'>
                                            <div className="flex items-center justify-start w-full pl-[5px]">
                                                <div className='flex gap-[20px] justify-center items-center'>
                                                    <Avatar
                                                        size={50}
                                                        src={`https://i.pravatar.cc/150?img=${teacher.id}`}
                                                    />
                                                    <Title level={5}>{teacher.name}</Title>
                                                    <Text>{teacher.birthDate}</Text>
                                                    <div className="flex gap-[10px]">
                                                        <Text> {teacher.gender}</Text><br />
                                                        <Text> {teacher.phone}</Text><br />
                                                        <Text> {teacher.address}</Text>
                                                    </div>
                                                </div>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>

                        {/* Statistikalar kartalari */}
                        <Col xs={24} md={6} className='flex absolute left-[100px]'>
                            <Card style={{ borderRadius: 4, marginBottom: 24 }}>
                                <div className="flex justify-start items-center mb-4">
                                    <div className='flex flex-col gap-2'>
                                        <button className='w-[44px] h-[44px] border rounded-[4px] justify-center items-center flex border-[#DDDD]'><Krimlar /></button>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Kirimlar</label>
                                        <label className='font-normal text-[26px] text-[#1C274C]'>12 000 000 so'm</label>
                                        <label className='font-normal text-[16px]'>Kechagi kunga nisbatan <span className='text-[#e13636]'>-30%</span></label>
                                    </div>
                                </div>
                            </Card>

                            <Card style={{ borderRadius: 4, marginBottom: 24 }}>
                                <div className="flex justify-start items-center mb-4">
                                    <div className='flex flex-col gap-2'>
                                        <button className='w-[44px] h-[44px] border rounded-[4px] justify-center items-center flex border-[#DDDD]'><Chiqimlar /></button>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Chiqimlar</label>
                                        <label className='font-normal text-[26px] text-[#1C274C]'>12 000 000 so'm</label>
                                        <label className='font-normal text-[16px]'>O'tgan haftaga nisbatan <span className='text-[#36e15e]'>+30%</span></label>
                                    </div>
                                </div>
                            </Card>

                            <Card style={{ borderRadius: 4 }}>
                                <div className="flex justify-start items-center mb-4">
                                    <div className='flex flex-col gap-2'>
                                        <button className='w-[44px] h-[44px] border rounded-[4px] justify-center items-center flex border-[#DDDD]'><BolalarSoni /></button>
                                        <label className='font-medium text-[16px] text-[#1C274C]'>Bolalar soni</label>
                                        <label className='font-normal text-[26px] text-[#1C274C]'>{students.length} ta</label>
                                        <label className='font-normal text-[16px]'>O'tgan oyga nisbatan<span className='text-[#36e15e]'>+30%</span></label>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
                        {/* Bugun kelgan bolalar */}
                        <Col xs={24} md={10}>
                            <Card style={{ borderRadius: 4, position: 'absolute', top: '-400px' }}>
                                <div className="flex justify-between items-center mb-4">
                                    <Title level={4} className="mb-0">Bugun kelgan <br />bolalar soni: {students.length}</Title>
                                    <div className='flex gap-2'>
                                        <label>Sana: </label>
                                        <Input placeholder="11.05.2024" disabled />
                                    </div>
                                </div>

                                <List
                                    itemLayout="vertical"
                                    dataSource={students}
                                    renderItem={(student) => (
                                        <List.Item key={student.id} className='border border-[#DDDD] rounded-[4px]'>
                                            <div className="flex items-center justify-start w-full pl-[5px]">
                                                <div className='flex gap-[20px] justify-center items-center'>
                                                    <Avatar
                                                        size={50}
                                                        src={`https://i.pravatar.cc/150?img=${student.id}`}
                                                    />
                                                    <Title level={5}>{student.name}</Title>
                                                    <div className="flex gap-[10px]">
                                                        <Text> {student.gender}</Text>
                                                    </div>
                                                </div>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>

                        {/* Bolalar statistikasi */}
                        <Col>
                            <Card style={{ borderRadius: 4, height: '400px', position: 'absolute', top: '-390px', right: '-360px' }}>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-normal text-[26px] text-[#1C274C]">Bolalarni yosh <br />bo'yicha statistikasi</h2>
                                    <span className="font-normal text-[50px] text-[#8AC5C2]">100%</span>
                                </div>
                                <PieChart width={300} height={300}>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                                </PieChart>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default Dashboard;