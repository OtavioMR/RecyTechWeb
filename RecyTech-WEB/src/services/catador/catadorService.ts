import { api } from "../comuns/api";
import type { Usuario, UsuarioCreate, UsuarioUpdate, LoginInput, AuthResponse, Coleta } from "../../types/types";

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
  },

  // 🔹 LISTAR COLETAS DISPONÍVEIS
  // O back-end deve retornar apenas coletas com status = "disponivel"
  listarColetasDisponiveis: async (): Promise<Coleta[]> => {
    const res = await api.get("/catador/coletas?status=disponivel");
    return res.data;
  },

  // 🔹 ACEITAR UMA COLETA
  // Ao aceitar, o back-end deve atualizar o status para "em-andamento"
  // e registrar o catador que pegou a coleta
  aceitarColeta: async (id: string): Promise<Coleta> => {
    const res = await api.post(`/catador/coletas/${id}/aceitar`);
    return res.data;
  },

  // 🔹 LISTAR COLETAS DO CATADOR
  // Para a futura tela coletaCatador.tsx
  // Aqui o back-end deve retornar coletas com status "em-andamento" ou "concluida"
  listarMinhasColetas: async (): Promise<Coleta[]> => {
    const res = await api.get("/catador/coletas/me");
    return res.data;
  },

  // 🔹 CONCLUIR UMA COLETA
  // Para quando o catador finalizar a coleta
  concluirColeta: async (id: string): Promise<Coleta> => {
    const res = await api.post(`/catador/coletas/${id}/concluir`);
    return res.data;
  }
};
