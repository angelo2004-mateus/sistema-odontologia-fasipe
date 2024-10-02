// src/utils/variables/AnamneseVariables.ts
import { Field } from "@/utils/interfaces/Field"; // Importe a interface Field
import { Section } from "@/utils/interfaces/Section"; // Importando a interface Section

export const anamneseFieldInputTable: Field[] = [
  {
    title: "Nome",
    dataIndex: "anm_nome",
    key: "anm_nome",
    type: "text",
    name: "anm_nome",
    placeholder: "Digite o nome do paciente",
  },
  {
    title: "Idade",
    dataIndex: "anm_idade",
    key: "anm_idade",
    type: "number",
    name: "anm_idade",
    placeholder: "Digite a idade do paciente",
  },
  {
    title: "Sexo",
    dataIndex: "anm_sexo",
    key: "anm_sexo",
    type: "select",
    name: "anm_sexo",
    placeholder: "Selecione o sexo",
    options: [
      { value: "M", label: "Masculino" },
      { value: "F", label: "Feminino" },
    ],
  },
  {
    title: "Estado de Saúde",
    dataIndex: "anm_estado_saude",
    key: "anm_estado_saude",
    type: "text",
    name: "anm_estado_saude",
    placeholder: "Digite o estado de saúde do paciente",
  },
];

export const anamneseColumnsTable = [
  { title: "Nome", dataIndex: "anm_nome", key: "anm_nome" },
  { title: "Idade", dataIndex: "anm_idade", key: "anm_idade" },
  { title: "Sexo", dataIndex: "anm_sexo", key: "anm_sexo" },
  { title: "Estado de Saúde", dataIndex: "anm_estado_saude", key: "anm_estado_saude" },
];

export const anamneseSectionsFormDrawer: Section[] = [
  {
    section: "Informações Gerais",
    fields: anamneseFieldInputTable, // Referenciando os campos definidos
  },
];
