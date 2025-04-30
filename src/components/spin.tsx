import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 40, 
      color: "var(--breand-rang-2)", 
    }}
    spin
  />
);

const LoadingSpinner = () => {
  return <Spin indicator={antIcon} />;
};

export default LoadingSpinner;
