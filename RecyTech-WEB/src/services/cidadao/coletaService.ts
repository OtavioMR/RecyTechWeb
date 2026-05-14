import { api } from "../comuns/api";
import type { ColetaInput, Coleta } from "../../types/types";

export const coletaService = {
  // 🔹 Criar solicitação de coleta
  criar: async (data: ColetaInput): Promise<Coleta> => {
    const response = await api.post("/coleta", data);
    return response.data;
  },

  // 🔹 Listar todas (admin/debug)
  listar: async (): Promise<Coleta[]> => {
    const response = await api.get("/coleta");
    return response.data;
  },

  // 🔹 Buscar coletas do usuário logado
  listarMinhas: async (): Promise<Coleta[]> => {
    const response = await api.get("/coleta/minhas");
    return response.data;
  }
};
