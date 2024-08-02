import { Col, DatePicker, Form, Input, Modal, Row, Typography } from "antd";
import React, { FC, useEffect } from "react";
import { UserFormProps } from "./types";
import { useMutation } from "@tanstack/react-query";
import { UserServices } from "@/shared/services";
import { IUser } from "@/shared/entities";
import moment from "moment";

export const UserForm: FC<UserFormProps> = ({
  isOpen,
  dataUser,
  onOk,
  onCancel,
}) => {
  const {
    mutate: createUser,
    isPending: isLoadCreateUser,
    isSuccess: isSuccessCreateUser,
  } = useMutation({
    mutationFn: (data: Partial<IUser>) => UserServices.createUser(data),
  });
  const {
    mutate: updateUser,
    isPending: isLoadUpdateUser,
    isSuccess: isSuccessUpdateUser,
  } = useMutation({
    mutationFn: (data: Partial<IUser>) =>
      UserServices.updateUser(data._id as string, data),
  });

  const [form] = Form.useForm();

  const handleSubmit = () => {
    const dataValues = form.getFieldsValue();

    if (dataUser) {
      updateUser({
        ...dataValues,
        _id: dataUser._id,
        date_of_birth: dataValues.date_of_birth.format("YYYY-MM-DD"),
      });
      return;
    }

    createUser({
      ...dataValues,
      date_of_birth: dataValues.date_of_birth.format("YYYY-MM-DD"),
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    if (isSuccessCreateUser || isSuccessUpdateUser) {
      onOk();
      form.resetFields();
    }
  }, [isSuccessCreateUser, isSuccessUpdateUser]);

  useEffect(() => {
    if (dataUser) {
      form.setFieldsValue({
        ...dataUser,
        date_of_birth: moment(dataUser.date_of_birth),
      });
    }
  }, [dataUser]);

  return (
    <div>
      <Modal
        title={
          <Typography.Title level={4}>
            {dataUser ? "Editar usuario" : "Crear usuario"}
          </Typography.Title>
        }
        open={isOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText="Guardar"
        cancelText="Cancelar"
        confirmLoading={isLoadCreateUser || isLoadUpdateUser}
        destroyOnClose
      >
        <Form layout={"vertical"} form={form}>
          <Row gutter={[16, 4]} style={{ marginTop: 24 }}>
            <Col span={12}>
              <Form.Item
                label="Usuario"
                name="username"
                rules={[{ required: true, message: "Campo requerido" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Nombre"
                name="first_name"
                rules={[{ required: true, message: "Campo requerido" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Apellido"
                name="last_name"
                rules={[{ required: true, message: "Campo requerido" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Campo requerido",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Fecha de nacimiento"
                name="date_of_birth"
                rules={[
                  {
                    required: true,
                    type: "date",
                    message: "Campo requerido",
                  },
                ]}
              >
                <DatePicker
                  format={{ format: "YYYY-MM-DD" }}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};
