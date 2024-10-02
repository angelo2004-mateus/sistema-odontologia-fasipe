// src/components/structure/AnamneseList.tsx
import { useEffect, useState } from "react";
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
  const [visible, setVisible] = useState(false); // Controla a visibilidade do Drawer

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
    setVisible(true); // Abre o Drawer ao editar
  };

  const handleClose = () => {
    setVisible(false);
    setEditAnamnese(null); // Reseta o estado de edição
  };

  const handleSubmit = async (values: Anamnese) => {
    console.log("Submetendo alterações da anamnese", values);
    // Aqui você pode adicionar a lógica para enviar as alterações para o servidor.
    // Exemplo: await updateAnamnese(values);
    handleClose(); // Fecha o Drawer após o submit
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {visible && (
        <AnamneseDrawerForm
          title={editAnamnese ? "Editar Anamnese" : "Cadastrar Anamnese"}
          visible={visible} // Controla a visibilidade do Drawer
          onClose={handleClose}
          initialValues={editAnamnese || undefined} // Passa o registro a ser editado ou undefined para cadastro
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
