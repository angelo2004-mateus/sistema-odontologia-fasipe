// src/utils/helpers/profissionalRenderHelper.ts
import { Tag } from "antd"; 

export const renderTipo = (tipo: string): JSX.Element => {
  let color;
  switch (tipo) {
    case "Administrador":
      color = "blue";
      break;
    case "Técnico Básico":
      color = "green";
      break;
    case "Técnico Supervisor":
      color = "orange";
      break;
    default:
      color = "default";
  }
  return <Tag color={color}>{tipo}</Tag>;  // Usa Tag ao invés de span
};

export const renderStatus = (status: string): JSX.Element => {
  let color;
  switch (status) {
    case "Ativo":
      color = "green";
      break;
    case "Inativo":
      color = "red";
      break;
    case "Suspenso":
      color = "yellow";
      break;
    default:
      color = "default";
  }
  return <Tag color={color}>{status}</Tag>;
};
