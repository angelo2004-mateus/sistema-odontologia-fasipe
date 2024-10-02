// src/utils/interfaces/ProfissionalInterface.ts
export interface Profissional {
    cod_prof: number;         // Código do profissional
    nome_prof: string;        // Nome do profissional
    tipo_prof: number | string;        // Tipo do profissional (ex: médico, enfermeiro, etc.)
    sup_prof: number | null;  // Código do profissional supervisor (nullable)
    status_prof: number | string;      // Status do profissional (ex: ativo, inativo)
    cons_prof: string;  // Código do profissional consultor (nullable)
    senha_prof: string;       // Senha do profissional
  }
  