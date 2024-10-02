// src/components/structure/AnamneseDrawerForm.tsx
import React from "react";
import { Drawer, Form, Input, Select, Space, Button } from "antd";
import { Anamnese } from "@/utils/interfaces/AnamneseInteraface";

interface AnamneseDrawerFormProps {
  title: string;
  visible: boolean;
  onClose: () => void;
  initialValues?: Anamnese; // Recebendo valores iniciais
  onSubmit: (values: Anamnese) => void;
}

const AnamneseDrawerForm: React.FC<AnamneseDrawerFormProps> = ({
  title,
  visible,
  onClose,
  initialValues,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues); 
    }
  }, [initialValues, form]);

  const handleFinish = (values: Anamnese) => {
    onSubmit(values); 
  };

  return (
    <Drawer
      title={title}
      visible={visible}
      onClose={onClose}
      footer={
        <Space>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="primary" onClick={() => form.submit()}>
            Salvar
          </Button>
        </Space>
      }
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item name="anm_nome" label="Nome" rules={[{ required: true }]}>
          <Input placeholder="Digite o nome do paciente" />
        </Form.Item>
        <Form.Item name="anm_idade" label="Idade" rules={[{ required: true }]}>
          <Input type="number" placeholder="Digite a idade do paciente" />
        </Form.Item>
        <Form.Item name="anm_sexo" label="Sexo" rules={[{ required: true }]}>
          <Select placeholder="Selecione o sexo">
            <Select.Option value="M">Masculino</Select.Option>
            <Select.Option value="F">Feminino</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="anm_estado_saude" label="Estado de Saúde">
          <Input placeholder="Digite o estado de saúde do paciente" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AnamneseDrawerForm;
