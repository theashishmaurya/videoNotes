import React, { ReactNode, useEffect, useRef, useState } from "react";
import { LaptopOutlined, UserOutlined } from "@ant-design/icons";
import { Input, InputRef, MenuProps, Modal } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";

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

  useEffect(() => {
    //Check local Storage

    let key = localStorage.getItem("OpenAPIKey");
    if (key === null) {
      setOpen(true);
    }
  }, []);

  // use Location hook to get the current path and set the selected key accordingly
  const router = useRouter();

  const { pathname } = router;

  const handleOk = () => {
    localStorage.setItem("OpenAPIKey", ApiKey);
    setApiKey("");
    setOpen(false);
  };

  return (
    <Layout>
      <Modal title="Your OpenAI API key here" open={open} onOk={handleOk}>
        <Input
          placeholder="Your API Key Here"
          onChange={(e) => {
            setApiKey(e.target.value);
          }}
        />
        <Link href="https://platform.openai.com/docs/developer-quickstart/your-api-keys">
          Here is how to get your API key?
        </Link>
      </Modal>
      <Header className="header">
        <div className="logo" />
        {/* <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
        /> */}
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{ background: colorBgContainer, height: "90vh" }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
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
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Authenticatedlayout;
