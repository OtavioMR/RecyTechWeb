import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🔹 Comuns
import Home from "../pages/comuns/paginaInicio";
import PrivateRoute from "./privateRoute";
import ABTestToolbar from "../components/ABTestToolbar";

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
import FluxoRapidoAB from "../pages/cidadao/fluxoRapidoAB";

// 🔹 Catador
import LoginCatador from "../pages/catador/loginCatador";
import CadastroCatador from "../pages/catador/cadastroCatador";
import EsqueciMinhaSenhaCatador from "../pages/catador/esqueciMinhasenha-catador";
import ContaCatador from "../pages/catador/contaCatador";
import InicioCatador from "../pages/catador/inicioCatador";
import MinhasColetas from "../pages/catador/minhasColetas";
import OpcoesCatador from "../pages/catador/opcoesCatador";

export default function Router() {
  return (
    <BrowserRouter>
      {/* Barra Flutuante de Controle do Teste A/B e Reset de Dados */}
      <ABTestToolbar />

      <Routes>
        {/* ================= PUBLICAS ================= */}
        <Route path="/" element={<Home />} />

        {/* Cidadão */}
        <Route path="/loginCidadao" element={<LoginCidadao />} />
        <Route path="/cadastroCidadao" element={<CadastroCidadao />} />
        <Route path="/esqueciMinhasenha-cidadao" element={<EsqueciMinhaSenhaCidadao />} />
        
        {/* Fluxo Variante A (Etapas) */}
        <Route path="/inicioCidadao" element={<InicioCidadao />} />
        <Route path="/inicioTiposLixo" element={<InicioTiposLixo />} />
        <Route path="/inicioQuantidade" element={<InicioQuantidade />} />
        <Route path="/inicioSolicitarColeta" element={<InicioSolicitarColeta />} />

        {/* Fluxo Variante B (Tela Única Otimizada) */}
        <Route path="/solicitar-coleta-rapida" element={<FluxoRapidoAB />} />
        <Route path="/solicitarColetaRapida" element={<FluxoRapidoAB />} />

        {/* Telas Gerais do Cidadão */}
        <Route path="/coleta" element={<Coleta />} />
        <Route path="/conta" element={<Conta />} />
        <Route path="/opcoes" element={<Opcoes />} />

        {/* Catador */}
        <Route path="/loginCatador" element={<LoginCatador />} />
        <Route path="/cadastroCatador" element={<CadastroCatador />} />
        <Route path="/esqueciMinhasenha-catador" element={<EsqueciMinhaSenhaCatador />} />
        <Route path="/contaCatador" element={<ContaCatador />} />
        <Route path="/opcoesCatador" element={<OpcoesCatador />} />
        <Route path="/inicioCatador" element={<InicioCatador />} />
        <Route path="/minhasColetas" element={<MinhasColetas />} />

        {/* ================= PROTEGIDAS (Destravadas) ================= */}
        <Route element={<PrivateRoute />} />
      </Routes>
    </BrowserRouter>
  );
}