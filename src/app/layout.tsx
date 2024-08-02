"use client";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { LayoutMain } from "@/shared/components";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { message } from "antd";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError(error, variables, context) {
        message.destroy("loading");
        message.error("Se ha producido un error");
      },
      onMutate(variables) {
        message.open({
          content: "Procesando...",
          key: "loading",
          type: "loading",
        });
      },
      onSuccess(data, variables, context) {
        message.destroy("loading");
        message.success("Operación exitosa");
      },
    },
  },
});

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en">
      <title>Nectia Challenge</title>
      <body>
        <AntdRegistry>
          <QueryClientProvider client={queryClient}>
            <LayoutMain>{children}</LayoutMain>
          </QueryClientProvider>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
