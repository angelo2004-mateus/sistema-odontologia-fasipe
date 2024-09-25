const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const conn = require('../db/conn');

function cadastrarAnamnese(req, res) {
    const {
        cpf_pac, anm_nome, anm_idade, anm_sexo, anm_rg, anm_estado_saude, anm_trata_med, cod_prof,
        anm_med_uso, anm_ult_visita_med, anm_trata_antes, anm_proced_cir, anm_doenca_familiar,
        anm_possui_alergia, anm_outras_nfo, anm_motivo_consulta, anm_motv_visita_dent, anm_term_tratamento,
        anm_sangramento_gengival, anm_boca, anm_hab_bucais, anm_dores_face, anm_respiracao,
        anm_degluticao, anm_assimetria, anm_atm, anm_linfonodos, anm_musculos, anm_fonacao, anm_ult_visita_dent
    } = req.body;

    // Verifica se todos os campos obrigatórios estão presentes
    if (!cpf_pac || !anm_nome || !anm_idade || !anm_sexo || !anm_rg || !anm_motivo_consulta) {
        return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    // Verifica se o paciente já está cadastrado na tabela de pacientes
    conn.query('SELECT * FROM paciente WHERE cpf_pac = ?', [cpf_pac], (error, results) => {
        if (error) {
            console.error('Erro ao verificar CPF:', error);
            return res.status(500).json({ mensagem: 'Erro ao verificar paciente.' });
        }

        if (results.length === 0) {
            return res.status(400).json({ mensagem: 'Paciente não encontrado.' });
        }

        // Verifica se a anamnese já está cadastrada
        conn.query('SELECT * FROM anamnese_odonto WHERE cpf_pac = ?', [cpf_pac], (error, results) => {
            if (error) {
                console.error('Erro ao verificar anamnese:', error);
                return res.status(500).json({ mensagem: 'Erro ao cadastrar anamnese.' });
            }

            if (results.length > 0) {
                return res.status(400).json({ mensagem: 'Anamnese já cadastrada para este paciente.' });
            }

            // Insere a anamnese no banco de dados
            const anamneseData = {
                cpf_pac, anm_nome, anm_idade, anm_sexo, anm_rg, anm_estado_saude, anm_trata_med, cod_prof,
                anm_med_uso, anm_ult_visita_med, anm_trata_antes, anm_proced_cir, anm_doenca_familiar,
                anm_possui_alergia, anm_outras_nfo, anm_motivo_consulta, anm_motv_visita_dent, anm_term_tratamento,
                anm_sangramento_gengival, anm_boca, anm_hab_bucais, anm_dores_face, anm_respiracao,
                anm_degluticao, anm_assimetria, anm_atm, anm_linfonodos, anm_musculos, anm_fonacao, anm_ult_visita_dent
            };

            conn.query('INSERT INTO anamnese_odonto SET ?', anamneseData, (error, results) => {
                if (error) {
                    console.error('Erro ao cadastrar anamnese:', error);
                    return res.status(500).json({ mensagem: 'Erro ao cadastrar anamnese.' });
                }

                return res.status(201).json({ mensagem: 'Anamnese cadastrada com sucesso.' });
            });
        });
    });
}

function listarAnamnese (req, res) {
    conn.query('SELECT * FROM anamnese_odonto', (error, results) => {
        if (error) {
            console.error('Erro ao buscar pacientes:', error);
            return res.status(500).json({ mensagem: 'Erro ao buscar pacientes.' });
        }
        return res.status(200).json(results);
    });
}

function pesquisarAnamnese(req, res) {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ mensagem: 'Query de pesquisa não fornecida.' });
    }

    const searchQuery = `
        SELECT * FROM anamnese_odonto
        WHERE cpf_pac LIKE ? OR anm_nome LIKE ?
    `;
    const queryParams = [`%${query}%`, `%${query}%`];

    conn.query(searchQuery, queryParams, (error, results) => {
        if (error) {
            console.error('Erro ao buscar anamneses:', error);
            return res.status(500).json({ mensagem: 'Erro ao buscar anamneses.' });
        }
        return res.status(200).json(results);
    });
}



module.exports = {
    cadastrarAnamnese,
    listarAnamnese,
    pesquisarAnamnese
};