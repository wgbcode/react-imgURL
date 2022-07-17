import { Spin } from "antd";

const Loading = () => {
  return (
    <div
      style={{
        flexGrow: "1",
        transform: "translate(-50%,-50%)",
        top: "50%",
        left: "50%",
      }}
    >
      <Spin />
    </div>
  );
};

export default Loading;
