import { useNoteBookData } from "@/context/noteBookContext";
import { Space } from "antd";

const HistoryPanel = () => {
  const { notebookData, setCurrentNoteData } = useNoteBookData();

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      {notebookData.map((data, index) => {
        return (
          <div
            onClick={() => {
              console.log("Clicked");
              setCurrentNoteData(data);
            }}
            key={data.id || index}
            style={{
              width: "100%",
              height: "100%",
              padding: "1rem",
              margin: "1px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            {data.title || "Untitled"}
          </div>
        );
      })}
    </Space>
  );
};

export default HistoryPanel;
