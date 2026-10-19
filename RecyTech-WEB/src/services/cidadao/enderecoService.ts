import { storageService } from "../storageService";
import type { EnderecoInput, Endereco } from "../../types/types";

export const enderecoService = {
  // 🔹 Buscar endereços do usuário logado
  listarMeus: async (): Promise<Endereco[]> => {
    return storageService.getEnderecos();
  },

  // 🔹 Criar novo endereço
  criar: async (dados: EnderecoInput): Promise<Endereco> => {
    return storageService.addEndereco(dados);
  }
};
