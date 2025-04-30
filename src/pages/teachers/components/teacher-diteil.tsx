import { Row } from "antd";
import Title from "antd/es/typography/Title";

const TeacherDiteil = () => {

  return (
    <>
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
          O’qituvchi haqida
        </Title>
      </Row>
    </>
  );
};

export default TeacherDiteil;
