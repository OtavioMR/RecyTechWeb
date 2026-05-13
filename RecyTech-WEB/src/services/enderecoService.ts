import { api } from "./api";
import type { EnderecoInput, Endereco } from "../types/types";

export const enderecoService = {
  // 🔹 Buscar endereços do usuário logado
  listarMeus: async (): Promise<Endereco[]> => {
    const response = await api.get("/endereco-usuario/meus-enderecos");
    return response.data;
  },

  // 🔹 Criar novo endereço
  criar: async (dados: EnderecoInput): Promise<Endereco> => {
    const response = await api.post("/endereco-usuario", dados);
    return response.data;
  }
};
