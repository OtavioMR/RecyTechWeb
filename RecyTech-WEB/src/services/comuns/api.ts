import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000",
});

// 🔐 Adiciona token automaticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers?.set("Authorization", `Bearer ${token}`);
    }
    return config;
});

// 🚨 Trata erro global (token inválido/expirado)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");

            const perfil = localStorage.getItem("perfil");
            if (perfil === "catador") {
                window.location.href = "/loginCatador";
            } else {
                window.location.href = "/loginCidadao";
            }
        }
        return Promise.reject(error);
    }
);
