import { Avatar, Row, Tag } from "antd";
import Title from "antd/es/typography/Title";

export interface IUserCard {
  id: number;
  avatar: string;
  fullname: string;
  gender: string;
}

export const TodayArrivedStudentsCard = ({
  id,
  avatar,
  fullname,
  gender,
}: IUserCard) => {
  return (
    <Row style={{ display: "flex", alignItems: "center", gap: "10px", border: "1px solid #DDDD", borderRadius: "4px" }}>
      <Row style={{ alignItems: "center", gap: "10px" }}>
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
              width: "230px",
              overflow: "hidden",
            }}
          >
            {fullname}
          </Title>{" "}
        </Row>
      </Row>
      <Tag color={gender === "male" ? "green" : "red"}>
        {gender === "male" ? "O’g’il bola" : "Qiz bola"}
      </Tag>
    </Row>
  );
};
