import Crud from "@/components/structure/Crud";
import { useEffect, useState } from "react";
import { Paciente } from "@/utils/interfaces/PacienteInterface";
import { fetchData } from "@/utils/api/fetchData";
import DrawerForm from "@/components/structure/DrawerForm";
import {
  patientColumnsTable,
  patientFieldInputTable,
  patientSectionsFormDrawer,
} from "@/utils/variables/PatientVariables";
import axios from "axios";
import { hostBackEnd } from "../config/env/config.dev.json";
import { notification, Modal, Input } from "antd";
import moment from "moment";
import EditPatientDrawer from "@/components/customer/EditPatientDrawer";
import DrawerFormEdit from "@/components/structure/DrawerFormEdit";
import { checkUserRole } from "@/utils/checkUserRole";

const CustomerList = () => {
  const [patients, setPatients] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editPatient, setEditPatient] = useState<Paciente | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // Controla a visibilidade do modal
  const [deleteReason, setDeleteReason] = useState(""); // Armazena o motivo da exclusão
  const [patientToDelete, setPatientToDelete] = useState<Paciente | null>(null); // Armazena o paciente a ser deletado
  const [patientDetails, setPatientDetails] = useState<Paciente | null>(null);
  const [actionsAllowed, setActionsAllowed] = useState(["edit", "delete"]);

  // Função para formatar a data de nascimento
  const formatPatientDates = (data) => {
    return data.map((paciente) => {
      if (paciente.data_nasc_pac) {
        const dataNascimento = new Date(paciente.data_nasc_pac);
        const dia = String(dataNascimento.getDate()).padStart(2, "0");
        const mes = String(dataNascimento.getMonth() + 1).padStart(2, "0"); // Mes começa do 0
        const ano = dataNascimento.getFullYear();
        paciente.data_nasc_pac = `${dia}/${mes}/${ano}`; // Formato dd/mm/yyyy
      }
      return paciente;
    });
  };

  // Função para carregar todos os pacientes
  const loadPatients = async () => {
    const {
      data,
      loading: loadingState,
      error: errorMsg,
    } = await fetchData<Paciente[]>("/paciente/todos_pacientes");

    setLoading(loadingState);
    if (data) {
      // Formatar a data de nascimento de cada paciente para o formato dd/mm/yyyy
      const formattedData = formatPatientDates(data);
      setPatients(formattedData);
      if(checkUserRole([1, 4])) setActionsAllowed(["edit", "delete"]);
      if(checkUserRole([2, 3])) setActionsAllowed(["edit"]);
      
    }
    setError(errorMsg);
  };

  // Função para carregar pacientes deletados
  const loadPatientsDeleted = async () => {
    const {
      data,
      loading: loadingState,
      error: errorMsg,
    } = await fetchData<Paciente[]>("/paciente/todos_pacientes_deletados");

    setLoading(loadingState);
    if (data) {
      // Formatar a data de nascimento de cada paciente para o formato dd/mm/yyyy
      const formattedData = formatPatientDates(data);
      console.log(formattedData);
      setPatients(formattedData);
      setActionsAllowed(["viewDetails"]);
    }
    setError(errorMsg);
  };

  // Chamada inicial de loadPatients no useEffect
  useEffect(() => {
    loadPatients();
  }, []);

  useEffect(() => {
    loadPatients();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleEdit = (record: Paciente) => {
    setEditPatient({
      ...record,
      // Use a formatação correta ao converter a data
      data_nasc_pac: record.data_nasc_pac
        ? moment(record.data_nasc_pac, "DD/MM/YYYY") // Formato esperado
        : null, // Se não houver data, apenas defina como null
    });
  };

  const handleDelete = (record: Paciente) => {
    setPatientToDelete(record); // Armazena o paciente selecionado para exclusão
    setIsModalVisible(true); // Exibe o modal para o usuário informar o motivo
  };

  const handleViewDetails = (record: Paciente) => {
    setPatientDetails({
      ...record,
      data_nasc_pac: record.data_nasc_pac ? moment(record.data_nasc_pac) : null,
    });

    console.log(record);
  };

  const confirmDelete = async () => {
    if (!deleteReason.trim()) {
      notification.warning({
        message: "Aviso",
        description: "Por favor, forneça um motivo para a exclusão.",
      });
      return;
    }

    try {
      const response = await axios.put(
        `${hostBackEnd}/paciente/deletar/${patientToDelete?.cpf_pac}`,
        {
          deletionReason: deleteReason,
        }
      );
      notification.success({
        message: "Sucesso",
        description: response.data.message, // Mensagem retornada do backend
      });

      // Atualiza a lista de pacientes removendo o paciente deletado
      setPatients((prevPatients) =>
        prevPatients.filter(
          (patient) => patient.cpf_pac !== patientToDelete?.cpf_pac
        )
      );

      // Fecha o modal e limpa o motivo de exclusão
      setIsModalVisible(false);
      setDeleteReason("");
      setPatientToDelete(null);
    } catch (error) {
      console.error("Erro ao deletar paciente:", error);
      setError("Erro ao deletar paciente.");
      notification.error({
        message: "Erro",
        description: "Não foi possível deletar o paciente.",
      });
    }
  };

  const handleUpdatePatient = (updatedPatient: Paciente) => {
    // Atualiza a lista de pacientes com os novos dados
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.cod_pac === updatedPatient.cod_pac ? updatedPatient : patient
      )
    );
    setEditPatient(null);
  };

  console.log();
  console.log(checkUserRole([1]));

  const actions = [
    <DrawerForm
      title="Cadastrar Paciente"
      sections={patientSectionsFormDrawer}
      method="POST"
      route="/paciente/cadastrar"
      onSubmit={() => location.reload()}
      onClose={() => console.log("Drawer closed")}
      initialValues={{ cod_pac: "" }}
    />,
  ];

  return (
    <>
      {/* Drawer para editar paciente */}
      {editPatient && (
        <EditPatientDrawer
          visible={!!editPatient}
          patientData={editPatient}
          onClose={() => setEditPatient(null)}
          onUpdate={handleUpdatePatient}
        />
      )}

      {patientDetails && (
        <DrawerFormEdit
          title="Detalhes do Paciente"
          sections={patientSectionsFormDrawer}
          onClose={() => setPatientDetails(null)}
          initialValues={patientDetails}
          actionsAllowed={["viewDetails"]}
        />
      )}

      {/* Componente principal de lista */}
      <Crud
        title="Pacientes"
        fields={
          checkUserRole([1])
            ? patientFieldInputTable
            : patientFieldInputTable.filter((c, i) => i != 2)
        }
        columns={patientColumnsTable}
        data={patients}
        actions={actions}
        actionsAllowed={actionsAllowed}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewDetails={handleViewDetails}
        onFieldChange={(fieldName, value) => {
          if (fieldName === "isDeleted" && value == "true") {
            loadPatientsDeleted();
          } else if (fieldName === "isDeleted") {
            loadPatients();
          }
        }}
      />

      {/* Modal para solicitar motivo de exclusão */}
      <Modal
        title={`Motivo da Exclusão de ${patientToDelete?.nome_pac}`}
        visible={isModalVisible}
        onOk={confirmDelete}
        onCancel={() => {
          setIsModalVisible(false);
          setDeleteReason(""); // Limpa o campo ao fechar
        }}
        okText="Confirmar"
        cancelText="Cancelar"
      >
        <Input.TextArea
          rows={4}
          placeholder="Informe o motivo da exclusão"
          value={deleteReason}
          onChange={(e) => setDeleteReason(e.target.value)}
          minLength={15}
        />
      </Modal>
    </>
  );
};

export default CustomerList;
