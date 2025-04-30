import { Button, Row, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";

export interface ICourseCard {
  id: number;
  name: string;
  status: string;
  duration: string;
  indexItem: number;
  courseId?: string;
}

export const CourseCard = ({
  id,
  name,
  status,
  duration,
  courseId,
  indexItem,
}: ICourseCard) => {
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
      <Row style={{ alignItems: "center", gap: "110px" }}>
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
          <Title
            level={2}
            style={{
              fontWeight: 400,
              fontSize: "16px",
              color: "var(--matn-rang-1)",
              fontFamily: "var(--font-family)",
              margin: 0,
              width: "250px",
              overflow: "hidden",
            }}
          >
            {name}
          </Title>{" "}
        </Row>
        <Row style={{ alignItems: "center", gap: "224px" }}>
          <Title
            level={2}
            style={{
              fontWeight: 400,
              fontSize: "16px",
              textAlign: "center",
              width: "100px",
              color: "var(--matn-rang-1)",
              fontFamily: "var(--font-family)",
              margin: 0,
            }}
          >
            {duration} kun
          </Title>
          <Row style={{ alignItems: "center", gap: "244px" }}>
            <Row style={{ width: "78px", justifyContent: "center" }}>
              <Tag color={status === "ACTIVE" ? "green" : "red"}>
                {status === "ACTIVE" ? "ACTIVE" : "INACTIVE"}
              </Tag>
            </Row>

            <Button
              onClick={() => navigate(`/course/${courseId}`)}
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
    </Row>
  );
};
