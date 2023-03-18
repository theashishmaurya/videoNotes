import React, { useState } from "react";
import { Button, Drawer, theme } from "antd";
import { MenuOutlined } from "@ant-design/icons";

interface SideDrawerProps {
  children: React.ReactNode;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
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
  };

  return (
    <div ref={ref} style={containerStyle} className="my-div">
      <Button type="primary" onClick={showDrawer} icon={<MenuOutlined />}>
        {/* Open */}
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="left"
        onClose={onClose}
        closable={false}
        open={open}
        getContainer={false}
      >
        {children}
      </Drawer>
    </div>
  );
};

export default SideDrawer;
