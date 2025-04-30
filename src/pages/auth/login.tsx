import { useNavigate } from "react-router-dom";
import { Input, Button, Form } from "antd";
import { usePostLogin } from "./service/mutation/usePostLogin";
import { useAuthStore } from "../../store/useAuthStore";
import { IAuthResponse } from "../../utils";
import { useEffect } from "react";

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
      { username: values.login.trim(), password: values.password.trim() },
      {
        onSuccess: (data: IAuthResponse) => {
          logIn({ user: data.user, token: data.data.accessToken });
          navigate("/dashboard", { replace: true });
        },
        onError: (error: any) => {
          const errorMessage = error.response?.data?.message || "Login yoki parol xato!";
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
    <div className="flex w-[1200px] h-[690px] justify-center items-center ml-[150px]">
      <div className="flex flex-col justify-center items-center w-[450px] h-[400px] gap-[40px]">
        <h1 className="font-medium text-[32px] text-center text-[#0e1427]">
          Tizimga kirish
        </h1>
        <Form
          form={form}
          name="login-form"
          onFinish={onFinish}
          layout="vertical"
          style={{ width: "100%" }}
        >
          <Form.Item
            name="login"
            rules={[{ required: true, message: "Loginni kiriting!" }]}
          >
            <Input placeholder="Login" variant="underlined" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Parolni kiriting!" }]}
          >
            <Input.Password placeholder="Parol" variant="underlined" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              loading={isPending}
              style={{
                width: "450px",
                height: "64px",
                background: "#7d41ed",
                fontSize: "18px",
                color: "#fff"
              }}
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
