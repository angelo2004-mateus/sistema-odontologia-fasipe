// src/utils/helpers/professionalHelpers.ts
export const getTipoProfissional = (tipo: number): string => {
  switch (tipo) {
    case 1:
      return "Administrador";
    case 2:
      return "Técnico Básico";
    case 3:
      return "Técnico Supervisor";
    default:
      return "Desconhecido"; // Para lidar com tipos não definidos
  }
};

export const getStatusProfissional = (status: number): string => {
  switch (status) {
    case 1:
      return "Ativo";
    case 2:
      return "Inativo";
    case 3:
      return "Suspenso";
    default:
      return "Desconhecido"; // Para lidar com status não definidos
  }
};

