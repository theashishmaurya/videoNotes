import { useNoteBookData } from "@/context/noteBookContext";
import { Menu, Space } from "antd";

interface HistoryPanelProps {
  handleClose: () => void;
}

const HistoryPanel = (props: HistoryPanelProps) => {
  const { notebookData, setCurrentNoteData } = useNoteBookData();
  const { handleClose } = props;

  const items2 = notebookData.map((data, index) => {
    return {
      key: data.id || index,
      label: data.title || "Untitled",
    };
  });

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      style={{
        height: "100%",
        borderRight: 0,
      }}
      onClick={(data) => {
        setCurrentNoteData(
          notebookData.find((note) => note.id === data.key) || notebookData[0]
        );
        handleClose();
      }}
      items={items2}
    />
  );
};

export default HistoryPanel;
