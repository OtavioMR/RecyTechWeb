import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000",
});

// 🔐 Envia token automaticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// 🚨 Trata erro global (token inválido/expirado)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/loginCidadao";
        }
        return Promise.reject(error);
    }
);

/*  Flexibilidade de redirecionamento  
Se no futuro você tiver login de catador e cidadão separados, pode ser útil redirecionar para rotas diferentes dependendo do contexto. Hoje está fixo em /loginCidadao.
api.interceptors.request.use((config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        };
    }
    return config;
});
*/