"use client";
import React, { useMemo } from "react";

import { Layout, Menu, theme } from "antd";
import { buildMenuitems } from "./MenuItems";
import styles from "./Layout.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const { Content, Footer, Sider } = Layout;

export const LayoutMain = ({ children }: React.PropsWithChildren) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();

  const onClickNavItem = (path: string) => {
    router.push(path);
  };

  const menuItems = useMemo(
    () =>
      buildMenuitems({
        onClick: onClickNavItem,
      }),
    []
  );

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className={styles.logo_container}>
          <Image src="./logo.svg" alt="logo" width={100} height={100} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: "8px 24px",
              minHeight: 360,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Creado por Johnny Bernal
        </Footer>
      </Layout>
    </Layout>
  );
};
