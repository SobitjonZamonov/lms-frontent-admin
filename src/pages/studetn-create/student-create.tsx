import {
  Button,
  Col,
  FormProps,
  Row,
  Form,
  Input,
  Upload,
  DatePicker,
  Select,
  UploadProps,
  UploadFile,
  notification
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
import { useState } from "react";
import { useGetAllGroup } from "../groups/service/query/useGetGroupFilter";
import { useUploadImgStudent } from "./service/mutation/usePostStudentUploadIng";
import { usePostCreateStudent } from "./service/mutation/usePostStudentCreate";
import { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
type FieldType = {
  firstname: string;
  lastname: string;
  surname: string;
  gender: string;
  address: string;
  groupId: string;
  paymentType: string;
  sum: number;
  phone_number: string;
  data_of_birth: Dayjs;
};

const StudentCreate = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { mutate: uploadMutate, isPending: createImgPeading } =
    useUploadImgStudent();
  const { mutate: createStudent, isPending: createStudentPading } =
    usePostCreateStudent();
  const { data: groupData } = useGetAllGroup(1, 100);
  const changeUpload: UploadProps["onChange"] = ({ file }) => {
    if (file.originFileObj && !createImgPeading) {
      uploadMutate(file.originFileObj, {
        onSuccess: (data) => {
          setFileList([
            {
              uid: file.uid,
              name: file.name,
              status: "done",
              url: data.data.image_url,
            },
          ]);
        },
      });
    }
  };
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const StudentData = {
      img_url: fileList[0].url,
      full_name: `${values.lastname} ${values.firstname} ${values.surname}`,
      username: `sultonov009${Date.now()}`,
      password: `sultonov1003!A${Date.now()}`,
      gender: values.gender,
      address: values.address.trim(),
      groupId: values.groupId,
      paymentType: values.paymentType,
      sum: +values.sum,
      phone_number: values.phone_number,
      data_of_birth: values.data_of_birth.format("YYYY-MM-DD"),
    };
    createStudent(StudentData, {
      onSuccess: () => {
        api.success({
          message: `Ajoyib natija`,
          description:
            "Tizimidagi jadvalni to’ldirish muvaffaqiyatli bajarildi.",
        });
        form.resetFields();
        setFileList([]);
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
          O’quvchilarni qo’shish
        </Title>
        <Row style={{ gap: "15px", alignItems: "center" }}>
          <Button
            onClick={() => navigate("/students")}
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
            loading={createStudentPading}
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
          className="student-create-form"
          onFinish={onFinish}
          style={{ width: "100%", maxWidth: "full" }}
        >
          <Row style={{ gap: "25px", marginBottom: "30px" }}>
            <Form.Item
              style={{ width: "199px", height: "186px" }}
              label={<span className="form_label__title">Rasm</span>}
              valuePropName="fileList"
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                onChange={changeUpload}
                onRemove={() => setFileList([])}
                fileList={fileList}
                className="custom-upload"
              >
                {fileList.length === 0 ? (
                  <button
                    style={{
                      color: "inherit",
                      cursor: "inherit",
                      border: 0,
                      background: "none",
                    }}
                    type="button"
                  >
                    <img src={FileUploadIconSvg} alt="" />
                    <div
                      style={{
                        marginTop: 8,
                        fontFamily: " var(--font-family)",
                        fontWeight: 400,
                        fontSize: " 16px",
                        color: "var(--matn-rang-1)",
                      }}
                    >
                      Rasmni kiriting
                    </div>
                  </button>
                ) : null}
              </Upload>
            </Form.Item>
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Row style={{ gap: "25px" }}>
                <Form.Item<FieldType>
                  label={<span className="form_label__title">Ism</span>}
                  name="firstname"
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
                  label={<span className="form_label__title">Familiya</span>}
                  name="lastname"
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
                  label={<span className="form_label__title">Sharfi</span>}
                  name="surname"
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
              <Row style={{ gap: "25px" }}>
                <Form.Item<FieldType>
                  label={
                    <span className="form_label__title">Tug’ilgan sana</span>
                  }
                  name="data_of_birth"
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
                  label={<span className="form_label__title">Jinsi</span>}
                  name="gender"
                >
                  <Select
                    style={{
                      width: "199px",
                      height: "45px",
                      background: "transparent",
                    }}
                  >
                    <Select.Option value="MALE">
                      <span style={{ color: "var(--breand-rang-2)" }}>
                        Og’il bola
                      </span>
                    </Select.Option>
                    <Select.Option value="FEMALE">
                      {" "}
                      <span style={{ color: "var(--qizil-rang-1)" }}>
                        Qiz bola
                      </span>
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item<FieldType>
                  label={
                    <span className="form_label__title">Yashash manzili</span>
                  }
                  name="address"
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
            </Col>
          </Row>
          <Row style={{ gap: "25px" }}>
            <Form.Item<FieldType>
              label={<span className="form_label__title">Gurux raqami</span>}
              name="groupId"
            >
              <Select
                style={{
                  width: "199px",
                  height: "45px",
                  background: "transparent",
                }}
              >
                {groupData?.data.map((Item) => (
                  <Select.Option key={Item.group_id} value={Item?.group_id}>
                    {Item?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item<FieldType>
              label={<span className="form_label__title">To’lov</span>}
              name="paymentType"
            >
              <Select
                style={{
                  width: "199px",
                  height: "45px",
                  background: "transparent",
                }}
              >
                <Select.Option value="CASH">NQAD</Select.Option>
                <Select.Option value="CREDIT_CARD"> KARTA</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item<FieldType>
              label={<span className="form_label__title">To’lov summa</span>}
              name="sum"
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
              label={<span className="form_label__title">Tel raqami</span>}
              name="phone_number"
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

export default StudentCreate;
