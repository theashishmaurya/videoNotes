import { Card, Space } from "antd";
import { useState } from "react";

const HistoryPanel = () => {
  const [history, setHistory] = useState([]);

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "1rem",
          margin: "1px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        Hey
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "1rem",
          margin: "1px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        Hey
      </div>
    </Space>
  );
};

export default HistoryPanel;
