import { api } from "./api";
import type { LoginInput, AuthResponse, Usuario } from "../types/types";

// 🔹 Login usuário cidadão
export const loginCidadao = async (data: LoginInput): Promise<AuthResponse> => {
    const response = await api.post("/auth/login/usuario", data);
    return response.data;
};

// 🔹 Login catador
export const loginCatador = async (data: LoginInput): Promise<AuthResponse> => {
    const response = await api.post("/auth/catador/login", data);
    return response.data;
};

// 🔹 Pegar usuário logado (token válido)
export const getMe = async (): Promise<Usuario> => {
    const response = await api.get("/auth/me");
    return response.data;
};
