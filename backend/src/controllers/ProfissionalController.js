const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const conn = require('../db/conn')

function buscarTodosProfissionais(req, res) {
    conn.query('SELECT * FROM profissional', (error, results) => {
      if (error) {
        console.error('Erro ao buscar profissionais:', error);
        return res.status(500).json({ mensagem: 'Erro ao buscar profissionais.' });
      }
      return res.status(200).json(results);
    });
  }
  

  function buscarProfissional(req, res) {
    const { query } = req;
    const searchQuery = query.search;
  
    if (!searchQuery) {
      return res.status(400).json({ mensagem: 'É necessário fornecer um valor para a pesquisa.' });
    }
  
    // Query SQL para buscar profissionais com nome_prof parecido com searchQuery ou cod_prof igual a searchQuery
    let queryStr = `
        SELECT * FROM profissional 
        WHERE nome_prof LIKE ? OR cod_prof LIKE ?
    `;
    let values = [`%${searchQuery}%`, `%${searchQuery}%`]; // Adiciona '%' para buscar substrings parecidas com searchQuery
  
    conn.query(queryStr, values, (error, results) => {
      if (error) {
        console.error('Erro ao buscar profissional:', error);
        return res.status(500).json({ mensagem: 'Erro ao buscar profissional.' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ mensagem: 'Profissional não encontrado.' });
      }
  
      return res.status(200).json(results);
    });
  }
  

  module.exports = {
    buscarProfissional,
    buscarTodosProfissionais
  }
