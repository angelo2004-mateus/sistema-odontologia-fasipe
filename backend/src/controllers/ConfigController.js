const multer = require('multer');
const path = require('path');
const fs = require('fs');
const conn = require('../db/conn');  // Conexão com o banco de dados

// Configuração do multer para salvar arquivos na pasta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    // Verifica se a pasta 'uploads' existe; se não, cria a pasta
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

function salvarConfiguracao(req, res) {
  const { color, logoId } = req.body; // Obtém a cor e logoId enviados
  const file = req.file; // O arquivo enviado será salvo em 'req.file'

  console.log(file)
  let filePath = null;

  if (file) {
    // Se houver um arquivo de logo novo, usamos o caminho do arquivo
    filePath = file.path; // Salva o caminho do arquivo
  } else if (logoId === "null" && !file) {
    // Se logoId for null e não houver arquivo, significa que não foi alterado
    return res.status(400).json({ message: 'Nenhuma imagem ou logo enviado.' });
  } else {
    // Se logoId não for null, significa que o logo não foi alterado
    // Nesse caso, mantemos o logo atual no banco, ou seja, passamos o logoId
    filePath = logoId;
  }

  let query = logoId === "null"
    ? 'INSERT INTO configuracoes (cor, logo) VALUES (?, ?)' // Insere nova configuração
    : 'UPDATE configuracoes SET cor = ?, logo = ? WHERE id = ?'; // Atualiza a configuração existente

  let params;

  if(logoId == null) {
    params = [color, filePath]
  } else {
    params = [color, filePath, logoId];
  }

  if(!file || file == null) {
    query = 'UPDATE configuracoes SET cor = ? WHERE id = ?'
  }

  conn.query(query, params, (error, results) => {
    if (error) {
      console.error('Erro ao salvar configuração:', error);
      return res.status(500).json({ message: 'Erro ao salvar configuração.' });
    }

    res.status(200).json({
      message: 'Configuração salva com sucesso!',
      filePath: filePath, // Retorna o caminho do arquivo salvo ou o logo atual
    });
  });
}


// Função para obter as configurações do banco de dados
function obterConfiguracao(req, res) {
  const query = 'SELECT * FROM configuracoes ORDER BY created_at DESC LIMIT 1'; // Obtém a última configuração salva
  
  conn.query(query, (error, results) => {
    if (error) {
      console.error('Erro ao obter configuração:', error);
      return res.status(500).json({ message: 'Erro ao obter configuração.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Nenhuma configuração encontrada.' });
    }

    // Retorna as configurações encontradas
    res.status(200).json(results[0]); // Retorna apenas a última configuração
  });
}

module.exports = {
  salvarConfiguracao,
  obterConfiguracao, // Incluindo novamente a função de obter configuração
  upload, // Exporta o middleware para uso nos roteadores
};
