import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number; // timestamp de expiração
}

export const useTokenWatcher = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const decoded = jwtDecode<JwtPayload>(token); // <--- aqui
        const now = Date.now() / 1000; // timestamp em segundos
        if (decoded.exp < now) {
          localStorage.removeItem("token");
          navigate("/loginCidadao");
        }
      } catch (e) {
        // token inválido
        localStorage.removeItem("token");
        navigate("/loginCidadao");
      }
    }, 1000); // checa a cada 1 segundo

    return () => clearInterval(interval);
  }, [navigate]);
};
