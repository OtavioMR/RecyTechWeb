import { api } from "./api";
import type { Usuario, UsuarioCreate, UsuarioUpdate } from "../types/types";

export const usuarioService = {
  // 🟢 CADASTRO
  criar: async (data: UsuarioCreate): Promise<Usuario> => {
    const response = await api.post("/usuario/create", data);
    return response.data;
  },

  // 🟡 BUSCAR usuário logado (perfil / conta)
  me: async (): Promise<Usuario> => {
    const res = await api.get("/auth/me");
    return res.data;
  },

  // 🔵 ATUALIZAR usuário (perfil / conta)
  atualizar: async (data: UsuarioUpdate): Promise<Usuario> => {
    const res = await api.patch("/usuario", data);
    return res.data;
  }
};
