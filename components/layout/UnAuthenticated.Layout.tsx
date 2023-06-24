import React, { ReactNode } from "react";
import { Layout, Menu, theme } from "antd";
import SingInWithGoogle from "../singin/signInwithFirebase";
import Link from "next/link";
import SingInWithPassage from "../singin/signInwithPassage";

const { Header, Content, Footer } = Layout;

type UnAuthenticatedlayoutProps = {
  children: ReactNode;
};

const UnAuthenticatedLayout: React.FC<UnAuthenticatedlayoutProps> = ({
  children,
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "white",
        }}
      >
        <div className="logo">
          {/*  eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://img.logoipsum.com/245.svg" alt="logo" />
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={[
            { key: "1", label: <Link href="/">Home</Link> },
            { key: "2", label: <Link href="#features">Features</Link> },
            {
              key: "3",
              label: (
                <Link href="https://twitter.com/theysaymaurya">Contact Us</Link>
              ),
            }, // Label can be a ReactNode as well <Link to="/about">About</Link>
          ]}
        />
        <SingInWithPassage title={"Get Started"} icon={false} type="primary" />
      </Header>
      <Content style={{ padding: "0px" }}>
        <div style={{ background: colorBgContainer, padding: "20px" }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default UnAuthenticatedLayout;
