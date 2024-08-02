"use client";
import { PageContent, PageTitle } from "@/shared/components";
import { IUser } from "@/shared/entities";
import { UserServices } from "@/shared/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Flex, Popconfirm, Space, Table, TableProps } from "antd";
import React, { useEffect, useState } from "react";
import { UserForm } from "./components";

const buildColumns: (props: {
  onClickDelete: (data: IUser) => void;
  onClickUpdate: (data: IUser) => void;
}) => TableProps<IUser>["columns"] = ({ onClickDelete, onClickUpdate }) => [
  {
    title: "Nombre",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Apellido",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Nombre de usuario",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Fecha de nacimiento",
    dataIndex: "date_of_birth",
    key: "date_of_birth",
  },
  {
    title: "Fecha de creación",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "Ultima actualización",
    dataIndex: "updated_at",
    key: "updated_at",
  },
  {
    title: "Acciones",
    key: "actions",
    render: (text, record) => (
      <Space size="middle">
        <Button type="primary" onClick={() => onClickUpdate(record)}>
          <EditOutlined />
        </Button>

        <Popconfirm
          title="Eliminar usuario"
          description="¿Estas seguro de eliminar este usuario?"
          okText="Confirmar"
          cancelText="Cancelar"
          onConfirm={() => onClickDelete(record)}
        >
          <Button danger>
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];

export const UsersComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [isOpenUserForm, setIsOpenUserForm] = useState(false);
  const [userSelected, setUserSelected] = useState<IUser | null>(null);

  const {
    isPending,
    error,
    data: response,
    isFetching,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () =>
      UserServices.getUsers({
        pagination: { page: currentPage - 1, per_page: perPage },
      }),
  });

  const { mutate: deleteUser, isSuccess: isSuccessDeleteUser } = useMutation({
    mutationFn: (userId: string) => UserServices.deleteUser(userId),
  });

  const handleOnClickUpdate = (data: IUser) => {
    setUserSelected(data);
    setIsOpenUserForm(true);
  };

  const handleOnClickDelete = (data: IUser) => {
    deleteUser(data._id);
  };

  const columns = buildColumns({
    onClickDelete: handleOnClickDelete,
    onClickUpdate: handleOnClickUpdate,
  });

  const onPaginationChange = (page: number, perPage: number) => {
    setCurrentPage(page);
    setPerPage(perPage);
  };

  const onCloseUserForm = () => {
    setIsOpenUserForm(false);
    setUserSelected(null);
  };

  const onOkUserForm = () => {
    refetchUsers();
    onCloseUserForm();
  };

  useEffect(() => {
    refetchUsers();
  }, [currentPage, perPage, refetchUsers]);

  useEffect(() => {
    if (isSuccessDeleteUser) {
      refetchUsers();
    }
  }, [isSuccessDeleteUser]);

  return (
    <div>
      <PageTitle title="Panel de usuarios" />
      <PageContent>
        <Flex gap="middle" wrap style={{ margin: "1rem 0" }}>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setIsOpenUserForm(true)}
          >
            Crear usuario
          </Button>
        </Flex>

        <Table
          scroll={{ x: 1300 }}
          loading={isPending}
          columns={columns}
          dataSource={response?.data}
          pagination={{
            current: currentPage,
            total: response?.total_count,
            pageSize: perPage,
            onChange: onPaginationChange,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20"],
          }}
        />

        <UserForm
          dataUser={userSelected}
          isOpen={isOpenUserForm}
          onOk={onOkUserForm}
          onCancel={onCloseUserForm}
        />
      </PageContent>
    </div>
  );
};
