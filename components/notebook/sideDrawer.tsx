import React, { useState } from "react";
import { Button, Drawer, theme } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import HistoryPanel from "../shared/historyPanel";

interface SideDrawerProps {
  children: React.ReactNode;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ children }) => {
  const [open, setOpen] = useState(true);
  const { token } = theme.useToken();
  const ref = React.useRef<HTMLDivElement>(null);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const containerStyle: React.CSSProperties = {
    position: "relative",
    height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div ref={ref} style={containerStyle} className="my-div">
      <Button type="primary" onClick={showDrawer} icon={<MenuOutlined />}>
        {/* Open */}
      </Button>
      <Drawer
        title="File Explorer"
        placement="left"
        onClose={onClose}
        closable={false}
        open={open}
        getContainer={false}
        width={250}
      >
        <HistoryPanel handleClose={onClose} />
      </Drawer>
      <div
        style={{
          height: "100%",
          overflow: "auto",
          margin: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default SideDrawer;
