"use client";
import { PageContent, PageTitle } from "@/shared/components";
import { IProduct } from "@/shared/entities";
import { ProductServices } from "@/shared/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Flex, Popconfirm, Space, Table, TableProps } from "antd";
import React, { useEffect, useState } from "react";
import { ProductForm } from "./components";
import Image from "next/image";

const buildColumns: (props: {
  onClickDelete: (data: IProduct) => void;
  onClickUpdate: (data: IProduct) => void;
}) => TableProps<IProduct>["columns"] = ({ onClickDelete, onClickUpdate }) => [
  {
    title: "",
    dataIndex: "image_url",
    key: "image_url",
    render: (text, record) => (
      <Image src={text} alt={record.name} width={50} height={50} />
    ),
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "SKU",
    dataIndex: "sku",
    key: "sku",
  },
  {
    title: "Descripción",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Cantidad",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Precio",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Fecha de creación",
    dataIndex: "created_at",
    key: "created_at",
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
          title="Eliminar producto"
          description="¿Estas seguro de eliminar este producto?"
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

export const ProductsComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [isOpenProductForm, setIsOpenProductForm] = useState(false);
  const [productSelected, setProductSelected] = useState<IProduct | null>(null);

  const {
    isPending,
    error,
    data: response,
    isFetching,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () =>
      ProductServices.getProducts({
        pagination: { page: currentPage - 1, per_page: perPage },
      }),
  });

  const { mutate: deleteProduct, isSuccess: isSuccessDeleteProduct } =
    useMutation({
      mutationFn: (productId: string) =>
        ProductServices.deleteProduct(productId),
    });

  const handleOnClickUpdate = (data: IProduct) => {
    setProductSelected(data);
    setIsOpenProductForm(true);
  };

  const handleOnClickDelete = (data: IProduct) => {
    deleteProduct(data._id);
  };

  const columns = buildColumns({
    onClickDelete: handleOnClickDelete,
    onClickUpdate: handleOnClickUpdate,
  });

  const onPaginationChange = (page: number, perPage: number) => {
    setCurrentPage(page);
    setPerPage(perPage);
  };

  const onCloseProductForm = () => {
    setIsOpenProductForm(false);
    setProductSelected(null);
  };

  const onOkProductForm = () => {
    refetchProducts();
    onCloseProductForm();
  };

  useEffect(() => {
    refetchProducts();
  }, [currentPage, perPage, refetchProducts]);

  useEffect(() => {
    if (isSuccessDeleteProduct) {
      refetchProducts();
    }
  }, [isSuccessDeleteProduct]);

  return (
    <div>
      <PageTitle title="Panel de productos" />
      <PageContent>
        <Flex gap="middle" wrap style={{ margin: "1rem 0" }}>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setIsOpenProductForm(true)}
          >
            Crear producto
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

        <ProductForm
          dataProduct={productSelected}
          isOpen={isOpenProductForm}
          onOk={onOkProductForm}
          onCancel={onCloseProductForm}
        />
      </PageContent>
    </div>
  );
};
