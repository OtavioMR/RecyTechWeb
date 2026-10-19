import { api } from "../comuns/api";
import type { Usuario, UsuarioCreate, UsuarioUpdate, LoginInput, AuthResponse } from "../../types/types";

export const cidadaoService = {
  // 🟢 CADASTRO
  criar: async (data: UsuarioCreate): Promise<Usuario> => {
    const response = await api.post("/cidadao/create", data);
    return response.data;
  },

  // 🟡 LOGIN
  login: async (data: LoginInput): Promise<AuthResponse> => {
    const res = await api.post("/cidadao/login", data);
    return res.data;
  },

  // 🟡 BUSCAR cidadão logado (100% LocalStorage / Demo)
  me: async (): Promise<Usuario> => {
    return {
      id: "1",
      nomeCompleto: "Visitante (Teste UX)",
      nomeUsuario: "visitante_ux",
      email: "visitante@recytech.com",
      cpf: "123.456.789-00",
      telefone: "(11) 98765-4321"
    };
  },

  // 🔵 ATUALIZAR cidadão
  atualizar: async (data: UsuarioUpdate): Promise<Usuario> => {
    const res = await api.patch("/cidadao", data);
    return res.data;
  },

  // 🔹 ESQUECI MINHA SENHA
  recuperarSenha: async (payload: { email: string }): Promise<{ message: string }> => {
    const res = await api.post("/cidadao/esqueci-senha", payload);
    return res.data;
  },

  // 🔹 REDEFINIR SENHA (opcional, se existir no back-end)
  redefinirSenha: async (payload: { token: string; novaSenha: string }): Promise<{ message: string }> => {
    const res = await api.post("/cidadao/redefinir-senha", payload);
    return res.data;
  }
};
