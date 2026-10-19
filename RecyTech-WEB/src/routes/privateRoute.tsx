import { Outlet } from "react-router-dom";

/**
 * Modo 100% Front-end para Apresentação e Teste A/B:
 * Não bloqueia nenhuma rota nem redireciona para login.
 */
const PrivateRoute = () => {
    return <Outlet />;
};

export default PrivateRoute;