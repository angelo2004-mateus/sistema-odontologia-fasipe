import { BrowserRouter, Route, Routes } from "react-router-dom";
import './global.css'
import CustomerList from "./pages/CustomerList";
import BaseLayout from "./components/layout/BaseLayout";
import ProfissionalList from "./pages/ProfissionalList";
import AnamneseList from "./pages/AnamneseList";
import Dashboard from "./pages/Dashboard";
import CadastroAnamnese from "./pages/CadastroAnamnese.jsx"
import ExameIntraBucal from "./pages/ExameIntraBucal";
import AnamneseDente from "./pages/AnamneseDente";
import Periograma from "./pages/Periograma";
import PlanoTratamento from "./pages/PlanoTratamento";


function App() {
  return (
    <BrowserRouter>
    <BaseLayout>
      <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/paciente" element={<CustomerList />} />
          <Route path="/profissional" element={<ProfissionalList />} />
          <Route path="/anamnese" element={<AnamneseList />} />
          <Route path="/paciente/cadastroAnamnese" element={<CadastroAnamnese />} />
          <Route path="/exameintrabucal/:cpf_pac" element={<ExameIntraBucal />} />
          <Route path="/cadastro-dentes/:cpf_pac" element={<AnamneseDente />} />
          <Route path="/periograma/:cpf_pac" element={<Periograma />} />
          <Route path="/plano-tratamento/:cpf_pac" element={<PlanoTratamento />} />

        </Routes>
    </BaseLayout>
      
    </BrowserRouter>
  );
}

export default App;
