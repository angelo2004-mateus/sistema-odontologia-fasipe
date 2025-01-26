import React, { useEffect } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Divider,
  Space,
  message,
} from "antd";
import axios from "axios";
import { hostBackEnd } from "../../config/env/config.dev.json";
import moment from "moment";
import dayJs from "dayjs";
import { patientSectionsFormDrawer } from "../../utils/variables/PatientVariables";

interface EditPatientDrawerProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (updatedPatient: Patient) => void;
  patientData: Patient;
}

const EditPatientDrawer: React.FC<EditPatientDrawerProps> = ({
  visible,
  onClose,
  onUpdate,
  patientData,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    // Popula o formulário com os dados do paciente ao abrir o Drawer
    if (patientData) {
      console.log(patientData);
      form.setFieldsValue({
        ...patientData,
      });
    }
  }, [patientData, form]);

  const handleFinish = async (values: any) => {
    try {
      const formattedData = {
        ...values,
        data_nasc_pac: values.data_nasc_pac
          ? moment(values.data_nasc_pac).format("YYYY-MM-DD")
          : null,
      };

      const response = await axios.put(
        `${hostBackEnd}/paciente/atualizar/${patientData.cod_pac}`,
        formattedData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        message.success("Paciente atualizado com sucesso!");
        onUpdate(formattedData);
        onClose();
        location.reload();
      } else {
        throw new Error("Erro ao atualizar o paciente.");
      }
    } catch (error) {
      console.error(error);
      message.error("Erro ao atualizar o paciente.");
    }
  };

  console.log(
    "Moment da data_nasc_pac:",
    moment(patientData.data_nasc_pac).format("YYYY-MM-DD")
  );

  const formSubmit = () => {
    form.submit();
  };

  return (
    <Drawer
      title="Editar Paciente"
      width={720}
      visible={visible}
      onClose={onClose}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <Space style={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="primary" onClick={() => formSubmit()}>
            Salvar
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={patientData}
      >
        {patientSectionsFormDrawer.map((section) => (
          <React.Fragment key={section.section}>
            <Divider orientation="left">{section.section}</Divider>
            <Row gutter={16}>
              {section.fields.map((field) => (
                <Col span={12} key={field.name}>
                  <Form.Item
                    name={field.name}
                    label={field.placeholder}
                    rules={[
                      ...(field.name === "cod_pac" || field.name === "cep_pac"
                        ? [] // Não validamos `cod_pac` ou `cep_pac` se eles não forem alterados
                        : field.rules || []),
                    ]}
                  >
                    {field.type === "date_nasc" ? (
                      <DatePicker
                        style={{ width: "100%" }}
                        disabledDate={(current) =>
                          current && current.isAfter(dayJs())
                        }
                      />
                    ) : (
                      <Input
                        readOnly={
                          field.name === "cod_pac" || field.name === "cpf_pac"
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </React.Fragment>
        ))}
      </Form>
    </Drawer>
  );
};

export default EditPatientDrawer;
