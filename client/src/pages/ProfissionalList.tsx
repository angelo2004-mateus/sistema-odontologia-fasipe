import Crud from "@/components/structure/Crud";
import { useEffect, useState } from "react";
import { Profissional } from "@/utils/interfaces/ProfissionalInterface"; 
import { fetchData } from "@/utils/api/fetchData";
import {
  professionalColumnsTable,
  professionalFieldInputTable,
  professionalSectionsFormDrawer,
} from "@/utils/variables/ProfissionalVariables";
import DrawerFormEdit from "@/components/structure/DrawerFormEdit";
import { getStatusProfissional, getTipoProfissional } from "@/utils/helpers/profissionalHelper";

const ProfissionalList = () => {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewProfissional, setViewProfissional] = useState<Profissional | null>(null); // Estado para visualizar profissional

  useEffect(() => {
    const loadProfissionais = async () => {
      const { data, loading: loadingState, error: errorMsg } = await fetchData<Profissional[]>("/profissional/todos_profissionais");
      setLoading(loadingState);
      if (data) {
        setProfissionais(data);
      }
      setError(errorMsg);
    };

    loadProfissionais();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  const handleViewDetails = (record: Profissional) => {
    setViewProfissional(record); 
  };

  const mappedProfissionais = profissionais.map((profissional) => ({
    ...profissional,
    tipo_prof: getTipoProfissional(Number(profissional.tipo_prof)),
    status_prof: getStatusProfissional(Number(profissional.status_prof)),
  }));
  
  return (
    <>
      {viewProfissional && (
        <DrawerFormEdit
          title="Detalhes do Profissional"
          sections={professionalSectionsFormDrawer}
          onClose={() => setViewProfissional(null)}
          initialValues={viewProfissional} 
          actionsAllowed={["viewDetails"]} 
        />
      )}

      <Crud
        title="Profissionais"
        fields={professionalFieldInputTable}
        columns={professionalColumnsTable}
        data={mappedProfissionais}
        actionsAllowed={["viewDetails"]} 
        onViewDetails={handleViewDetails} 
      />
    </>
  );
};

export default ProfissionalList;
