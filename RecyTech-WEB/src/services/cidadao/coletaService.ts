import { storageService } from "../storageService";
import type { ColetaInput, Coleta } from "../../types/types";

export const coletaService = {
  // 🔹 Criar solicitação de coleta no localStorage
  criar: async (data: ColetaInput | any): Promise<Coleta> => {
    return storageService.addColeta(data);
  },

  // 🔹 Listar todas (admin/debug)
  listar: async (): Promise<Coleta[]> => {
    return storageService.getColetas();
  },

  // 🔹 Buscar coletas do usuário logado
  listarMinhas: async (): Promise<Coleta[]> => {
    return storageService.getColetas();
  }
};
