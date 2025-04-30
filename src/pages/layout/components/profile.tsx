import { Avatar, Card, Descriptions, Button, Space, Divider, BackTop } from 'antd';
import { UserOutlined, EnvironmentOutlined, EditOutlined } from '@ant-design/icons';
import { useAuthStore } from '../../../store/useAuthStore';
import { Link } from 'react-router-dom'; // Link komponentini import qilish unutilgan

const AdminProfile = () => {
    const userData = {
        address: "Toshkent Sentr",
        avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    };
    const { user } = useAuthStore();

    return (
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
            <Card
                title="Profil ma'lumotlari"
                extra={
                    <Space>
                        <Button 
                            type="primary"
                            style={{
                                backgroundColor: "var(--breand-rang-2)"
                            }} 
                            icon={<EditOutlined />}
                        >
                            Tahrirlash
                        </Button>
                        <Link to="/">
                            <Button type="primary"
                            style={{
                                backgroundColor: "var(--breand-rang-1)"
                            }}>Orqaga</Button>
                        </Link>
                    </Space>
                }
            >
                <Space size={20} align="start">
                    <Avatar
                        size={120}
                        src={userData.avatar}
                        icon={<UserOutlined />}
                        style={{ border: '2px solid #1890ff' }}
                    />

                    <Descriptions column={1}>
                        <Descriptions.Item label="Ism">{user?.full_name}</Descriptions.Item>
                        <Descriptions.Item label="Rol">{user?.role}</Descriptions.Item>
                        <Descriptions.Item label="Username">
                            {user?.username}
                        </Descriptions.Item>
                        <Descriptions.Item label="Manzil">
                            <Space>
                                <EnvironmentOutlined />
                                {userData.address}
                            </Space>
                        </Descriptions.Item>
                    </Descriptions>
                </Space>

                <Divider />
            </Card>
        </div>
    );
};

export default AdminProfile;