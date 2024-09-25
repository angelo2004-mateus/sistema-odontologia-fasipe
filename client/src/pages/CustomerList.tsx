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
import DrawerFormEdit from "@/components/structure/DrawerFormEdit";

const CustomerList = () => {
  const [patients, setPatients] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editPatient, setEditPatient] = useState<Paciente | null>(null); 

  useEffect(() => {
    const loadPatients = async () => {
      const {
        data,
        loading: loadingState,
        error: errorMsg,
      } = await fetchData<Paciente[]>("/paciente/todos_pacientes");

      setLoading(loadingState);
      if (data) {
        setPatients(data);
      }
      setError(errorMsg);
    };

    loadPatients();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleEdit = (record: Paciente) => {
    setEditPatient(record); 
  };

  const actions = [
    <DrawerForm
      title="Cadastrar Paciente"
      sections={patientSectionsFormDrawer}
      method="POST"
      route="/paciente/cadastrar"
      onSubmit={() => console.log("opa")}
      onClose={() => console.log("Drawer closed")}
      initialValues={{ cod_pac: "" }}
    />,
  ];

  return (
    <>
      {editPatient && (
        <DrawerFormEdit
          title="Editar Paciente"
          sections={patientSectionsFormDrawer}
          method="PUT"
          route={`/paciente/atualizar/${editPatient.cod_pac}`} 
          onSubmit={() => {
            console.log("Submetendo alterações do paciente", editPatient);
            setEditPatient(null);
          }}
          onClose={() => setEditPatient(null)}
          initialValues={editPatient} 
        />
      )}

      <Crud
        title="Pacientes"
        fields={patientFieldInputTable}
        columns={patientColumnsTable}
        data={patients}
        actions={actions}
        actionsAllowed={["edit", "delete"]}
        onEdit={handleEdit}
        onDelete={(record) => console.log(record)}
      />
    </>
  );
};

export default CustomerList;
