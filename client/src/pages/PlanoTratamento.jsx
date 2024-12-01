import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PlanoTratamento.scss';

const PlanoTratamento = () => {
  const { cpf_pac } = useParams();

  // Função para obter a data atual no formato YYYY-MM-DD no fuso horário local
  const getCurrentDate = () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    teste1: '',
    teste2: '',
    teste3: '',
    cpf_pac,
    sessao_proced: getCurrentDate(), // Definindo a data atual como valor inicial
  });

  useEffect(() => {
    const anamneseData = JSON.parse(localStorage.getItem(cpf_pac));
    const dentesData = JSON.parse(localStorage.getItem(`anamneseDente_${cpf_pac}`));
    const exameIntraBucalData = JSON.parse(localStorage.getItem(`exameIntraBucal_${cpf_pac}`)) || {};
    const periogramaData = JSON.parse(localStorage.getItem(`periograma_${cpf_pac}`)) || {};

    // Merge dos dados para o formulário
    if (anamneseData && dentesData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...anamneseData,
        ...exameIntraBucalData,
        dentes: dentesData,
        periograma: periogramaData.dentes || {}, // Adiciona os dados do periograma
      }));
    }
  }, [cpf_pac]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Mapeia os dados para usar os nomes corretos no backend
    const payload = {
      ...formData,
      anm_plane_proced: formData.planejamento_proced,
      anm_sessao_proced: formData.sessao_proced,
    };
  
    console.log('Dados enviados:', payload); // Verificar payload
  
    try {
      // Enviar os dados ao backend
      await axios.post(`http://localhost:3000/plano-tratamento/${cpf_pac}`, payload);
      toast.success('Plano de Tratamento salvo com sucesso!');
  
      // Limpar localStorage após o envio
      localStorage.removeItem(cpf_pac);
      localStorage.removeItem(`anamneseDente_${cpf_pac}`);
      localStorage.removeItem(`exameIntraBucal_${cpf_pac}`);
      localStorage.removeItem(`periograma_${cpf_pac}`);
    } catch (error) {
      console.error('Erro ao salvar plano de tratamento:', error);
      toast.error('Erro ao salvar o Plano de Tratamento. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="container_plano_tratamento">
      <div className="container_form">
        <div className="title">
          <h2>Plano de Tratamento</h2>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            id="cpf_pac"
            name="cpf_pac"
            maxLength="11"
            value={formData.cpf_pac}
            onChange={handleInputChange}
            placeholder="CPF do paciente"
            required
          />
          <textarea
            id="planejamento_proced"
            name="planejamento_proced"
            value={formData.planejamento_proced}
            onChange={handleInputChange}
            placeholder="Planejamento do procedimento"
            required
          ></textarea>
          <div className="input-container">
            <input
              type="date"
              id="sessao_proced"
              name="sessao_proced"
              value={formData.sessao_proced}
              onChange={handleInputChange}
              readOnly
            />
            <span className={`placeholder ${formData.sessao_proced ? 'hidden' : ''}`}>
              Sessão
            </span>
          </div>
          <button type="submit" className="btn">Enviar</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default PlanoTratamento;
