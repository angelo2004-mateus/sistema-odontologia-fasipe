const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const conn = require("../db/conn");
const { result } = require("lodash");

function cadastrarPaciente(req, res) {
  const {
    cpf_pac,
    nome_pac,
    cod_pac,
    tel_pac,
    cep_pac,
    logra_pac,
    num_logra_pac,
    compl_pac,
    bairro_pac,
    cidade_pac,
    uf_pac,
    rg_pac,
    est_rg_pac,
    nome_mae_pac,
    data_nasc_pac,
  } = req.body;

  if (!cpf_pac) {
    return res.status(400).json({ message: "CPF é obrigatório." });
  }

  if (!nome_pac) {
    return res.status(400).json({ message: "Nome é obrigatório." });
  }

  if (!cod_pac) {
    return res.status(400).json({ message: "Código é obrigatório." });
  }

  if (!tel_pac) {
    return res.status(400).json({ message: "Telefone é obrigatório." });
  }

  if (!data_nasc_pac) {
    return res
      .status(400)
      .json({ message: "Data de nascimento é obrigatória." });
  }

  // Formatar a data para o formato YYYY-MM-DD
  const formattedDataNasc = new Date(data_nasc_pac).toISOString().split("T")[0];

  conn.query(
    "SELECT * FROM paciente WHERE cpf_pac = ? or cod_pac = ?",
    [cpf_pac, cod_pac],
    (error, results) => {
      if (results.length > 0) {
        return res
          .status(400)
          .json({ message: "Este CPF ou código já está cadastrado." });
      }

      if (error) {
        console.error("Erro ao verificar CPF:", error);
        return res.status(500).json({ message: "Erro ao cadastrar paciente." });
      }

      conn.query(
        "INSERT INTO paciente SET ?",
        {
          cpf_pac,
          nome_pac,
          cod_pac,
          tel_pac,
          cep_pac,
          logra_pac,
          num_logra_pac,
          compl_pac,
          bairro_pac,
          cidade_pac,
          uf_pac,
          rg_pac,
          est_rg_pac,
          nome_mae_pac,
          data_nasc_pac: formattedDataNasc, // Use a data formatada aqui
          isDeleted: false,
        },
        (error, results) => {
          if (error) {
            console.error("Erro ao cadastrar paciente:", error);
            return res
              .status(500)
              .json({ message: "Erro ao cadastrar paciente." });
          }

          return res
            .status(201)
            .json({ message: "Paciente cadastrado com sucesso." });
        }
      );
    }
  );
}

function buscarTodosPacientes(req, res) {
  // Ajuste na consulta para verificar que `isDeleted` é NULL ou 0
  conn.query(
    "SELECT * FROM paciente WHERE isDeleted IS NULL OR isDeleted = false",
    (error, results) => {
      if (error) {
        console.error("Erro ao buscar pacientes:", error);
        return res.status(500).json({ message: "Erro ao buscar pacientes." });
      }
      console.log(results);
      return res.status(200).json(results);
    }
  );
}

function buscarTodosPacientesDeletados(req, res) {
  // Ajuste na consulta para verificar que `isDeleted` é NULL ou 0
  conn.query(
    "SELECT * FROM paciente WHERE isDeleted = true",
    (error, results) => {
      if (error) {
        console.error("Erro ao buscar pacientes:", error);
        return res.status(500).json({ message: "Erro ao buscar pacientes." });
      }
      return res.status(200).json(results);
    }
  );
}

function buscarPaciente(req, res) {
  const { query } = req;
  const searchQuery = query.search;

  if (!searchQuery) {
    return res
      .status(400)
      .json({ message: "É necessário fornecer um valor para a pesquisa." });
  }

  let queryStr = `
      SELECT * FROM paciente 
      WHERE nome_pac LIKE ? OR cod_pac LIKE ? AND isDeleted = false
  `;
  let values = [`%${searchQuery}%`, `%${searchQuery}%`];

  conn.query(queryStr, values, (error, results) => {
    if (error) {
      console.error("Erro ao buscar paciente:", error);
      return res.status(500).json({ message: "Erro ao buscar paciente." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Paciente não encontrado." });
    }

    return res.status(200).json(results);
  });
}

function deletarPaciente(req, res) {
  const { cpf_pac } = req.params;
  const { deletionReason } = req.body; // Razão da exclusão recebida no corpo da requisição

  if (!cpf_pac) {
    return res.status(400).json({ message: "CPF é um parâmetro obrigatório." });
  }

  if (!deletionReason) {
    return res
      .status(400)
      .json({ message: "A razão para exclusão é obrigatória." });
  }

  // Verifica se o paciente existe
  conn.query(
    "SELECT * FROM paciente WHERE cpf_pac = ?",
    [cpf_pac],
    (error, results) => {
      if (error) {
        console.error("Erro ao verificar CPF:", error);
        return res.status(500).json({ message: "Erro ao verificar paciente." });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Paciente não encontrado." });
      }

      // Atualiza o registro para exclusão lógica
      conn.query(
        "UPDATE paciente SET isDeleted = ?, deletionReason = ? WHERE cpf_pac = ?",
        [1, deletionReason, cpf_pac],
        (error, results) => {
          if (error) {
            console.error("Erro ao realizar exclusão lógica:", error);
            return res
              .status(500)
              .json({ message: "Erro ao excluir paciente." });
          }

          return res
            .status(200)
            .json({ message: "Paciente marcado como excluído com sucesso." });
        }
      );
    }
  );
}

function atualizarPaciente(req, res) {
  const { cod_pac } = req.params; // Receber o código do paciente pelo parâmetro da rota
  const {
    cpf_pac,
    nome_pac,
    tel_pac,
    cep_pac,
    logra_pac,
    num_logra_pac,
    compl_pac,
    bairro_pac,
    cidade_pac,
    uf_pac,
    rg_pac,
    est_rg_pac,
    nome_mae_pac,
    data_nasc_pac,
  } = req.body;

  if (!cod_pac) {
    return res
      .status(400)
      .json({ message: "Código do paciente é obrigatório." });
  }

  // Formatar a data para o formato YYYY-MM-DD
  const formattedDataNasc = data_nasc_pac
    ? new Date(data_nasc_pac).toISOString().split("T")[0]
    : null;

  // Verifica se o paciente existe
  conn.query(
    "SELECT * FROM paciente WHERE cod_pac = ?",
    [cod_pac],
    (error, results) => {
      if (error) {
        console.error("Erro ao verificar paciente:", error);
        return res.status(500).json({ message: "Erro ao verificar paciente." });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Paciente não encontrado." });
      }

      // Atualizar os dados do paciente
      conn.query(
        `UPDATE paciente SET 
            nome_pac = ?, 
            tel_pac = ?, 
            cep_pac = ?, 
            logra_pac = ?, 
            num_logra_pac = ?, 
            compl_pac = ?, 
            bairro_pac = ?, 
            cidade_pac = ?, 
            uf_pac = ?, 
            rg_pac = ?, 
            est_rg_pac = ?, 
            nome_mae_pac = ?, 
            data_nasc_pac = ? 
          WHERE cod_pac = ?`,
        [
          nome_pac,
          tel_pac,
          cep_pac,
          logra_pac,
          num_logra_pac,
          compl_pac,
          bairro_pac,
          cidade_pac,
          uf_pac,
          rg_pac,
          est_rg_pac,
          nome_mae_pac,
          formattedDataNasc,
          cod_pac,
        ],
        (error, results) => {
          if (error) {
            console.error("Erro ao atualizar paciente:", error);
            return res
              .status(500)
              .json({ message: "Erro ao atualizar paciente." });
          }

          return res
            .status(200)
            .json({ message: "Paciente atualizado com sucesso." });
        }
      );
    }
  );
}

module.exports = {
  cadastrarPaciente,
  buscarPaciente,
  buscarTodosPacientes,
  deletarPaciente,
  atualizarPaciente,
  buscarTodosPacientesDeletados,
};
