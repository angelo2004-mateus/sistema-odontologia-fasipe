const express = require('express');
const app = express();
const cors = require('cors');
const conn = require('./src/db/conn');

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const { cadastrarPaciente, buscarTodosPacientes, buscarPaciente } = require('./src/controllers/PacienteController');
const { cadastrarAnamnese, listarAnamnese, pesquisarAnamnese } = require('./src/controllers/AnamneseController');
const PlanoTratamentoController = require('./src/controllers/PlanoTratamentoController'); 
const { buscarTodosProfissionais, buscarProfissional } = require('./src/controllers/ProfissionalController');


app.post('/paciente/cadastrar', cadastrarPaciente);
app.get('/paciente/todos_pacientes', buscarTodosPacientes); 
app.get('/paciente/buscar', buscarPaciente);
//app.delete('/paciente/deletar', deletarPaciente);

app.get('/profissional/todos_profissionais', buscarTodosProfissionais);
app.get('/profissional/buscar_profissional', buscarProfissional);

  
app.post('/paciente/cadastrarAnamnese', cadastrarAnamnese);
app.get('/anamnese/listar', listarAnamnese);
app.get('/anamnese/pesquisar', pesquisarAnamnese);
app.use('/plano-tratamento', PlanoTratamentoController); 
 
 
const env = process.env.NODE_ENV;
const { port } = require(`./src/config/config.${env}.json`);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
