import React, { useState } from "react";
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
  const [page, setPage] = useState(1); // Controla a página do formulário

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  // Função chamada ao submeter a primeira ou segunda página
  const handleFinish = (values: Anamnese) => {
    if (page === 1) {
      setPage(2); // Avança para a segunda página
    } else {
      onSubmit(values); // Envia os dados ao finalizar a segunda página
    }
  };

  return (
    <>
      <Drawer
        title={title}
        visible={visible}
        onClose={onClose}
        width={`100%`}
        footer={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
            {page === 1 ? (
              <Button type="primary" onClick={() => form.submit()}>
                Próximo
              </Button>
            ) : (
              <Button type="primary" onClick={() => form.submit()}>
                Finalizar
              </Button>
            )}
          </Space>
        }
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          {page === 1 && (
            <>
              <Form.Item
                name="anm_nome"
                label="Nome"
                rules={[{ required: true, message: 'Por favor, insira o nome' }]}
              >
                <Input placeholder="Digite o nome do paciente" />
              </Form.Item>
              <Form.Item
                name="anm_idade"
                label="Idade"
                rules={[{ required: true, message: 'Por favor, insira a idade' }]}
              >
                <Input type="number" placeholder="Digite a idade do paciente" />
              </Form.Item>
              <Form.Item
                name="anm_sexo"
                label="Sexo"
                rules={[{ required: true, message: 'Por favor, selecione o sexo' }]}
              >
                <Select placeholder="Selecione o sexo">
                  <Select.Option value="M">Masculino</Select.Option>
                  <Select.Option value="F">Feminino</Select.Option>
                </Select>
              </Form.Item>
            </>
          )}

          {page === 2 && (
            <>
              <Form.Item
                name="anm_estado_saude"
                label="Estado de Saúde"
                rules={[{ required: true, message: 'Por favor, insira o estado de saúde' }]}
              >
                <Input placeholder="Digite o estado de saúde do paciente" />
              </Form.Item>
              <Form.Item
                name="anm_historia_clinica"
                label="História Clínica"
                rules={[{ required: true, message: 'Por favor, insira a história clínica' }]}
              >
                <Input.TextArea placeholder="Digite a história clínica do paciente" />
              </Form.Item>
            </>
          )}
        </Form>
      </Drawer>
    </>
  );
};

export default AnamneseDrawerForm;
