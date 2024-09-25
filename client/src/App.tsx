import { BrowserRouter, Route, Routes } from "react-router-dom";
import './global.css'
import CustomerList from "./pages/CustomerList";
import BaseLayout from "./components/layout/BaseLayout";


function App() {
  return (
    <BrowserRouter>
    <BaseLayout>
      <Routes>
          <Route path="/" element={<CustomerList />} />
        </Routes>
    </BaseLayout>
      
    </BrowserRouter>
  );
}

export default App;
