const express = require("express");
const app = express();
const cors = require("cors");
const conn = require("./src/db/conn");
const path = require("path");

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
  cadastrarPaciente,
  buscarTodosPacientes,
  buscarPaciente,
  deletarPaciente,
  atualizarPaciente,
  buscarTodosPacientesDeletados,
} = require("./src/controllers/PacienteController");
const {
  cadastrarAnamnese,
  listarAnamnese,
  pesquisarAnamnese,
} = require("./src/controllers/AnamneseController");
const PlanoTratamentoController = require("./src/controllers/PlanoTratamentoController");
const {
  buscarTodosProfissionais,
  buscarProfissional,
} = require("./src/controllers/ProfissionalController");
const {
  salvarConfiguracao,
  upload,
  obterConfiguracao,
} = require("./src/controllers/ConfigController");

// Importando as funções de configuração

// Rotas de Pacientes
app.post("/paciente/cadastrar", cadastrarPaciente);
app.get("/paciente/todos_pacientes", buscarTodosPacientes);
app.get("/paciente/todos_pacientes_deletados", buscarTodosPacientesDeletados);
app.get("/paciente/buscar", buscarPaciente);
app.put("/paciente/deletar/:cpf_pac", deletarPaciente);
app.put("/paciente/atualizar/:cod_pac", atualizarPaciente);

// Rotas de Profissionais
app.get("/profissional/todos_profissionais", buscarTodosProfissionais);
app.get("/profissional/buscar_profissional", buscarProfissional);

// Rotas de Anamnese
app.post("/paciente/cadastrarAnamnese", cadastrarAnamnese);
app.get("/anamnese/listar", listarAnamnese);
app.get("/anamnese/pesquisar", pesquisarAnamnese);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.post("/config/salvar", upload.single("logoFile"), salvarConfiguracao);
app.get("/config/obter", obterConfiguracao);

// Rotas
// Plano de Tratamento
app.use("/plano-tratamento", PlanoTratamentoController);

const env = process.env.NODE_ENV;
const { port } = require(`./src/config/config.${env}.json`);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
