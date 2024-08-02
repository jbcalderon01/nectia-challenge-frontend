import { UserOutlined, ProductOutlined } from "@ant-design/icons";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { BuildMenuItemsProps } from "./Layout.types";

export const buildMenuitems = ({
  onClick,
}: BuildMenuItemsProps): ItemType<MenuItemType>[] => [
  {
    label: "Usuarios",
    key: "users",
    icon: <UserOutlined />,
    onClick: () => onClick("/users"),
  },
  {
    label: "Productos",
    key: "products",
    icon: <ProductOutlined />,
    onClick: () => onClick("/products"),
  },
];
