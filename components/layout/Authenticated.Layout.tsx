import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  CommentOutlined,
  LaptopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FloatButton, Input, InputRef, MenuProps, Modal } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import style from "./authenticated.module.css";

const { Header, Content, Sider } = Layout;

// Incase I need to use the menu component
const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  {
    key: "createnote",
    label: "Create Note",
    icon: <UserOutlined />,
  },
  {
    key: "notebook",
    label: "Notebook",
    icon: <LaptopOutlined />,
  },
];
type AuthenticatedlayoutProps = {
  children: ReactNode;
};

const Authenticatedlayout: React.FC<AuthenticatedlayoutProps> = ({
  children,
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [open, setOpen] = useState(false);
  const [ApiKey, setApiKey] = useState("");
  // use Location hook to get the current path and set the selected key accordingly
  const router = useRouter();

  const { pathname } = router;


  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{ background: colorBgContainer, height: "90vh" }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{
              height: "100%",
              borderRight: 0,
              background: colorBgContainer,
            }}
            //on Select change the color of the selected item

            onClick={({ key }) => router.push(`/${key}`)}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>App</Breadcrumb.Item>
            <Breadcrumb.Item>{pathname.replace("/", "")}</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: "2rem",
              margin: "0 2rem",
              minHeight: 280,

              background: colorBgContainer,
            }}
          >
            {children}
            <FloatButton
              type="primary"
              onClick={() => router.push("https://twitter.com/theysaymaurya")}
              icon={<CommentOutlined />}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Authenticatedlayout;
