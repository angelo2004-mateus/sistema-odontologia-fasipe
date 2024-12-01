export interface Paciente {
  cod_pac: string;
  cpf_pac: string;
  rg_pac: string;
  nome_pac: string;
  data_nasc_pac: string | null | Date;
  tel_pac: string;
  bairro_pac?: string; // Se precisar de propriedades opcionais, use o ? 
  cep_pac?: string;
  compl_pac?: string;
  num_logra_pac?: string;
  est_rg_pac?: string;
  logra_pac?: string;
  nome_mae_pac?: string;
  uf_pac?: string;
}
