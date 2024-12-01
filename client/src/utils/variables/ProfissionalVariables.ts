// src/utils/variables/ProfessionalVariables.ts
import {
  renderTipo,
  renderStatus,
} from "@/utils/helpers/profissionalRenderHelper"; // Importa as funções de renderização

export const professionalColumnsTable = [
  { title: "Código", dataIndex: "cod_prof" },
  { title: "Nome", dataIndex: "nome_prof" },
  {
    title: "Tipo",
    dataIndex: "tipo_prof",
    render: (text: string) => renderTipo(text), // Função de renderização personalizada
  },
  {
    title: "Status",
    dataIndex: "status_prof",
    render: (text: string) => renderStatus(text), // Função de renderização personalizada
  },
];

// src/utils/variables/ProfessionalVariables.ts
export const professionalFieldInputTable = [
  {
    type: "text",
    name: "cod_prof",
    placeholder: "Código",
    rules: [{ required: true, message: "Por favor, insira o CPF/CNPJ!" }],
  },
  {
    type: "text",
    name: "nome_prof",
    placeholder: "Nome",
    rules: [{ required: true, message: "Por favor, insira o Nome!" }],
  },
  {
    type: "select", // Defina como select
    name: "status_prof",
    placeholder: "Status",
    options: [
      { label: "Todos", value: "" },
      { label: "Ativo", value: "ativo" },
      { label: "Inativo", value: "inativo" },
      { label: "Suspenso", value: "suspenso" },
    ],
  },
];

export const professionalSectionsFormDrawer = [
  {
    section: "Informações do Profissional",
    fields: [
      {
        name: "cod_prof",
        type: "text",
        placeholder: "Código",
        rules: [], // Sem regras de validação
      },
      {
        name: "nome_prof",
        type: "text",
        placeholder: "Nome Completo",
        rules: [],
      },
      {
        name: "tipo_prof",
        type: "text",
        placeholder: "Tipo de Profissional",
        rules: [],
      },
      {
        name: "status_prof",
        type: "text",
        placeholder: "Status",
        rules: [],
      },
    ],
  },
];
