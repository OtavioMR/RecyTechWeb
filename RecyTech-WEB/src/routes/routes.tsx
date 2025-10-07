import { BrowserRouter, Routes, Route } from "react-router-dom";
import Teste from "../pages/Home";
import Home from "../pages/paginaInicio";
import LoginCatador from "../pages/loginCatador";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/teste" element={<Teste />} />
        <Route path="/" element={<Home />} />
        <Route path="/loginCatador" element={<LoginCatador />} />
      </Routes>
    </BrowserRouter>
  );
}
