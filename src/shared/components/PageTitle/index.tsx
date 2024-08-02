import { Typography } from "antd";
import React, { FC } from "react";
import { TPageTitleProps } from "./types";

export const PageTitle: FC<TPageTitleProps> = ({ title }) => {
  return (
    <div>
      <Typography.Title level={2}>{title}</Typography.Title>
    </div>
  );
};
