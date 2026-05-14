import { api } from "../comuns/api";
import type { Usuario, UsuarioCreate, UsuarioUpdate, LoginInput, AuthResponse } from "../../types/types";

export const catadorService = {
  // 🟢 CADASTRO
  criar: async (data: UsuarioCreate): Promise<Usuario> => {
    const response = await api.post("/catador/create", data);
    return response.data;
  },

  // 🟡 LOGIN
  login: async (data: LoginInput): Promise<AuthResponse> => {
    const res = await api.post("/catador/login", data);
    return res.data;
  },

  // 🟡 BUSCAR catador logado
  me: async (): Promise<Usuario> => {
    const res = await api.get("/catador/me");
    return res.data;
  },

  // 🔵 ATUALIZAR catador
  atualizar: async (data: UsuarioUpdate): Promise<Usuario> => {
    const res = await api.patch("/catador", data);
    return res.data;
  },

  // 🔹 ESQUECI MINHA SENHA
  recuperarSenha: async (payload: { email: string }): Promise<{ message: string }> => {
    const res = await api.post("/catador/esqueci-senha", payload);
    return res.data;
  },

  // 🔹 REDEFINIR SENHA (opcional, se existir no back-end)
  redefinirSenha: async (payload: { token: string; novaSenha: string }): Promise<{ message: string }> => {
    const res = await api.post("/catador/redefinir-senha", payload);
    return res.data;
  }
};
