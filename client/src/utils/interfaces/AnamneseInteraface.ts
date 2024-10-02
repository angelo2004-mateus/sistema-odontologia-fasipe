// AnamneseInterface.ts
export interface Anamnese {
    cpf_pac: number;
    anm_nome: string;
    anm_idade: number;
    anm_sexo: string; // "M" ou "F"
    anm_rg?: number;
    anm_estado_saude?: string;
    anm_trata_med?: string;
    cod_prof?: number;
    anm_med_uso?: string;
    anm_ult_visita_med?: string; // YYYY-MM-DD
    anm_motivo_consulta?: string;
    anm_ult_visita_dent?: string; // YYYY-MM-DD
    // Adicione outros campos conforme necessário
  }
  