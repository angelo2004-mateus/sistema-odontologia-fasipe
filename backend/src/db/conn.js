// Importe o módulo 'mysql2'
const mysql = require('mysql2');

require('dotenv').config()

const env = process.env.NODE_ENV
const config = require(`../config/config.${env}.json`)

const connection = mysql.createConnection({
  host: config.host, 
  user: config.user_database, 
  password: config.user_password, 
  database: config.name_database 
});


connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida com o banco de dados.');
});

module.exports = connection;
