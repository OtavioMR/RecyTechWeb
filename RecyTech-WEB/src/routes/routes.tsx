import { BrowserRouter, Routes, Route } from "react-router-dom";
import Teste from "../pages/Home";
import Home from "../pages/paginaInicio";
import LoginCatador from "../pages/loginCatador";
import CadastroCidadao from "../pages/cadastroCidadao";
import CadastroCatador from "../pages/cadastroCatador";
import LoginCidadao from "../pages/loginCidadao";
import InicioCidadao from "../pages/inicioCidadao";
import PrivateRoute from "./privateRoute";




export default function Router() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/loginCatador" element={<LoginCatador />} />
        <Route path="/cadastroCidadao" element={<CadastroCidadao />} />
        <Route path="/cadastroCatador" element={<CadastroCatador />} />
        <Route path="/loginCidadao" element={<LoginCidadao />} />
        <Route path="/inicioCidadao" element={<InicioCidadao />} />

        





        {/* Rotas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/teste" element={<Teste />} />
          <Route path="/inicioCidadao" element={<InicioCidadao />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
