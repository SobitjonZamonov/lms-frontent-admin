import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Input,
  Layout,
  Menu,
  Modal,
  Row,
  theme,
} from "antd";
// @ts-ignore
import MainLogo from "../../assets/svg/mian.logo.svg"
// @ts-ignore
import SearchIcon from "../../assets/svg/search.icon.svg";
// @ts-ignore
import NotificationIcon from "../../assets/svg/notification.icon.svg";
// @ts-ignore
import MenuIcon7 from "../../assets/svg/menu-icon-7.svg";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { menu, menuBootm, SelectedKeys } from "./components/layout.menu";
import Title from "antd/es/typography/Title";
import { useGetAmdinProfile } from "./service/query/useGetAmdinProfile";
import { useAuthStore } from "../../store/useAuthStore";
import LoadingSpinner from "../../components/spin";
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const handleLogoutClick = () => {
    setModal2Open(true);
  };
  const navigate = useNavigate();
  const { loOut } = useAuthStore((state) => state);
  const logout = () => {
    loOut();
    navigate("/login", { replace: true });
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { data, isLoading } = useGetAmdinProfile();
  if (isLoading) return <LoadingSpinner />;
  const path = useLocation().pathname.split("/")[1];
  const select = path ? SelectedKeys[path] : 1;
  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: "var( --oq-rang-1)" }}
      >
        <div
          className="demo-logo-vertical"
          style={{
            textAlign: "center",
            padding: "10px",
            marginBottom: "6px",
            borderTop: "none",
            border: "2px solid var(--stroka-rang-2)",
          }}
        >
          <img src={MainLogo} alt="Logo" style={{ width: "80%" }} />
        </div>
        <Menu
          style={{
            backgroundColor: "var( --oq-rang-1)",
            marginBottom: "300px",
          }}
          mode="inline"
          defaultSelectedKeys={[`${select}`]}
          items={menu}
        />
        <Menu
          style={{
            backgroundColor: "var( --oq-rang-1)",
          }}
          mode="inline"
          selectable={false}
          items={[
            ...menuBootm,
            {
              key: "7",
              icon: (
                <img src={MenuIcon7} width={24} height={24} alt="Chiqish" />
              ),
              label: "Chiqish",
              onClick: handleLogoutClick,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            height: "80px",
            display: "flex",
            alignItems: "center",
            background: colorBgContainer,
          }}
        >
          <Row
            justify={"space-between"}
            style={{ width: "100%", alignItems: "center" }}
          >
            <Row style={{ width: "full", alignItems: "center", gap: "10px" }}>
              {" "}
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <Input
                style={{
                  maxWidth: "210px",
                  padding: " 6px 10px 6px 15px",
                  border: "1px solid var(--qidiruv-tizimi-1)",
                  borderRadius: "4px",
                  fontWeight: 900,
                  fontSize: "16px",
                }}
                placeholder="Qidiruv tizimi..."
              />
            </Row>
            <Row
              style={{ gap: "10px", alignItems: "center", marginRight: "20px" }}
            >
              <Button
                type="default"
                shape="circle"
                style={{
                  width: 38,
                  height: 38,
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={NotificationIcon} width={24} height={24} alt="" />
              </Button>
              <Link to="/profile">
                <Avatar src={data?.data?.images[1]?.url} alt="Logo" size={38} />
              </Link>
              <Col>
                <Title
                  level={3}
                  style={{
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "var(--matn-rang-1)",
                    fontFamily: "var(--font-family)",
                    margin: 0,
                  }}
                >
                  {" "}
                  {data?.data?.full_name}
                </Title>
                <Title
                  level={4}
                  style={{
                    fontWeight: 400,
                    fontSize: "15px",
                    color: "var(--filter-matn-rang-1)",
                    fontFamily: "var(--font-family)",
                    margin: 0,
                  }}
                >
                  {" "}
                  ADMIN
                </Title>
              </Col>
            </Row>
          </Row>
        </Header>
        <Content
          className="custom-scroll"
          style={{
            backgroundColor: "var(--stroka-rang-2)",
            overflowY: "auto",
            height: "calc(100vh - 80px)",
          }}
        >
          <Outlet />
          <Modal
            centered
            closable={false}
            open={modal2Open}
            footer={[
              <Button
                key="cancel"
                onClick={() => setModal2Open(false)}
                style={{
                  backgroundColor: "var(--qidiruv-tizimi-1)",
                  color: "#000",
                  margin: "0 8px",
                  border: "none",
                  padding: "20px 30px",
                }}
              >
                Yo'q
              </Button>,
              <Button
                key="cancel"
                onClick={() => {
                  logout(), setModal2Open(false);
                }}
                style={{
                  backgroundColor: "#65eb94",
                  color: "#fff",
                  margin: "0 8px",
                  border: "none",
                  padding: "20px 30px",
                }}
              >
                Ha
              </Button>,
            ]}
          >
            <p>
              Platformadan chiqishni xohlaysizmi?
            </p>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
