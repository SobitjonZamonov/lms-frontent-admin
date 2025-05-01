import { useNavigate } from "react-router-dom";
import { Input, Button, Form, Typography } from "antd";
import { usePostLogin } from "./service/mutation/usePostLogin";
import { useAuthStore } from "../../store/useAuthStore";
import { IAuthResponse } from "../../utils";
import { useEffect } from "react";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const { isLogged, logIn } = useAuthStore((state) => state);
  const { mutate, isPending } = usePostLogin();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isLogged) {
      navigate("/", { replace: true });
    }
  }, [isLogged, navigate]);

  const onFinish = (values: { login: string; password: string }) => {
    mutate(
      {
        username: values.login.trim(),
        password: values.password.trim(),
      },
      {
        onSuccess: (data: IAuthResponse) => {
          logIn({ user: data.user, token: data.data.accessToken });
          navigate("/dashboard", { replace: true });
        },
        onError: (error: any) => {
          const errorMessage =
            error.response?.data?.message || "Login yoki parol xato!";
          form.setFields([
            {
              name: "login",
              errors: [errorMessage],
            },
            {
              name: "password",
              errors: [errorMessage],
            },
          ]);
        },
      }
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
      }}
    >
      <div
        style={{
          width: 400,
          padding: 40,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
          Tizimga kirish
        </Title>
        <Form
          form={form}
          name="login-form"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Login"
            name="login"
            rules={[{ required: true, message: "Loginni kiriting!" }]}
          >
            <Input placeholder="Login" />
          </Form.Item>

          <Form.Item
            label="Parol"
            name="password"
            rules={[{ required: true, message: "Parolni kiriting!" }]}
          >
            <Input.Password placeholder="Parol" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              block
              size="large"
              style={{ background: "#7d41ed", borderColor: "#7d41ed" }}
            >
              Kirish
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
