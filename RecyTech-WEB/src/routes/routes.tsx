import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/paginaInicio";
import LoginCatador from "../pages/loginCatador";
import CadastroCidadao from "../pages/cadastroCidadao";
import CadastroCatador from "../pages/cadastroCatador";
import LoginCidadao from "../pages/loginCidadao";

import InicioCidadao from "../pages/inicioCidadao";
import Coleta from "../pages/coleta";
import Conta from "../pages/conta";

import InicioTiposLixo from "../pages/inicio_tipos_lixo";
import InicioQuantidade from "../pages/inicio_quantidade";
import InicioSolicitarColeta from "../pages/inicio_solicitar_coleta";
import Opcoes from "../pages/opcoes";

import EsqueciMinhaSenhaCidadao from "../pages/esqueciMinhasenha-cidadao";
import EsqueciMinhaSenhaCatador from "../pages/esqueciMinhasenha-catador";

import PrivateRoute from "./privateRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLICAS ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/loginCatador" element={<LoginCatador />} />
        <Route path="/cadastroCidadao" element={<CadastroCidadao />} />
        <Route path="/cadastroCatador" element={<CadastroCatador />} />
        <Route path="/loginCidadao" element={<LoginCidadao />} />
        <Route path="/esqueciMinhasenha-catador" element={<EsqueciMinhaSenhaCatador />} />
        <Route path="/esqueciMinhasenha-cidadao" element={<EsqueciMinhaSenhaCidadao />} />

        {/* ================= PROTEGIDAS ================= */}
        <Route element={<PrivateRoute />}>
          <Route path="/inicioCidadao" element={<InicioCidadao />} />
          <Route path="/coleta" element={<Coleta />} />
          <Route path="/conta" element={<Conta />} />
          <Route path="/opcoes" element={<Opcoes />} />
          <Route path="/inicioTiposLixo" element={<InicioTiposLixo />} />
          <Route path="/inicioQuantidade" element={<InicioQuantidade />} />
          <Route path="/inicioSolicitarColeta" element={<InicioSolicitarColeta />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}