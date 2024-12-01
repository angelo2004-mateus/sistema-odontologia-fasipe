// src/pages/AnamneseList.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Crud from "@/components/structure/Crud";
import { Anamnese } from "@/utils/interfaces/AnamneseInteraface";
import { fetchData } from "@/utils/api/fetchData";
import {
  anamneseColumnsTable,
  anamneseFieldInputTable,
} from "@/utils/variables/AnamneseVariables";
import AnamneseDrawerForm from "@/components/structure/AnamneseDrawerForm";

const AnamneseList = () => {
  const [anamnese, setAnamnese] = useState<Anamnese[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editAnamnese, setEditAnamnese] = useState<Anamnese | null>(null);
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadAnamnese = async () => {
      const { data, loading: loadingState, error: errorMsg } = await fetchData<Anamnese[]>("/anamnese/listar");
      setLoading(loadingState);
      if (data) {
        setAnamnese(data);
      }
      setError(errorMsg);
    };

    loadAnamnese();
  }, []);

  const handleEdit = (record: Anamnese) => {
    setEditAnamnese(record);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    setEditAnamnese(null);
  };

  const handleSubmit = async (values: Anamnese) => {
    console.log("Submetendo alterações da anamnese", values);
    handleClose();
  };

  const handleNavigateToCadastroAnamnese = () => {
    navigate("/paciente/cadastroAnamnese");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {/* Botão para navegar para a página de cadastro de anamnese */}
      <button 
        onClick={handleNavigateToCadastroAnamnese} 
        style={{ backgroundColor: "green", color: "white", padding: "10px", marginBottom: "20px" }}
      >
        Cadastrar Anamnese
      </button>

      {visible && (
        <AnamneseDrawerForm
          title={editAnamnese ? "Editar Anamnese" : "Cadastrar Anamnese"}
          visible={visible} 
          onClose={handleClose}
          initialValues={editAnamnese || undefined} 
          visible={visible}
          onClose={handleClose}
          initialValues={editAnamnese || undefined}
          onSubmit={handleSubmit}
        />
      )}

      <Crud
        title="Anamneses"
        fields={anamneseFieldInputTable}
        columns={anamneseColumnsTable}
        data={anamnese}
        actionsAllowed={["edit"]}
        onEdit={handleEdit}
      />
    </>
  );
};

export default AnamneseList;
