import { api } from "../comuns/api";
import type {
  Catador,
  CatadorCreate,
  CatadorUpdate,
  LoginInput,
  AuthResponse,
  Coleta
} from "../../types/types";

export const catadorService = {
  // 🟢 CADASTRO
  criar: async (data: CatadorCreate): Promise<Catador> => {
    const response = await api.post("/catador/create", data);
    return response.data;
  },

  // 🟡 LOGIN
  login: async (data: LoginInput): Promise<AuthResponse> => {
    const res = await api.post("/catador/login", data);
    return res.data;
  },

  // 🟡 BUSCAR catador logado
  me: async (): Promise<Catador> => {
    const res = await api.get("/catador/me");
    return res.data;
  },

  // 🔵 ATUALIZAR catador
  atualizar: async (data: CatadorUpdate): Promise<Catador> => {
    const res = await api.patch("/catador", data);
    return res.data;
  },

  // 🔹 ESQUECI MINHA SENHA
  recuperarSenha: async (payload: { email: string }): Promise<{ message: string }> => {
    const res = await api.post("/catador/esqueci-senha", payload);
    return res.data;
  },

  // 🔹 REDEFINIR SENHA
  redefinirSenha: async (payload: { token: string; novaSenha: string }): Promise<{ message: string }> => {
    const res = await api.post("/catador/redefinir-senha", payload);
    return res.data;
  },

  // 🔹 LISTAR COLETAS DISPONÍVEIS
  listarColetasDisponiveis: async (): Promise<Coleta[]> => {
    const res = await api.get("/catador/coletas?status=disponivel");
    return res.data;
  },

  // 🔹 ACEITAR UMA COLETA
  aceitarColeta: async (id: string): Promise<Coleta> => {
    const res = await api.post(`/catador/coletas/${id}/aceitar`);
    return res.data;
  },

  // 🔹 LISTAR COLETAS DO CATADOR
  listarMinhasColetas: async (): Promise<Coleta[]> => {
    const res = await api.get("/catador/coletas/me");
    return res.data;
  },

  // 🔹 CONCLUIR UMA COLETA
  concluirColeta: async (id: string): Promise<Coleta> => {
    const res = await api.post(`/catador/coletas/${id}/concluir`);
    return res.data;
  }
};
