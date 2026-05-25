// src/routes/appRoutes.ts

// Rotas do Cidadão
export const routesMapCidadao: Record<string, string> = {
  inicio: "/inicioCidadao",
  opcoes: "/opcoes",
  coleta: "/coleta",
  conta: "/conta",
  inicioTiposLixo: "/inicioTiposLixo",
  inicioQuantidade: "/inicioQuantidade",
  inicioSolicitarColeta: "/inicioSolicitarColeta"
};

// Rotas do Catador
export const routesMapCatador: Record<string, string> = {
  inicio: "/inicioCatador",
  minhasColetas: "/minhasColetas",
  conta: "/contaCatador"
};
