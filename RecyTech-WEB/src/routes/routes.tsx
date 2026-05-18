import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🔹 Comuns
import Home from "../pages/comuns/paginaInicio";
import PrivateRoute from "./privateRoute";

// 🔹 Cidadão
import LoginCidadao from "../pages/cidadao/loginCidadao";
import CadastroCidadao from "../pages/cidadao/cadastroCidadao";
import EsqueciMinhaSenhaCidadao from "../pages/cidadao/esqueciMinhasenha-cidadao";

import InicioCidadao from "../pages/cidadao/inicioCidadao";
import Coleta from "../pages/cidadao/coleta";
import Conta from "../pages/cidadao/conta";
import Opcoes from "../pages/cidadao/opcoes";
import InicioTiposLixo from "../pages/cidadao/inicio_tipos_lixo";
import InicioQuantidade from "../pages/cidadao/inicio_quantidade";
import InicioSolicitarColeta from "../pages/cidadao/inicio_solicitar_coleta";

// 🔹 Catador
import LoginCatador from "../pages/catador/loginCatador";
import CadastroCatador from "../pages/catador/cadastroCatador";
import EsqueciMinhaSenhaCatador from "../pages/catador/esqueciMinhasenha-catador";
import ContaCatador from "../pages/catador/contaCatador";

// (futuro) telas protegidas do Catador
// import InicioCatador from "../pages/catador/inicioCatador";
// import MinhasColetas from "../pages/catador/minhasColetas";
// import PerfilCatador from "../pages/catador/perfilCatador";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLICAS ================= */}
        <Route path="/" element={<Home />} />
        
        {/* Cidadão */}
        <Route path="/loginCidadao" element={<LoginCidadao />} />
        <Route path="/cadastroCidadao" element={<CadastroCidadao />} />
        <Route path="/esqueciMinhasenha-cidadao" element={<EsqueciMinhaSenhaCidadao />} />

        {/* Catador */}
        <Route path="/loginCatador" element={<LoginCatador />} />
        <Route path="/cadastroCatador" element={<CadastroCatador />} />
        <Route path="/esqueciMinhasenha-catador" element={<EsqueciMinhaSenhaCatador />} />
        <Route path="/contaCatador" element={<ContaCatador />} />

        {/* ================= PROTEGIDAS ================= */}
        <Route element={<PrivateRoute />}>
          {/* Cidadão */}
          <Route path="/inicioCidadao" element={<InicioCidadao />} />
          <Route path="/coleta" element={<Coleta />} />
          <Route path="/conta" element={<Conta />} />
          <Route path="/opcoes" element={<Opcoes />} />
          <Route path="/inicioTiposLixo" element={<InicioTiposLixo />} />
          <Route path="/inicioQuantidade" element={<InicioQuantidade />} />
          <Route path="/inicioSolicitarColeta" element={<InicioSolicitarColeta />} />

          {/* Catador (futuro) */}
          {/*
          <Route path="/inicioCatador" element={<InicioCatador />} />
          <Route path="/minhasColetas" element={<MinhasColetas />} />
          <Route path="/perfilCatador" element={<PerfilCatador />} />
          */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
