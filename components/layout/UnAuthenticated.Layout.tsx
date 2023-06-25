import React, { ReactNode } from "react";
import { Layout, Menu, Typography, theme } from "antd";
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
          width: "100%",
        }}
      >
        <div className="logo">
          {/*  eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://img.logoipsum.com/245.svg" alt="logo" />
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
          // defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              label: (
                <Link href="/">
                  <Typography.Text>Home</Typography.Text>
                </Link>
              ),
            },
            {
              key: "2",
              label: (
                <Link href="#features">
                  <Typography.Text>Features</Typography.Text>
                </Link>
              ),
            },
            {
              key: "3",
              label: (
                <Link href="https://twitter.com/theysaymaurya">
                  <Typography.Text>Contact Us</Typography.Text>
                </Link>
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
