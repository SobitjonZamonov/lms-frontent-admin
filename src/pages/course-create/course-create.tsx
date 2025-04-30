import { Button, Col, FormProps, Row, Form, Input, notification } from "antd";
import Title from "antd/es/typography/Title";
import "./css/style.css";
//@ts-ignore
import AddIconSvg from "../../assets/svg/add.icon.svg";
//@ts-ignore
import FileUploadIconSvg from "../../assets/svg/file-upload.icon.svg";
//@ts-ignore
import OkIconSvg from "../../assets/svg/create.ok.icon.svg";
//@ts-ignore
import NoIconSvg from "../../assets/svg/create.no.icon.svg";
import { useNavigate } from "react-router-dom";
import { usePostCourseCreate } from "./service/mutation/usePostCourseCreate";
export type FieldType = {
  name: string;
  duration: string;
};

const CourseCreate = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const { mutate: CreateCourse, isPending } = usePostCourseCreate();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const CourseData = {
      name: values.name.trim(),
      duration: +values.duration,
      description: "bu guruh yaxshi guruh",
      status: "ACTIVE",
    };
    CreateCourse(CourseData, {
      onSuccess: () => {
        api.success({
          message: `Ajoyib natija`,
          description:
            "Tizimidagi jadvalni to’ldirish muvaffaqiyatli bajarildi.",
        });
        form.resetFields();
      },
      onError: (err: any) => {
        api.error({
          message: `Bekor qilindi!`,
          description: `Tizimidagi jadvalni to’ldirish muvaffaqiyatsiz bajarildi ${err?.response?.data?.message}`,
        });
      },
    });
  };

  return (
    <>
      {contextHolder}
      <Row
        style={{
          padding: "22px 20px 15px 20px",
          borderBottom: "1px solid var(--qidiruv-tizimi-1)",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <Title
          level={2}
          style={{
            fontWeight: 600,
            fontSize: "26px",
            color: "var(--matn-rang-1)",
            fontFamily: "var(--font-family)",
            margin: 0,
          }}
        >
          {" "}
          Krus qo’shish
        </Title>
        <Row style={{ gap: "15px", alignItems: "center" }}>
          <Button
            onClick={() => navigate("/courses")}
            style={{
              display: "flex",
              gap: "10px",
              padding: "18px 20px",
              fontFamily: " var(--font-family)",
              fontWeight: 500,
              fontSize: "16px",
              color: "var(--breand-rang-2)",
              border: "1px solid var(--qidiruv-tizimi-1)",
              borderRadius: "4px",
              boxShadow: "2px 2px 2px 0 rgba(0, 0, 0, 0.1)",
              background: "var(--stroka-rang-2)",
            }}
          >
            <img src={NoIconSvg} alt="" />
            Bekor qilish
          </Button>
          <Button
            loading={isPending}
            onClick={() => form.submit()}
            style={{
              display: "flex",
              gap: "10px",
              padding: "18px 20px",
              fontFamily: " var(--font-family)",
              fontWeight: 500,
              fontSize: "16px",
              color: "var(--breand-rang-2)",
              border: "1px solid var(--qidiruv-tizimi-1)",
              borderRadius: "4px",
              boxShadow: "2px 2px 2px 0 rgba(0, 0, 0, 0.1)",
              background: "var(--stroka-rang-2)",
            }}
          >
            <img src={OkIconSvg} alt="" />
            Saqlash
          </Button>
        </Row>
      </Row>
      <Col style={{ padding: "40px 20px" }}>
        <Form
          form={form}
          name="nest-messages"
          layout="vertical"
          className="course-create-form"
          onFinish={onFinish}
          style={{ width: "100%", maxWidth: "full" }}
        >
          <Row style={{ gap: "25px" }}>
            <Form.Item<FieldType>
              label={<span className="form_label__title">Nomi</span>}
              name="name"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input className="form_input" />
            </Form.Item>
            <Form.Item<FieldType>
              label={<span className="form_label__title">Davomiligi</span>}
              name="duration"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input className="form_input" />
            </Form.Item>
          </Row>
        </Form>
      </Col>
    </>
  );
};

export default CourseCreate;
