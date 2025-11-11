import { BrowserRouter, Routes, Route } from "react-router-dom";
import Teste from "../pages/Home";
import Home from "../pages/paginaInicio";
import LoginCatador from "../pages/loginCatador";
import CadastroCidadao from "../pages/cadastroCidadao";
import CadastroCatador from "../pages/cadastroCatador";
import LoginCidadao from "../pages/loginCidadao";
import InicioCidadao from "../pages/inicioCidadao";
import PrivateRoute from "./privateRoute";



import LixoCatador from "../pages/lixo";
import InicioTiposLixo from "../pages/inicio_tipos_lixo";
import InicioQuantidade from "../pages/inicio_quantidade";

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
        <Route path="/rodrigo/lixoCatador" element={<LixoCatador/>} />
        <Route path="/inicioCidadao" element={<InicioCidadao />} />
        <Route path="/InicioTiposLixo" element={<InicioTiposLixo />} />
        <Route path="/inicioQuantidade" element={<InicioQuantidade />} />



        {/* Rotas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/teste" element={<Teste />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
