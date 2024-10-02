import { BrowserRouter, Route, Routes } from "react-router-dom";
import './global.css'
import CustomerList from "./pages/CustomerList";
import BaseLayout from "./components/layout/BaseLayout";
import ProfissionalList from "./pages/ProfissionalList";
import AnamneseList from "./pages/AnamneseList";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <BrowserRouter>
    <BaseLayout>
      <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/paciente" element={<CustomerList />} />
          <Route path="/profissional" element={<ProfissionalList />} />
          <Route path="/anamnese" element={<AnamneseList />} />
        </Routes>
    </BaseLayout>
      
    </BrowserRouter>
  );
}

export default App;
