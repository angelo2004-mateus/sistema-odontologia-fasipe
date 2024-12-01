import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Periograma.scss';

const Periograma = () => {
  const { cpf_pac } = useParams();
  const navigate = useNavigate();
  const [dadosPeriograma, setDadosPeriograma] = useState({});

  useEffect(() => {
    // Obtém os dentes selecionados no CadastroDentes
    const selectedTeeth = JSON.parse(localStorage.getItem(`anamneseDente_${cpf_pac}`)) || [];

    // Inicializa o estado apenas com os dentes marcados
    const initialData = selectedTeeth.reduce((acc, tooth) => {
      acc[tooth] = {
        faces: { V: '', M: '', D: '', P: '' },
        mobilidade: '',
        furca: '',
        recessao: '',
      };
      return acc;
    }, {});

    setDadosPeriograma({ dentes: initialData });
  }, [cpf_pac]);

  const handleInputChange = (dente, field, value) => {
    const [fieldGroup, fieldName] = field.split('.');
    setDadosPeriograma((prevState) => {
      if (fieldGroup === 'faces') {
        return {
          ...prevState,
          dentes: {
            ...prevState.dentes,
            [dente]: {
              ...prevState.dentes[dente],
              faces: {
                ...prevState.dentes[dente].faces,
                [fieldName]: value,
              },
            },
          },
        };
      } else {
        return {
          ...prevState,
          dentes: {
            ...prevState.dentes,
            [dente]: {
              ...prevState.dentes[dente],
              [fieldGroup]: value,
            },
          },
        };
      }
    });
  };

  const handleSave = (event) => {
    event.preventDefault();

    // Preparar os dados do periograma
    const periogramaDados = {
      cpf_pac,
      dentes: dadosPeriograma.dentes,
    };

    // Salvar no localStorage
    localStorage.setItem(`periograma_${cpf_pac}`, JSON.stringify(periogramaDados));

    // Navegar para a próxima página
    navigate(`/plano-tratamento/${cpf_pac}`);
  };

  return (
    <div className="periograma-container">
      <h2>Preencher Periograma</h2>
      <div className="arcada-superior-direita">
        <h3>Arcada Superior Direita</h3>
        {Object.keys(dadosPeriograma.dentes || {}).map((dente) => (
          <div key={dente} className="dente-row">
            <h4>Dente {dente}</h4>
            <div className="faces">
              <label>Vestibular (V): 
                <input
                  type="text"
                  value={dadosPeriograma.dentes[dente].faces.V}
                  onChange={(e) => handleInputChange(dente, 'faces.V', e.target.value)}
                />
              </label>
              <label>Mesial (M): 
                <input
                  type="text"
                  value={dadosPeriograma.dentes[dente].faces.M}
                  onChange={(e) => handleInputChange(dente, 'faces.M', e.target.value)}
                />
              </label>
              <label>Distal (D): 
                <input
                  type="text"
                  value={dadosPeriograma.dentes[dente].faces.D}
                  onChange={(e) => handleInputChange(dente, 'faces.D', e.target.value)}
                />
              </label>
              <label>Lingual (P): 
                <input
                  type="text"
                  value={dadosPeriograma.dentes[dente].faces.P}
                  onChange={(e) => handleInputChange(dente, 'faces.P', e.target.value)}
                />
              </label>
            </div>
            <div className="detalhes">
              <label>Mobilidade: 
                <input
                  type="text"
                  value={dadosPeriograma.dentes[dente].mobilidade}
                  onChange={(e) => handleInputChange(dente, 'mobilidade', e.target.value)}
                />
              </label>
              <label>Furca: 
                <input
                  type="text"
                  value={dadosPeriograma.dentes[dente].furca}
                  onChange={(e) => handleInputChange(dente, 'furca', e.target.value)}
                />
              </label>
              <label>Recessão: 
                <input
                  type="text"
                  value={dadosPeriograma.dentes[dente].recessao}
                  onChange={(e) => handleInputChange(dente, 'recessao', e.target.value)}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSave} className="btn">
        Salvar e Continuar
      </button>
    </div>
  );
};

export default Periograma;
