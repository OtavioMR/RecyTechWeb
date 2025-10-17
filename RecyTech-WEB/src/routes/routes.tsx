import { BrowserRouter, Routes, Route } from "react-router-dom";
import Teste from "../pages/Home";
import Home from "../pages/paginaInicio";
import LoginCatador from "../pages/loginCatador";
import CadastroCidadao from "../pages/cadastroCidadao";
import LoginCidadao from "../pages/loginCidadao";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/teste" element={<Teste />} />
        <Route path="/" element={<Home />} />
        <Route path="/loginCatador" element={<LoginCatador />} />
        <Route path="/cadastroCidadao" element={<CadastroCidadao />} />
        <Route path="/loginCidadao" element={<LoginCidadao />} />
      </Routes>
    </BrowserRouter>
  );
}
