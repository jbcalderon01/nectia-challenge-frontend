import {
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Typography,
} from "antd";
import React, { FC, useEffect, useState } from "react";
import { ProductFormProps } from "./types";
import { useMutation } from "@tanstack/react-query";
import { ProductServices } from "@/shared/services";
import { IProduct } from "@/shared/entities";
import Image from "next/image";
import { useWatch } from "antd/es/form/Form";

const defaultImageUrl = "/image-not-found.png";

export const ProductForm: FC<ProductFormProps> = ({
  isOpen,
  dataProduct,
  onOk,
  onCancel,
}) => {
  const {
    mutate: createProduct,
    isPending: isLoadCreateProduct,
    isSuccess: isSuccessCreateProduct,
  } = useMutation({
    mutationFn: (data: Partial<IProduct>) =>
      ProductServices.createProduct(data),
  });
  const {
    mutate: updateProduct,
    isPending: isLoadUpdateProduct,
    isSuccess: isSuccessUpdateProduct,
  } = useMutation({
    mutationFn: (data: Partial<IProduct>) =>
      ProductServices.updateProduct(data._id as string, data),
  });

  const [form] = Form.useForm();
  const imageUrl = useWatch(["image_url"], form);

  const [currentImageUrl, setCurrentImageUrl] = useState("");

  const handleSubmit = () => {
    const dataValues = form.getFieldsValue();

    if (dataProduct) {
      updateProduct({
        _id: dataProduct._id,
        ...dataValues,
      });
      return;
    }

    createProduct(dataValues);
  };

  const handleCancel = () => {
    form.resetFields();
    setCurrentImageUrl(defaultImageUrl);
    onCancel();
  };

  useEffect(() => {
    if (dataProduct) {
      form.setFieldsValue(dataProduct);
    }
  }, [dataProduct]);

  useEffect(() => {
    if (isSuccessCreateProduct || isSuccessUpdateProduct) {
      onOk();
      form.resetFields();
      setCurrentImageUrl(defaultImageUrl);
    }
  }, [isSuccessCreateProduct, isSuccessUpdateProduct]);

  useEffect(() => {
    if (imageUrl) {
      setCurrentImageUrl(imageUrl);
    }
  }, [imageUrl]);

  return (
    <div>
      <Modal
        title={
          <Typography.Title level={4}>
            {dataProduct ? "Editar producto" : "Crear producto"}
          </Typography.Title>
        }
        open={isOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText="Guardar"
        cancelText="Cancelar"
        confirmLoading={isLoadCreateProduct || isLoadUpdateProduct}
        destroyOnClose
      >
        <Form layout={"vertical"} form={form}>
          <Row gutter={[16, 4]} style={{ marginTop: 24 }}>
            <Col span={24}>
              <Flex justify="center">
                <Image
                  src={currentImageUrl}
                  onError={() => setCurrentImageUrl(defaultImageUrl)}
                  alt="logo"
                  width={150}
                  height={150}
                />
              </Flex>
            </Col>
            <Col span={24}>
              <Form.Item
                label="URL de image"
                name="image_url"
                rules={[{ required: true, message: "Campo requerido" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Nombre"
                name="name"
                rules={[{ required: true, message: "Campo requerido" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="SKU"
                name="sku"
                rules={[{ required: true, message: "Campo requerido" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Descripción"
                name="description"
                rules={[{ required: true, message: "Campo requerido" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Cantidad"
                name="quantity"
                rules={[
                  {
                    required: true,
                    type: "number",
                    message: "Campo requerido",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Precio"
                name="price"
                rules={[
                  {
                    required: true,
                    type: "number",
                    message: "Campo requerido",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};
