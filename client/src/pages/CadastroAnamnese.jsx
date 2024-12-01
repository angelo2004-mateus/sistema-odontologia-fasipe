import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiUser } from "react-icons/fi";
import "./CadastroAnamnese.scss";

const CadastroAnamnese = () => {
  const location = useLocation();
  const paciente = location.state?.paciente;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cpf_pac: "",
    anm_nome: "",
    anm_idade: "",
    anm_sexo: "",
    anm_rg: "",
    anm_estado_saude: "",
    anm_trata_med: "",
    cod_prof: "",
    anm_med_uso: "",
    anm_ult_visita_med: "",
    anm_trata_antes: "",
    anm_proced_cir: "",
    anm_doenca_familiar: "",
    anm_possui_alergia: "",
    anm_outras_nfo: "",
    anm_motivo_consulta: "",
    anm_motv_visita_dent: "",
    anm_term_tratamento: "",
    anm_sangramento_gengival: "",
    anm_boca: "",
    anm_hab_bucais: "",
    anm_dores_face: "",
    anm_respiracao: "",
    anm_degluticao: "",
    anm_assimetria: "",
    anm_atm: "",
    anm_linfonodos: "",
    anm_musculos: "",
    anm_fonacao: "",
    anm_ult_visita_dent: "",
  });

  useEffect(() => {
    if (paciente) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        cpf_pac: paciente.cpf_pac,
        anm_nome: paciente.nome_pac,
      }));
    }
  }, [paciente]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleNumericChange = (event, field, maxLength) => {
    const value = event.target.value;
    const regex = /^[0-9\b]+$/;

    if (value === "" || (regex.test(value) && value.length <= maxLength)) {
      setFormData((prevFormData) => ({ ...prevFormData, [field]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem(formData.cpf_pac, JSON.stringify(formData));
    toast.success("Dados salvos com sucesso!");
    navigate(`/exameintrabucal/${formData.cpf_pac}`);
  };

  const getCurrentDate = () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().split('T')[0];
  };

  const today = getCurrentDate();

  return (
    <section className="general_container_anm">
      <section className="container_cadastro_anm">
        <div className="container_anamnese">
          <div className="title">
            <span className="icon">
              <FiUser />
            </span>
            <h2>Cadastrar Anamnese</h2>
          </div>

          <form className="ocultar-campo" method="POST" onSubmit={handleSubmit}>
          <input
  type="text"
  id="anm_leito"
  name="anm_leito"
  maxLength="100"
  placeholder="Leito do Paciente"
  value={formData.anm_leito}
  onChange={(e) => handleInputChange(e, "anm_leito")}
/>

<input
  type="text"
  id="anm_prof"
  name="anm_prof"
  maxLength="100"
  placeholder="Profissão do Paciente"
  value={formData.anm_prof}
  onChange={(e) => handleInputChange(e, "anm_prof")}
/>

<input
  type="text"
  id="anm_escolaridade"
  name="anm_escolaridade"
  maxLength="60"
  placeholder="Escolaridade do Paciente"
  value={formData.anm_escolaridade}
  onChange={(e) => handleInputChange(e, "anm_escolaridade")}
/>

<input
  type="text"
  id="anm_estado_civil"
  name="anm_estado_civil"
  maxLength="100"
  placeholder="Estado Civil do Paciente"
  value={formData.anm_estado_civil}
  onChange={(e) => handleInputChange(e, "anm_estado_civil")}
/>

<input
  type="text"
  id="anm_diag_med"
  name="anm_diag_med"
  maxLength="100"
  placeholder="Diagnóstico Médico"
  value={formData.anm_diag_med}
  onChange={(e) => handleInputChange(e, "anm_diag_med")}
/>

<input
  type="text"
  id="anm_motivo"
  name="anm_motivo"
  maxLength="200"
  placeholder="Motivo da Internação"
  value={formData.anm_motivo}
  onChange={(e) => handleInputChange(e, "anm_motivo")}
/>

<input
  type="text"
  id="anm_doenca_cronica"
  name="anm_doenca_cronica"
  maxLength="100"
  placeholder="Doenças Crônicas"
  value={formData.anm_doenca_cronica}
  onChange={(e) => handleInputChange(e, "anm_doenca_cronica")}
/>

<input
  type="text"
  id="anm_trata_antes"
  name="anm_trata_antes"
  maxLength="2000"
  placeholder="Tratamentos Anteriores"
  value={formData.anm_trata_antes}
  onChange={(e) => handleInputChange(e, "anm_trata_antes")}
/>

<input
  type="text"
  id="anm_fator_risco"
  name="anm_fator_risco"
  maxLength="100"
  placeholder="Fatores de Risco"
  value={formData.anm_fator_risco}
  onChange={(e) => handleInputChange(e, "anm_fator_risco")}
/>

<input
  type="text"
  id="anm_med_uso"
  name="anm_med_uso"
  maxLength="2000"
  placeholder="Medicamentos em Uso"
  value={formData.anm_med_uso}
  onChange={(e) => handleInputChange(e, "anm_med_uso")}
/>

<input
  type="text"
  id="anm_ant_familiar"
  name="anm_ant_familiar"
  maxLength="100"
  placeholder="Antecedentes Familiares"
  value={formData.anm_ant_familiar}
  onChange={(e) => handleInputChange(e, "anm_ant_familiar")}
/>

<input
  type="text"
  id="anm_cond_mora"
  name="anm_cond_mora"
  maxLength="100"
  placeholder="Condições de Moradia"
  value={formData.anm_cond_mora}
  onChange={(e) => handleInputChange(e, "anm_cond_mora")}
/>

<input
  type="text"
  id="anm_cuida_corpo"
  name="anm_cuida_corpo"
  maxLength="100"
  placeholder="Cuidado Corporal"
  value={formData.anm_cuida_corpo}
  onChange={(e) => handleInputChange(e, "anm_cuida_corpo")}
/>

<input
  type="text"
  id="anm_habi_banho"
  name="anm_habi_banho"
  maxLength="100"
  placeholder="Hábito de Banho"
  value={formData.anm_habi_banho}
  onChange={(e) => handleInputChange(e, "anm_habi_banho")}
/>

<input
  type="text"
  id="anm_ativ_fisi_traba"
  name="anm_ativ_fisi_traba"
  maxLength="100"
  placeholder="Atividade Física no Trabalho"
  value={formData.anm_ativ_fisi_traba}
  onChange={(e) => handleInputChange(e, "anm_ativ_fisi_traba")}
/>

<input
  type="text"
  id="anm_sono_repo"
  name="anm_sono_repo"
  maxLength="100"
  placeholder="Sono e Repouso"
  value={formData.anm_sono_repo}
  onChange={(e) => handleInputChange(e, "anm_sono_repo")}
/>

<input
  type="text"
  id="anm_exec_fisi_prog"
  name="anm_exec_fisi_prog"
  maxLength="100"
  placeholder="Exercícios Físicos Programados"
  value={formData.anm_exec_fisi_prog}
  onChange={(e) => handleInputChange(e, "anm_exec_fisi_prog")}
/>

<input
  type="text"
  id="anm_rec_lazer"
  name="anm_rec_lazer"
  maxLength="100"
  placeholder="Recreação e Lazer"
  value={formData.anm_rec_lazer}
  onChange={(e) => handleInputChange(e, "anm_rec_lazer")}
/>

<input
  type="text"
  id="anm_cost_comer_freq"
  name="anm_cost_comer_freq"
  maxLength="100"
  placeholder="Costume de Comer com Frequência"
  value={formData.anm_cost_comer_freq}
  onChange={(e) => handleInputChange(e, "anm_cost_comer_freq")}
/>

<input
  type="text"
  id="anm_elim_uri"
  name="anm_elim_uri"
  maxLength="100"
  placeholder="Eliminação Urinária"
  value={formData.anm_elim_uri}
  onChange={(e) => handleInputChange(e, "anm_elim_uri")}
/>

<input
  type="text"
  id="anm_elim_int"
  name="anm_elim_int"
  maxLength="100"
  placeholder="Eliminação Intestinal"
  value={formData.anm_elim_int}
  onChange={(e) => handleInputChange(e, "anm_elim_int")}
/>

<input
  type="text"
  id="anm_ciclo_menst"
  name="anm_ciclo_menst"
  maxLength="100"
  placeholder="Ciclo Menstrual"
  value={formData.anm_ciclo_menst}
  onChange={(e) => handleInputChange(e, "anm_ciclo_menst")}
/>

<input
  type="text"
  id="anm_ativ_sex"
  name="anm_ativ_sex"
  maxLength="100"
  placeholder="Atividade Sexual"
  value={formData.anm_ativ_sex}
  onChange={(e) => handleInputChange(e, "anm_ativ_sex")}
/>

<input
  type="text"
  id="anm_hidratacao"
  name="anm_hidratacao"
  maxLength="100"
  placeholder="Hidratação"
  value={formData.anm_hidratacao}
  onChange={(e) => handleInputChange(e, "anm_hidratacao")}
/>

<input
  type="text"
  id="anm_cor_muco"
  name="anm_cor_muco"
  maxLength="100"
  placeholder="Coloração da Mucosa"
  value={formData.anm_cor_muco}
  onChange={(e) => handleInputChange(e, "anm_cor_muco")}
/>

<input
  type="text"
  id="anm_temperatura"
  name="anm_temperatura"
  maxLength="100"
  placeholder="Temperatura do Paciente"
  value={formData.anm_temperatura}
  onChange={(e) => handleInputChange(e, "anm_temperatura")}
/>

<input
  type="text"
  id="anm_pressao"
  name="anm_pressao"
  maxLength="100"
  placeholder="Pressão Arterial"
  value={formData.anm_pressao}
  onChange={(e) => handleInputChange(e, "anm_pressao")}
/>

<input
  type="text"
  id="anm_pulso"
  name="anm_pulso"
  maxLength="100"
  placeholder="Pulso do Paciente"
  value={formData.anm_pulso}
  onChange={(e) => handleInputChange(e, "anm_pulso")}
/>

<input
  type="text"
  id="anm_respiracao"
  name="anm_respiracao"
  maxLength="100"
  placeholder="Respiração do Paciente"
  value={formData.anm_respiracao}
  onChange={(e) => handleInputChange(e, "anm_respiracao")}
/>

<input
  type="text"
  id="anm_cons_int"
  name="anm_cons_int"
  maxLength="100"
  placeholder="Consciência Intelectual"
  value={formData.anm_cons_int}
  onChange={(e) => handleInputChange(e, "anm_cons_int")}
/>

<input
  type="text"
  id="anm_cons_mot"
  name="anm_cons_mot"
  maxLength="100"
  placeholder="Consciência Motora"
  value={formData.anm_cons_mot}
  onChange={(e) => handleInputChange(e, "anm_cons_mot")}
/>
<input
  type="text"
  id="anm_cons_mot"
  name="anm_cons_mot"
  maxLength="100"
  placeholder="Consciência Motora"
  value={formData.anm_cons_mot}
  onChange={(e) => handleInputChange(e, "anm_cons_mot")}
/>
<input
  type="text"
  id="anm_glicemia"
  name="anm_glicemia"
  maxLength="100"
  placeholder="Glicemia do Paciente"
  value={formData.anm_glicemia}
  onChange={(e) => handleInputChange(e, "anm_glicemia")}
/>

<input
  type="text"
  id="anm_dor"
  name="anm_dor"
  maxLength="100"
  placeholder="Nível de dor do Paciente"
  value={formData.anm_dor}
  onChange={(e) => handleInputChange(e, "anm_dor")}
/>

<input
  type="text"
  id="anm_peso"
  name="anm_peso"
  maxLength="100"
  placeholder="Peso do Paciente"
  value={formData.anm_peso}
  onChange={(e) => handleInputChange(e, "anm_peso")}
/>

<input
  type="text"
  id="anm_altura"
  name="anm_altura"
  maxLength="100"
  placeholder="Altura do Paciente"
  value={formData.anm_altura}
  onChange={(e) => handleInputChange(e, "anm_altura")}
/>

<input
  type="text"
  id="anm_imc"
  name="anm_imc"
  maxLength="100"
  placeholder="IMC do Paciente"
  value={formData.anm_imc}
  onChange={(e) => handleInputChange(e, "anm_imc")}
/>

<input
  type="text"
  id="anm_estado-nutri"
  name="anm_estado-nutri"
  maxLength="100"
  placeholder="Estado nutricional do Paciente"
  value={formData.anm_estado_nutri}
  onChange={(e) => handleInputChange(e, "anm_estado-nutri")}
/>

<input
  type="text"
  id="anm_nivel-conce"
  name="anm_nivel-conce"
  maxLength="100"
  placeholder="Nível de consciência do Paciente"
  value={formData.anm_nivel_conce}
  onChange={(e) => handleInputChange(e, "anm_nivel-conce")}
/>

<input
  type="text"
  id="anm_movi"
  name="anm_movi"
  maxLength="100"
  placeholder="Condição de Movimentação do Paciente"
  value={formData.anm_movi}
  onChange={(e) => handleInputChange(e, "anm_movi")}
/>

<input
  type="text"
  id="anm_pele"
  name="anm_pele"
  maxLength="100"
  placeholder="Condição de pele/tecidos do Paciente"
  value={formData.anm_pele}
  onChange={(e) => handleInputChange(e, "anm_pele")}
/>

<input
  type="text"
  id="anm_cranio"
  name="anm_cranio"
  maxLength="100"
  placeholder="Condição do Crânio do Paciente"
  value={formData.anm_cranio}
  onChange={(e) => handleInputChange(e, "anm_cranio")}
/>

<input
  type="text"
  id="anm_olhos"
  name="anm_olhos"
  maxLength="100"
  placeholder="Condição dos Olhos do Paciente"
  value={formData.anm_olhos}
  onChange={(e) => handleInputChange(e, "anm_olhos")}
/>

<input
  type="text"
  id="anm_ouvido"
  name="anm_ouvido"
  maxLength="100"
  placeholder="Condição do Ouvido do Paciente"
  value={formData.anm_ouvido}
  onChange={(e) => handleInputChange(e, "anm_ouvido")}
/>

<input
  type="text"
  id="anm_nariz"
  name="anm_nariz"
  maxLength="100"
  placeholder="Condição do Nariz do Paciente"
  value={formData.anm_nariz}
  onChange={(e) => handleInputChange(e, "anm_nariz")}
/>

<input
  type="text"
  id="anm_boca"
  name="anm_boca"
  maxLength="100"
  placeholder="Condição da Boca do Paciente"
  value={formData.anm_boca}
  onChange={(e) => handleInputChange(e, "anm_boca")}
/>

<input
  type="text"
  id="anm_pescoco"
  name="anm_pescoco"
  maxLength="100"
  placeholder="Condição do Pescoço do Paciente"
  value={formData.anm_pescoco}
  onChange={(e) => handleInputChange(e, "anm_pescoco")}
/>

<input
  type="text"
  id="anm_torax"
  name="anm_torax"
  maxLength="100"
  placeholder="Condição do Tórax do Paciente"
  value={formData.anm_torax}
  onChange={(e) => handleInputChange(e, "anm_torax")}
/>

<input
  type="text"
  id="anm_mamas"
  name="anm_mamas"
  maxLength="100"
  placeholder="Condição das Mamas do Paciente"
  value={formData.anm_mamas}
  onChange={(e) => handleInputChange(e, "anm_mamas")}
/>

<input
  type="text"
  id="anm_auscult-pulmao"
  name="anm_auscult-pulmao"
  maxLength="100"
  placeholder="Auscultação pulmonar do Paciente"
  value={formData.anm_auscult_pulmao}
  onChange={(e) => handleInputChange(e, "anm_auscult-pulmao")}
/>

<input
  type="text"
  id="anm_oxi"
  name="anm_oxi"
  maxLength="100"
  placeholder="Condição de Oxigenação do Paciente"
  value={formData.anm_oxi}
  onChange={(e) => handleInputChange(e, "anm_oxi")}
/>

<input
  type="text"
  id="anm_coracao"
  name="anm_coracao"
  maxLength="100"
  placeholder="Condição do Coração do Paciente"
  value={formData.anm_coracao}
  onChange={(e) => handleInputChange(e, "anm_coracao")}
/>

<input
  type="text"
  id="anm_precordio"
  name="anm_precordio"
  maxLength="100"
  placeholder="Precordio do Paciente"
  value={formData.anm_precordio}
  onChange={(e) => handleInputChange(e, "anm_precordio")}
/>

<input
  type="text"
  id="anm_abdomen"
  name="anm_abdomen"
  maxLength="100"
  placeholder="Condição do Abdome do Paciente"
  value={formData.anm_abdomen}
  onChange={(e) => handleInputChange(e, "anm_abdomen")}
/>

<input
  type="text"
  id="anm_genitu"
  name="anm_genitu"
  maxLength="100"
  placeholder="Condição Geniturinário do Paciente"
  value={formData.anm_genitu}
  onChange={(e) => handleInputChange(e, "anm_genitu")}
/>

<input
  type="text"
  id="anm_membro-sup"
  name="anm_membro-sup"
  maxLength="100"
  placeholder="Condição dos Membros Superiores do Paciente"
  value={formData.anm_membro_sup}
  onChange={(e) => handleInputChange(e, "anm_membro-sup")}
/>

<input
  type="text"
  id="anm_membro-inf"
  name="anm_membro-inf"
  maxLength="100"
  placeholder="Condição dos Membros Inferiores do Paciente"
  value={formData.anm_membro_inf}
  onChange={(e) => handleInputChange(e, "anm_membro-inf")}
/>

<input
  type="text"
  id="anm_med-casa"
  name="anm_med-casa"
  maxLength="2000"
  placeholder="Medicação usada em casa"
  value={formData.anm_med_casa}
  onChange={(e) => handleInputChange(e, "anm_med-casa")}
/>

<input
  type="text"
  id="anm_exame-lab"
  name="anm_exame-lab"
  maxLength="2000"
  placeholder="Exames laboratoriais e diagnóstico"
  value={formData.anm_exame_lab}
  onChange={(e) => handleInputChange(e, "anm_exame-lab")}
/>

<input
  type="text"
  id="anm_outras-queixas"
  name="anm_outras-queixas"
  maxLength="2000"
  placeholder="Outras queixas do paciente"
  value={formData.anm_outras_queixas}
  onChange={(e) => handleInputChange(e, "anm_outras-queixas")}
/>

<input
  type="text"
  id="anm_int-social"
  name="anm_int-social"
  maxLength="1"
  placeholder="Interação social do paciente"
  value={formData.anm_int_social}
  onChange={(e) => handleInputChange(e, "anm_int-social")}
/>
<input
  type="text"
  id="anm_reso_prob"
  name="anm_reso_prob"
  maxLength="1"
  placeholder="Resolução de problemas do Paciente"
  value={formData.anm_reso_prob}
  onChange={(e) => handleInputChange(e, "anm_reso-prob")}
/>

<input
  type="text"
  id="anm_apoio_spiri"
  name="anm_apoio_spiri"
  maxLength="1"
  placeholder="Apoio espiritual do Paciente"
  value={formData.anm_apoio_spiri}
  onChange={(e) => handleInputChange(e, "anm_apoio-spiri")}
/>

<input
  type="text"
  id="anm_sup_finan"
  name="anm_sup_finan"
  maxLength="100"
  placeholder="Suporte financeiro do Paciente"
  value={formData.anm_sup_finan}
  onChange={(e) => handleInputChange(e, "anm_sup-finan")}
/>

<input
  type="text"
  id="anm_conhe_prob_saude"
  name="anm_conhe_prob_saude"
  maxLength="100"
  placeholder="Conhecimento sobre seu problema de saúde"
  value={formData.anm_conhe_prob_saude}
  onChange={(e) => handleInputChange(e, "anm_conhe-prob-saude")}
/>

<input
  type="text"
  id="anm_cond_autocare"
  name="anm_cond_autocare"
  maxLength="100"
  placeholder="Condições que o paciente mostra autocuidado"
  value={formData.anm_cond_autocare}
  onChange={(e) => handleInputChange(e, "anm_cond-autocare")}
/>

<input
  type="text"
  id="anm_mudanca_humor"
  name="anm_mudanca_humor"
  maxLength="100"
  placeholder="Mudança de humor após diagnóstico do Paciente"
  value={formData.anm_mudanca_humor}
  onChange={(e) => handleInputChange(e, "anm_mudanca-humor")}
/>

<input
  type="text"
  id="anm_dado_area"
  name="anm_dado_area"
  maxLength="2000"
  placeholder="Dados específicos de cada área"
  value={formData.anm_dado_area}
  onChange={(e) => handleInputChange(e, "anm_dado-area")}
/>

<input
  type="text"
  id="anm_inter_imp_entrevista"
  name="anm_inter_imp_entrevista"
  maxLength="2000"
  placeholder="Impressões do(a) entrevistador(a)"
  value={formData.anm_inter_imp_entrevista}
  onChange={(e) => handleInputChange(e, "anm.inter_imp-entrevista")}
/>

<input
  type="text"
  id="anm_inter_int_fisica"
  name="anm_inter_int_fisica"
  maxLength="100"
  placeholder="Integridade Física na visão do Enfermeiro"
  value={formData.anm_inter_int_fisica}
  onChange={(e) => handleInputChange(e, "anm.inter_int-fisica")}
/>

<input
  type="text"
  id="anm_inter_comunica"
  name="anm_inter_comunica"
  maxLength="100"
  placeholder="Comunicação na visão do Enfermeiro"
  value={formData.anm_inter_comunica}
  onChange={(e) => handleInputChange(e, "anm.inter_comunica")}
/>

<input
  type="text"
  id="anm_inter_sis_resp"
  name="anm_inter_sis_resp"
  maxLength="100"
  placeholder="Sistema Respiratório na visão do Enfermeiro"
  value={formData.anm_inter_sis_resp}
  onChange={(e) => handleInputChange(e, "anm.inter_sis-resp")}
/>

<input
  type="text"
  id="anm_inter_sis_circu"
  name="anm_inter_sis_circu"
  maxLength="100"
  placeholder="Sistema Circulatório na visão do Enfermeiro"
  value={formData.anm_inter_sis_circu}
  onChange={(e) => handleInputChange(e, "anm.inter_sis-circu")}
/>

<input
  type="text"
  id="anm_inter_sis_gastro"
  name="anm_inter_sis_gastro"
  maxLength="100"
  placeholder="Sistema Gastrintestinal na visão do Enfermeiro"
  value={formData.anm_inter_sis_gastro}
  onChange={(e) => handleInputChange(e, "anm.inter_sis-gastro")}
/>

<input
  type="text"
  id="anm_inter_sis_genito_uri"
  name="anm_inter_sis_genito_uri"
  maxLength="100"
  placeholder="Sistema genito urinário na visão do Enfermeiro"
  value={formData.anm_inter_sis_genito_uri}
  onChange={(e) => handleInputChange(e, "anm.inter_sis-genito-uri")}
/>

<input
  type="text"
  id="anm_inter_asp_psico_emocional"
  name="anm_inter_asp_psico_emocional"
  maxLength="100"
  placeholder="Aspectos psicossocioemocionais na visão do Enfermeiro"
  value={formData.anm_inter_asp_psico_emocional}
  onChange={(e) => handleInputChange(e, "anm.inter_asp-psico-emocional")}
/>

<input
  type="text"
  id="anm_inter_int_fisica_medica"
  name="anm_inter_int_fisica_medica"
  maxLength="100"
  placeholder="Integridade Física na visão do Médico"
  value={formData.anm_inter_int_fisica_medica}
  onChange={(e) => handleInputChange(e, "anm.inter_int-fisica-medica")}
/>

<input
  type="text"
  id="anm_inter_comunica_med"
  name="anm_inter_comunica_med"
  maxLength="100"
  placeholder="Comunicação na visão do Médico"
  value={formData.anm_inter_comunica_med}
  onChange={(e) => handleInputChange(e, "anm.inter_comunica-med")}
/>

<input
  type="text"
  id="anm_inter_sis_resp_med"
  name="anm_inter_sis_resp_med"
  maxLength="100"
  placeholder="Sistema Respiratório na visão do Médico"
  value={formData.anm_inter_sis_resp_med}
  onChange={(e) => handleInputChange(e, "anm.inter_sis-resp-med")}
/>

<input
  type="text"
  id="anm_inter_sis_cardio_med"
  name="anm_inter_sis_cardio_med"
  maxLength="100"
  placeholder="Sistema Cardiocirculatório na visão do Médico"
  value={formData.anm_inter_sis_cardio_med}
  onChange={(e) => handleInputChange(e, "anm.inter_sis-cardio-med")}
/>

<input
  type="text"
  id="anm_inter_sis_gastro_med"
  name="anm_inter_sis_gastro_med"
  maxLength="100"
  placeholder="Sistema Gastrointestinal na visão do Médico"
  value={formData.anm_inter_sis_gastro_med}
  onChange={(e) => handleInputChange(e, "anm.inter_sis-gastro-med")}
/>

<input
  type="text"
  id="anm_inter_sis_imuno_med"
  name="anm_inter_sis_imuno_med"
  maxLength="100"
  placeholder="Sistema Imunológico na visão do Médico"
  value={formData.anm_inter_sis_imuno_med}
  onChange={(e) => handleInputChange(e, "anm.inter_sis-imuno-med")}
/>

<input
  type="text"
  id="anm_inter_asp_prev_promocao_saude"
  name="anm_inter_asp_prev_promocao_saude"
  maxLength="2000"
  placeholder="Aspectos de prevenção e promoção de saúde"
  value={formData.anm_inter_asp_prev_promocao_saude}
  onChange={(e) => handleInputChange(e, "anm.inter_asp-prev-promocao-saude")}
/>

<input
  type="text"
  id="anm_inter_enfermeiro"
  name="anm_inter_enfermeiro"
  maxLength="100"
  placeholder="Assinatura do Enfermeiro(a)"
  value={formData.anm_inter_enfermeiro}
  onChange={(e) => handleInputChange(e, "anm.inter_enfermeiro")}
/>

<input
  type="text"
  id="anm_inter_enfermeiro_coren"
  name="anm_inter_enfermeiro_coren"
  maxLength="100"
  placeholder="Coren do Enfermeiro(a)"
  value={formData.anm_inter_enfermeiro_coren}
  onChange={(e) => handleInputChange(e, "anm.inter_enfermeiro-coren")}
/>

<input
  type="date"
  id="anm_inter_enfermeiro_data"
  name="anm_inter_enfermeiro_data"
  placeholder="Data de emissão do Enfermeiro(a)"
  value={formData.anm_inter_enfermeiro_data}
  onChange={(e) => handleInputChange(e, "anm.inter_enfermeiro-data")}
/>  


          </form>

          <form className="form" method="POST" onSubmit={handleSubmit}>
            {/* CPF do paciente */}
            <input
              type="text"
              id="cpf_pac"
              name="cpf_pac"
              maxLength="11"
              required
              placeholder="CPF"
              value={formData.cpf_pac}
              onChange={(e) => handleNumericChange(e, "cpf_pac", 11)}
            />
            

            {/* Nome do paciente */}
            <input
              type="text"
              id="anm_nome"
              name="anm_nome"
              maxLength="100"
              required
              placeholder="Nome"
              value={formData.anm_nome}
              onChange={handleInputChange}
            />

            {/* Idade do paciente */}
            <input
              type="text"
              id="anm_idade"
              name="anm_idade"
              maxLength="2"
              required
              placeholder="Idade"
              value={formData.anm_idade}
              onChange={(e) => handleNumericChange(e, "anm_idade", 2)}
            />

            {/* Sexo do paciente */}
            <div className="select-form">
              <select
                id="anm_sexo"
                name="anm_sexo"
                value={formData.anm_sexo}
                onChange={handleInputChange}
                required
              >
                <option value="">Sexo do paciente</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </div>

            {/* RG do paciente */}
            <input
              type="text"
              id="anm_rg"
              name="anm_rg"
              maxLength="9"
              placeholder="RG"
              value={formData.anm_rg}
              onChange={(e) => handleNumericChange(e, "anm_rg", 9)}
            />

            {/* Estado de saúde do paciente */}
            <input
              type="text"
              id="anm_estado_saude"
              name="anm_estado_saude"
              maxLength="100"
              placeholder="Estado de saúde"
              value={formData.anm_estado_saude}
              onChange={handleInputChange}
            />

            {/* Fazendo tratamento médico */}
            <input
              type="text"
              id="anm_trata_med"
              name="anm_trata_med"
              maxLength="100"
              placeholder="Tratamento médico"
              value={formData.anm_trata_med}
              onChange={handleInputChange}
            />

            {/* Código de identificação do profissional */}
            <input
              type="text"
              id="cod_prof"
              name="cod_prof"
              maxLength="5"
              placeholder="Código do profissional"
              value={formData.cod_prof}
              onChange={(e) => handleNumericChange(e, "cod_prof", 5)}
            />

            {/* Medicamento em uso do Paciente */}
            <input
              type="text"
              id="anm_med_uso"
              name="anm_med_uso"
              maxLength="2000"
              placeholder="Medicamento em uso"
              value={formData.anm_med_uso}
              onChange={handleInputChange}
            />

            {/* Tratamentos anteriores do Paciente */}
            <input
              type="text"
              id="anm_trata_antes"
              name="anm_trata_antes"
              maxLength="50"
              placeholder="Tratamentos anteriores"
              value={formData.anm_trata_antes}
              onChange={handleInputChange}
            />

            {/* Procedimentos cirúrgicos anteriores */}
            <input
              type="text"
              id="anm_proced_cir"
              name="anm_proced_cir"
              maxLength="150"
              placeholder="Procedimentos anteriores"
              value={formData.anm_proced_cir}
              onChange={handleInputChange}
            />

            {/* Doenças próprias ou familiares */}
            <input
              type="text"
              id="anm_doenca_familiar"
              name="anm_doenca_familiar"
              maxLength="100"
              placeholder="Doenças próprias ou familiares"
              value={formData.anm_doenca_familiar}
              onChange={handleInputChange}
            />

            {/* Paciente possui alergia */}
            <input
              type="text"
              id="anm_possui_alergia"
              name="anm_possui_alergia"
              maxLength="100"
              placeholder="Paciente possui alergia"
              value={formData.anm_possui_alergia}
              onChange={handleInputChange}
            />

            {/* Outras informações */}
            <input
              type="text"
              id="anm_outras_nfo"
              name="anm_outras_nfo"
              maxLength="150"
              placeholder="Outras informações"
              value={formData.anm_outras_nfo}
              onChange={handleInputChange}
            />

            {/* Motivo da consulta */}
            <input
              type="text"
              id="anm_motivo_consulta"
              name="anm_motivo_consulta"
              maxLength="150"
              placeholder="Motivo da consulta"
              required
              value={formData.anm_motivo_consulta}
              onChange={handleInputChange}
            />

            {/* Motivo da visita ao dentista */}
            <input
              type="text"
              id="anm_motv_visita_dent"
              name="anm_motv_visita_dent"
              maxLength="150"
              placeholder="Motivo da visita ao dentista"
              value={formData.anm_motv_visita_dent}
              onChange={handleInputChange}
            />

            {/* Termo de tratamento */}
            <input
              type="text"
              id="anm_term_tratamento"
              name="anm_term_tratamento"
              maxLength="50"
              placeholder="Terminou o tratamento?"
              value={formData.anm_term_tratamento}
              onChange={handleInputChange}
            />

            {/* Sangramento gengival */}
            <input
              type="text"
              id="anm_sangramento_gengival"
              name="anm_sangramento_gengival"
              maxLength="150"
              placeholder="Sangramento gengival"
              value={formData.anm_sangramento_gengival}
              onChange={handleInputChange}
            />

            {/* Boca */}
            <input
              type="text"
              id="anm_boca"
              name="anm_boca"
              maxLength="100"
              placeholder="Apresenta dificuldade em abrir a boca?"
              value={formData.anm_boca}
              onChange={handleInputChange}
            />

            {/* Hábitos bucais */}
            <input
              type="text"
              id="anm_hab_bucais"
              name="anm_hab_bucais"
              maxLength="100"
              placeholder="Hábitos bucais"
              value={formData.anm_hab_bucais}
              onChange={handleInputChange}
            />

            {/* Dores na face */}
            <input
              type="text"
              id="anm_dores_face"
              name="anm_dores_face"
              maxLength="100"
              placeholder="Dores na face"
              value={formData.anm_dores_face}
              onChange={handleInputChange}
            />

            {/* Respiração */}
            <input
              type="text"
              id="anm_respiracao"
              name="anm_respiracao"
              maxLength="100"
              placeholder="Respiração"
              value={formData.anm_respiracao}
              onChange={handleInputChange}
            />

            {/* Deglutição */}
            <input
              type="text"
              id="anm_degluticao"
              name="anm_degluticao"
              maxLength="100"
              placeholder="Deglutição"
              value={formData.anm_degluticao}
              onChange={handleInputChange}
            />

            {/* Assimetria */}
            <input
              type="text"
              id="anm_assimetria"
              name="anm_assimetria"
              maxLength="100"
              placeholder="Assimetria"
              value={formData.anm_assimetria}
              onChange={handleInputChange}
            />

            {/* ATM */}
            <input
              type="text"
              id="anm_atm"
              name="anm_atm"
              maxLength="100"
              placeholder="ATM"
              value={formData.anm_atm}
              onChange={handleInputChange}
            />

            {/* Linfonodos */}
            <input
              type="text"
              id="anm_linfonodos"
              name="anm_linfonodos"
              maxLength="100"
              placeholder="Linfonodos"
              value={formData.anm_linfonodos}
              onChange={handleInputChange}
            />

            {/* Músculos */}
            <input
              type="text"
              id="anm_musculos"
              name="anm_musculos"
              maxLength="100"
              placeholder="Musculos Face/pescoço"
              value={formData.anm_musculos}
              onChange={handleInputChange}
            />

            {/* Fonologia */}
            <input
              type="text"
              id="anm_fonacao"
              name="anm_fonacao"
              maxLength="100"
              placeholder="Fonação"
              value={formData.anm_fonacao}
              onChange={handleInputChange}
            />

            {/* Última visita ao médico */}
            <input
              type="date"
              id="anm_ult_visita_med"
              name="anm_ult_visita_med"
              max={today}
              placeholder="Última visita ao médico"
              value={formData.anm_ult_visita_med}
              onChange={handleInputChange}
            />

            {/* Última visita ao dentista */}
            <input
              type="date"
              id="anm_ult_visita_dent"
              name="anm_ult_visita_dent"
              max={today}
              placeholder="Última visita ao dentista"
              value={formData.anm_ult_visita_dent}
              onChange={handleInputChange}
            />

            <button type="submit">Próximo</button>
          </form>
        </div>
      </section>
      <ToastContainer />
    </section>
  );
};

export default CadastroAnamnese;