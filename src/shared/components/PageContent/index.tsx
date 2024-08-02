import React, { FC } from "react";
import { TPageContentProps } from "./types";
import { theme } from "antd";

export const PageContent: FC<TPageContentProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      style={{
        backgroundColor: colorBgContainer,
        padding: "24px",
        borderRadius: borderRadiusLG,
      }}
    >
      {children}
    </div>
  );
};
