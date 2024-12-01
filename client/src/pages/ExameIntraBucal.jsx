import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./ExameIntraBucal.scss"

const ExameIntraBucal = () => {
  const { cpf_pac } = useParams();
  const navigate = useNavigate();
  const [exameData, setExameData] = useState({
    anm_labios: '',
    anm_fundoVestibulo: '',
    anm_palato: '',
    anm_bochecha: '',
    anm_lingua: '',
    anm_assoalhoBoca: '',
    anm_faringeBucal: '',
    anm_historiaTrauma: '',
    anm_oclusao: '',
    anm_fluorose: '',
    anm_aspectoPeriodontal: '',
    anm_outrasInformacoes: ''
  });

  const handleChange = (field, value) => {
    setExameData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    localStorage.setItem(`exameIntraBucal_${cpf_pac}`, JSON.stringify(exameData));
    navigate(`/cadastro-dentes/${cpf_pac}`);
  };

  return (
    <div className="general_container_exame">
  <div className="container_exame">
    <h2>Exame Intra Bucal</h2>
    <form onSubmit={handleSave}>
  <div className="form">
    <div className="form-group">
      <label>Lábios:</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="labios"
            value="Normais"
            checked={exameData.labios === "Normais"}
            onChange={(e) => handleChange('labios', e.target.value)}
          /> 
          Normais
        </label>
        <label>
          <input
            type="radio"
            name="labios"
            value="Alterados"
            checked={exameData.labios === "Alterados"}
            onChange={(e) => handleChange('labios', e.target.value)}
          /> 
          Alterados
        </label>
      </div>
    </div>
    

    <div className="form-group">
      <label>Fundo de Vestíbulo:</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="fundoVestibulo"
            value="Normais"
            checked={exameData.fundoVestibulo === "Normais"}
            onChange={(e) => handleChange('fundoVestibulo', e.target.value)}
          /> 
          Normais
        </label>
        <label>
          <input
            type="radio"
            name="fundoVestibulo"
            value="Alterados"
            checked={exameData.fundoVestibulo === "Alterados"}
            onChange={(e) => handleChange('fundoVestibulo', e.target.value)}
          /> 
          Alterados
        </label>

        
      </div>
    </div>
    <div className="form-group">
      <label>Palato:</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="Palato"
            value="Normais"
            checked={exameData.palato === "Normais"}
            onChange={(e) => handleChange('palato', e.target.value)}
          /> 
          Normais
        </label>
        <label>
          <input
            type="radio"
            name="palato"
            value="Alterados"
            checked={exameData.palato === "Alterados"}
            onChange={(e) => handleChange('palato', e.target.value)}
          /> 
          Alterados
        </label>
      </div>
    </div>
    
    <div className="form-group">
      <label>Bochecha:</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="bochecha"
            value="Normais"
            checked={exameData.bochecha === "Normais"}
            onChange={(e) => handleChange('bochecha', e.target.value)}
          /> 
          Normais
        </label>
        <label>
          <input
            type="radio"
            name="bochecha"
            value="Alterados"
            checked={exameData.bochecha === "Alterados"}
            onChange={(e) => handleChange('bochecha', e.target.value)}
          /> 
          Alterados
        </label>
      </div>
    </div>

    <div className="form-group">
      <label>Língua:</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="lingua"
            value="Normais"
            checked={exameData.lingua === "Normais"}
            onChange={(e) => handleChange('lingua', e.target.value)}
          /> 
          Normais
        </label>
        <label>
          <input
            type="radio"
            name="lingua"
            value="Alterados"
            checked={exameData.lingua === "Alterados"}
            onChange={(e) => handleChange('lingua', e.target.value)}
          /> 
          Alterados
        </label>
      </div>
    </div>

    <div className="form-group">
      <label>Assoalho da boca:</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="assoalhoBoca"
            value="Normais"
            checked={exameData.assoalhoBoca === "Normais"}
            onChange={(e) => handleChange('assoalhoBoca', e.target.value)}
          /> 
          Normais
        </label>
        <label>
          <input
            type="radio"
            name="assoalhoBoca"
            value="Alterados"
            checked={exameData.assoalhoBoca === "Alterados"}
            onChange={(e) => handleChange('assoalhoBoca', e.target.value)}
          /> 
          Alterados
        </label>
      </div>
    </div>

    <div className="form-group">
      <label>Faringe Bucal:</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="faringeBucal"
            value="Normais"
            checked={exameData.faringeBucal === "Normais"}
            onChange={(e) => handleChange('faringeBucal', e.target.value)}
          /> 
          Normais
        </label>
        <label>
          <input
            type="radio"
            name="faringeBucal"
            value="Alterados"
            checked={exameData.faringeBucal === "Alterados"}
            onChange={(e) => handleChange('faringeBucal', e.target.value)}
          /> 
          Alterados
        </label>
      </div>
    </div>

    <div className="form-group">
      <label>História de Trauma Dental:</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="historiaTrauma"
            value="Não"
            checked={exameData.historiaTrauma === "Não"}
            onChange={(e) => handleChange('historiaTrauma', e.target.value)}
          /> 
          Não
        </label>
        <label>
          <input
            type="radio"
            name="historiaTrauma"
            value="Sim"
            checked={exameData.historiaTrauma === "Sim"}
            onChange={(e) => handleChange('historiaTrauma', e.target.value)}
          /> 
          Sim
        </label>
      </div>
    </div>

    <div className="form-group">
      <label>Oclusão:</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="oclusao"
            value="Normais"
            checked={exameData.oclusao === "Normais"}
            onChange={(e) => handleChange('oclusao', e.target.value)}
          /> 
          Normais
        </label>
        <label>
          <input
            type="radio"
            name="oclusao"
            value="Alterados"
            checked={exameData.oclusao === "Alterados"}
            onChange={(e) => handleChange('oclusao', e.target.value)}
          /> 
          Alterados
        </label>
      </div>
    </div>

    <div className="form-group">
      <label>Aspecto periodontal:</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="aspectoPeriodontal"
            value="Normais"
            checked={exameData.aspectoPeriodontal === "Normais"}
            onChange={(e) => handleChange('aspectoPeriodontal', e.target.value)}
          /> 
          Normais
        </label>
        <label>
          <input
            type="radio"
            name="aspectoPeriodontal"
            value="Alterados"
            checked={exameData.aspectoPeriodontal === "Alterados"}
            onChange={(e) => handleChange('aspectoPeriodontal', e.target.value)}
          /> 
          Alterados
        </label>
      </div>
    </div>

    <div className="form-group">
      <label>Fluorose:</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="fluorose"
            value="Normal"
            checked={exameData.fluorose === "Normal"}
            onChange={(e) => handleChange('fluorose', e.target.value)}
          /> 
          Normal
        </label>
        <label>
          <input
            type="radio"
            name="fluorose"
            value="Severa"
            checked={exameData.fluorose === "Severa"}
            onChange={(e) => handleChange('fluorose', e.target.value)}
          /> 
          Severa
        </label>
      </div>
    </div>


    {/* Adicione mais campos de rádio como acima */}
    
    <label>Outras Informações:
      <textarea
        value={exameData.outrasInformacoes}
        onChange={(e) => handleChange('outrasInformacoes', e.target.value)}
      />
    </label>
    
    <button type="submit">Salvar e Continuar</button>
  </div>
</form>
  </div>
</div>
  );
};

export default ExameIntraBucal;
