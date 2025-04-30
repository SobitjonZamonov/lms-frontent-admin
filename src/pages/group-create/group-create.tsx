import {
  Button,
  Col,
  FormProps,
  Row,
  Form,
  Input,
  DatePicker,
  notification,
  Select,
  Avatar,
} from "antd";
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
import { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { usePostGroupCreate } from "./service/mutation/usePostGroupCreate";
import { useGetTeachersAll } from "../teachers/service/query/useGetTeachersAll";
import { useGetCourseAll } from "../courses/service/query/useGetCoursesAll";
type FieldType = {
  name: string;
  courseId: string;
  start_date: Dayjs;
  teacherId: string;
};

const GroupCreate = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const { mutate: createGroup, isPending } = usePostGroupCreate();
  const { data: CourseData } = useGetCourseAll();
  const { data: TeacherData } = useGetTeachersAll();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const GroupData = {
      name: values.name.trim(),
      course_id: values.courseId,
      teacher_id: values.teacherId,
      start_date: values.start_date.format("YYYY-MM-DD"),
      description: "bu guruh yaxshi guruh",
      status: "ACTIVE",
    };
    createGroup(GroupData, {
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
          Group qo’shish
        </Title>
        <Row style={{ gap: "15px", alignItems: "center" }}>
          <Button
            onClick={() => navigate("/groups")}
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
          className="group-create-form"
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
              label={<span className="form_label__title">Boshlangan sana</span>}
              name="start_date"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <DatePicker className="form_input" />
            </Form.Item>
            <Form.Item<FieldType>
              label={<span className="form_label__title">Course</span>}
              name="courseId"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: "199px",
                  height: "45px",
                  background: "transparent",
                }}
              >
                {CourseData?.data.map((Item, index) => (
                  <Select.Option key={index} value={Item?.course_id}>
                    {Item?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item<FieldType>
              label={
                <span className="form_label__title">O'qtuvchi biriktirish</span>
              }
              name="teacherId"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Ustoz ismini kiriting"
                style={{
                  width: "330px",
                  height: "45px",
                  background: "transparent",
                }}
                optionFilterProp="label"
                filterOption={(input, option) =>
                  typeof option?.label === "string" &&
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
              >
                {TeacherData?.data.map((Item) => (
                  <Select.Option
                    key={Item?.user_id}
                    label={Item?.full_name}
                    value={Item?.user_id}
                  >
                    <Row style={{ alignItems: "center", gap: "5px" }}>
                      <Avatar src={Item?.images[0]?.url} />
                      {Item?.full_name}
                    </Row>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Row>
        </Form>
      </Col>
    </>
  );
};

export default GroupCreate;
