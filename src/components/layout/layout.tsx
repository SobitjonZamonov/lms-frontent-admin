import { Layout, Menu, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Logo from '../../pages/dashboard/assets/logo';
import Icon1 from '../../pages/dashboard/assets/notificationIcon';
import Icon2 from '../../pages/dashboard/assets/profileIcon';
import Sozlamalar from '../../assets/sozlamalar';
import Chiqish from '../../assets/chiqish';
import Asosiy from '../../assets/asosiy';
import Oquvchilar from '../../assets/oquvchilar';
import Oqituvchilar from '../../assets/oqituvchilar';
import Guruhlar from '../../assets/guruhlar';

const { Sider, Header } = Layout;

const menuItems = [
    {
        key: '1',
        icon: <Asosiy />,
        label: 'Asosiy'
    },
    {
        key: '2',
        icon: <Oquvchilar />,
        label: `O'quvchilar`
    },
    {
        key: '3',
        icon: <Oqituvchilar />,
        label: `O'qituvchilar`
    },
    {
        key: '4',
        icon: <Guruhlar />,
        label: 'Guruhlar'
    },
    {
        key: '7',
        icon: <Sozlamalar />,
        label: 'Sozlamalar'
    },
    {
        key: '8',
        icon: <Chiqish />,
        label: 'Chiqish'
    },
];

const SidebarLayout = () => {
    const navigate = useNavigate();

    const handleMenuClick = (e: any) => {
        switch (e.key) {
            case '1':
                navigate('/dashboard');
                break;
            case '2':
                navigate('/students');
                break;
            case '3':
                navigate('/teachers');
                break;
            case '4':
                navigate('/groups');
                break;
            case '7':
                navigate('/settings');
                break;
            case '8':
                navigate('/login');
                break;
            default:
                break;
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                width={250}
                theme="light"
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    boxShadow: '2px 0 8px 0 rgba(29, 35, 41, 0.05)'
                }}
            >
                <div className='p-4 flex items-center justify-center'>
                    <Logo />
                </div>



                <Menu
                    theme="light"
                    mode="inline"
                    items={menuItems}
                    onClick={handleMenuClick}
                    style={{ fontWeight: '500', fontSize: "16px" }}
                />
            </Sider>

            <Layout style={{ marginLeft: 250 }}>
                <Header style={{
                    background: '#fff',
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingRight: '24px',
                    boxShadow: '0 1px 4px 0 rgba(0, 21, 41, 0.12)'
                }}>
                    <div className='flex gap-[10px] justify-center items-center'>
                        <div className='p-4'>
                            <Input placeholder="Qidiruv tizimi..." />
                        </div>
                        <button className='flex justify-center items-center border border-[#DDDDDD] w-[50px] h-[50px] rounded-[50%] cursor-pointer'>
                            <Icon1 />
                        </button>
                        <div className='flex justify-center items-center gap-[10px]'>
                            <button className='flex justify-center items-center border border-[#DDDDDD] w-[50px] h-[50px] rounded-[50%] cursor-pointer'>
                                <Icon2 />
                            </button>
                            <h2 className='font-medium text-[16px]'>Ruslan Mirzaev</h2>
                        </div>
                    </div>
                </Header>
            </Layout>
        </Layout>
    );
};

export default SidebarLayout;