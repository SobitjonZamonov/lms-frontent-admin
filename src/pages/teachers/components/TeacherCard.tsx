import { Avatar, Button, Row, Tag } from "antd";
import Title from "antd/es/typography/Title";
//@ts-ignore
import OkIconSvg from "../../../assets/svg/ok.icon.svg";
//@ts-ignore
import NoiconSvg from "../../../assets/svg/no.icon.svg";
//@ts-ignore
import EditIconSvg from "../../../assets/svg/edit.icon.svg";
//@ts-ignore
import DeleteIconSvg from "../../../assets/svg/delete.icon.svg";
import dayjs from "dayjs";
import { EyeOutlined } from "@ant-design/icons";
import { formatPhoneNumber } from "../../../utils/format/format.phonenumber";
import { useNavigate } from "react-router-dom";

export interface IStudentCard {
  id: number;
  avatar: string;
  fullname: string;
  birthDate: string;
  gender: string;
  phone_number: string;
  indexItem: number;
  user_id: string;
}

export const TeacherCard = ({
  id,
  avatar,
  fullname,
  birthDate,
  phone_number,
  indexItem,
  gender,
  user_id,
}: IStudentCard) => {
  const phone = formatPhoneNumber(phone_number);
  const navigate = useNavigate();
  return (
    <Row
      style={{
        boxShadow: " 2px 2px 4px 0 rgba(0, 0, 0, 0.1)",
        background: "var(--oq-rang-1)",

        borderRadius: "4px",
        padding: "15px 40px",
      }}
    >
      <Row style={{ alignItems: "center", gap: "60px" }}>
        <Row
          style={{
            alignItems: "center",
            gap: indexItem < 9 ? "50px" : "43px",
          }}
        >
          {" "}
          <Title
            level={2}
            style={{
              fontWeight: 400,
              fontSize: "16px",
              color: "var(--matn-rang-1)",
              fontFamily: "var(--font-family)",
              margin: 0,
            }}
          >
            {id}
          </Title>
          <Row style={{ gap: "10px", alignItems: "center" }}>
            <Avatar src={avatar} />
            <Title
              level={2}
              style={{
                fontWeight: 400,
                fontSize: "16px",
                color: "var(--matn-rang-1)",
                fontFamily: "var(--font-family)",
                margin: 0,
                width: "280px",
                overflow: "hidden",
              }}
            >
              {fullname}
            </Title>{" "}
          </Row>
        </Row>
        <Row style={{ alignItems: "center", gap: "130px" }}>
          <Title
            level={2}
            style={{
              fontWeight: 400,
              fontSize: "16px",
              color: "var(--matn-rang-1)",
              fontFamily: "var(--font-family)",
              margin: 0,
            }}
          >
            {dayjs(birthDate).format("DD-MM-YYYY")}
          </Title>
          <Row style={{ width: "69px" }}>
            <Tag color={gender === "MALE" ? "green" : "red"}>
              {gender === "MALE" ? "O’g’il bola" : "Qiz bola"}
            </Tag>
          </Row>
          <Title
            level={2}
            style={{
              fontWeight: 400,
              fontSize: "16px",
              color: "var(--matn-rang-1)",
              fontFamily: "var(--font-family)",
              margin: 0,
              textAlign: "center",
            }}
          >
            {phone}
          </Title>
          <Button
            onClick={() => navigate(`/teacher/${user_id}`)}
            style={{
              border: "none",
              background: "var(--breand-rang-2)",
              padding: "10px 15px",
              boxShadow: "none",
            }}
          >
            <EyeOutlined style={{ fontSize: "24px", color: "#fff" }} />
          </Button>
        </Row>
      </Row>
    </Row>
  );
};
