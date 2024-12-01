import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiUser } from 'react-icons/fi';
import './AnamneseDente.scss';

const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

const CadastroDentes = () => {
  const { cpf_pac } = useParams();
  const navigate = useNavigate();
  const [anm_dente, setSelectedTeeth] = useState([...upperTeeth, ...lowerTeeth]);

  useEffect(() => {
    // Carrega dados salvos do localStorage, se existirem
    const previousData = JSON.parse(localStorage.getItem(`anamneseDente_${cpf_pac}`));
    if (previousData && previousData.length > 0) {
      setSelectedTeeth(previousData);
    }
  }, [cpf_pac]);

  const handleCheckboxChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setSelectedTeeth((prevSelectedTeeth) =>
      prevSelectedTeeth.includes(value)
        ? prevSelectedTeeth.filter((tooth) => tooth !== value)
        : [...prevSelectedTeeth, value]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem(`anamneseDente_${cpf_pac}`, JSON.stringify(anm_dente));
    toast.success('Marcações de dentes salvas com sucesso!');
    navigate(`/periograma/${cpf_pac}`);
  };

  return (
    <section className='container_cadastro_paciente'>
      <div className='container_button_form'>
        <div className='title'>
          <span className='icon'><FiUser /></span>
          <h2>Cadastro Dente</h2>
        </div>
        <div className="backgroundImageContainer">
          <form onSubmit={handleSubmit} className="checkboxForm">
            <div className="teethRow">
              {upperTeeth.map((number) => (
                <div key={number} className="checkboxContainer">
                  <label>
                    <input
                      type="checkbox"
                      value={number}
                      checked={anm_dente.includes(number)}
                      onChange={handleCheckboxChange}
                    />
                    {number}
                  </label>
                </div>
              ))}
            </div>
            <div className="teethRow">
              {lowerTeeth.map((number) => (
                <div key={number} className="checkboxContainer">
                  <label>
                    <input
                      type="checkbox"
                      value={number}
                      checked={anm_dente.includes(number)}
                      onChange={handleCheckboxChange}
                    />
                    {number}
                  </label>
                </div>
              ))}
            </div>
            <button type="submit" className="btn">
              Enviar
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default CadastroDentes;
