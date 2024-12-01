import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Divider,
  message,
} from "antd";
import axios from "axios"; // Importando o Axios
import { hostBackEnd } from "../../config/env/config.dev.json";
import dayJs from 'dayjs'

interface Field {
  name: string;
  type: string;
  rules?: any;
  placeholder: string;
  options?: { value: string; label: string }[];
  span?: number;
  value?: any; // Adicionando o valor padrão ao campo
}

interface Section {
  section: string;
  fields: Field[];
}

interface DrawerFormProps {
  title: string;
  sections: Section[];
  method: "GET" | "POST" | "PUT" | "DELETE";
  route: string;
  id?: string; // ID opcional para operações GET, PUT, DELETE
  onSubmit: (values: any) => void;
  onDelete?: (id: string) => void; // Função opcional para deletar
  onClose: () => void;
  initialValues?: Record<string, any>; // Adicionando valores iniciais
}

const DrawerForm: React.FC<DrawerFormProps> = ({
  title,
  sections,
  method,
  route,
  id,
  onSubmit,
  onDelete,
  onClose,
  initialValues, // Recebendo valores iniciais
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fullRoute = `${hostBackEnd}${route}`;

  const showDrawer = () => {
    setOpen(true);

    // Se a operação for GET, buscar dados
    if (method === "GET" && id) {
      fetchData();
    } else if (initialValues) {
      // Se houver valores iniciais, setar no formulário
      form.setFieldsValue(initialValues);
    }
  };

  // Função para buscar os dados com GET usando Axios
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${fullRoute}/${id}`);
      form.setFieldsValue(response.data); // Popula o formulário com os dados obtidos
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Erro ao buscar os dados.");
    }
  };

  // Função para enviar os dados no submit (POST/PUT) usando Axios
  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const url = `${fullRoute}${id ? `/${id}` : ""}`;
      const axiosMethod = method === "POST" ? axios.post : axios.put;

      const response = await axiosMethod(url, values, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Erro no envio");
      }

      message.success("Operação realizada com sucesso!");
      setOpen(false);
      onSubmit(values);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Ocorreu um erro");
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para deletar o item usando Axios
  const handleDelete = async () => {
    if (onDelete && id) {
      try {
        setLoading(true);
        const response = await axios.delete(`${fullRoute}/${id}`);

        if (response.status !== 200 && response.status !== 204) {
          throw new Error("Erro ao deletar");
        }

        message.success("Item deletado com sucesso!");
        setOpen(false);
        onDelete(id);
      } catch (error) {
        message.error("Erro ao deletar.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        {method === "POST"
          ? "Adicionar"
          : method === "GET"
          ? "Editar"
          : "Deletar"}
      </Button>
      <Drawer
        title={title}
        width={720}
        onClose={() => {
          onClose();
          setOpen(false);
        }}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <Space style={{ display: "flex", justifyContent: "end" }}>
            {method === "GET" && onDelete && (
              <Button danger onClick={handleDelete} loading={loading}>
                Deletar
              </Button>
            )}
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            {method !== "DELETE" && (
              <Button
                form="drawer-form"
                htmlType="submit"
                type="primary"
                loading={loading}
              >
                Submit
              </Button>
            )}
          </Space>
        }
      >
        <Form
          layout="vertical"
          id="drawer-form"
          form={form}
          onFinish={handleSubmit}
          hideRequiredMark
        >
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <Divider orientation="left" className="custom-divider">
                {section.section}
              </Divider>
              <Row gutter={16}>
                {section.fields.map((field, fieldIndex) => (
                  <Col span={field.span || 12} key={fieldIndex}>
                    <Form.Item
                      name={field.name}
                      label={field.placeholder}
                      rules={field.rules}
                    >
                      {renderField(field)}
                    </Form.Item>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Form>
      </Drawer>
    </>
  );
};

// Função para renderizar dinamicamente o campo com base no tipo
const renderField = (field: Field) => {
  switch (field.type) {
    case "text":
      return <Input placeholder={field.placeholder} defaultValue={field.value} />; // Usando o valor predefinido
    case "textarea":
      return <Input.TextArea rows={4} placeholder={field.placeholder} defaultValue={field.value} />;
    case "select":
      return (
        <Select placeholder={field.placeholder} defaultValue={field.value}>
          {field.options?.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      );
    case "date":
      return <DatePicker style={{ width: "100%" }} defaultValue={field.value} />;
    case "date_nasc":
      return <DatePicker style={{ width: "100%" }} disabledDate={(current) => current && current.isAfter(dayJs())} defaultValue={field.value} />;
    case "daterange":
      return <DatePicker.RangePicker style={{ width: "100%" }} defaultValue={field.value} />;
    default:
      return null;
  }
};

export default DrawerForm;
