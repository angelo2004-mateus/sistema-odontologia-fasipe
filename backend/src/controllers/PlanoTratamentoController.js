const express = require('express');
const router = express.Router();
const conn = require('../db/conn');

router.post('/:cpf_pac', (req, res) => {
  const {
    cpf_pac, anm_nome, anm_idade, anm_sexo, anm_rg, anm_motivo_consulta, anm_ult_visita_dent,
    anm_ult_visita_med, anm_motv_visita_dent, anm_estado_saude, anm_med_uso, anm_dores_face,
    anm_possui_alergia, anm_proced_cir, anm_trata_med, anm_trata_antes, anm_term_tratamento,
    anm_doenca_familiar, anm_hab_bucais, anm_fonacao, anm_degluticao, anm_respiracao, anm_boca,
    anm_assimetria, anm_musculos, anm_linfonodos, anm_atm, anm_sangramento_gengival, anm_outras_nfo,
    cod_prof, planejamento_proced, sessao_proced, teste3, dentes
  } = req.body;

  console.log('Dados recebidos:', req.body);

  if (!cpf_pac || !anm_nome || !sessao_proced || !planejamento_proced) {
    return res.status(400).json({ mensagem: 'Dados inválidos' });
  }

  const anamneseData = {
    cpf_pac, anm_nome, anm_idade, anm_sexo, anm_rg, anm_motivo_consulta, anm_ult_visita_dent,
    anm_ult_visita_med, anm_motv_visita_dent, anm_estado_saude, anm_med_uso, anm_dores_face,
    anm_possui_alergia, anm_proced_cir, anm_trata_med, anm_trata_antes, anm_term_tratamento,
    anm_doenca_familiar, anm_hab_bucais, anm_fonacao, anm_degluticao, anm_respiracao, anm_boca,
    anm_assimetria, anm_musculos, anm_linfonodos, anm_atm, anm_sangramento_gengival, anm_outras_nfo,
    cod_prof, anm_dente: JSON.stringify(dentes)
  };

  const TratamentoData = {
    cpf_pac, planejamento_proced, sessao_proced
  };

  console.log('Dados de anamnese:', anamneseData);
  console.log('Dados de tratamento:', TratamentoData);

  conn.beginTransaction((err) => {
    if (err) {
      console.error('Erro ao iniciar transação:', err);
      return res.status(500).json({ mensagem: 'Erro ao iniciar transação.' });
    }

    conn.query('INSERT INTO anamnese_odonto SET ?', anamneseData, (error, results) => {
      if (error) {
        return conn.rollback(() => {
          console.error('Erro ao cadastrar anamnese:', error);
          res.status(500).json({ mensagem: 'Erro ao cadastrar anamnese.' });
        });
      }

      conn.query('INSERT INTO planotratamento SET ?', TratamentoData, (error, results) => {
        if (error) {
          return conn.rollback(() => {
            console.error('Erro ao cadastrar plano de tratamento:', error);
            res.status(500).json({ mensagem: 'Erro ao cadastrar plano de tratamento.' });
          });
        }

        conn.commit((err) => {
          if (err) {
            return conn.rollback(() => {
              console.error('Erro ao confirmar transação:', err);
              res.status(500).json({ mensagem: 'Erro ao confirmar transação.' });
            });
          }

          res.status(201).json({ mensagem: 'Dados cadastrados com sucesso.' });
        });
      });
    });
  });
});

module.exports = router;
