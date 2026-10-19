import type { Endereco, EnderecoInput, Coleta, ColetaInput } from "../types/types";

export interface UserStorage {
  id: string;
  nomeCompleto: string;
  nomeUsuario: string;
  email: string;
  cpf?: string;
  telefone?: string;
  perfil: "cidadao" | "catador";
}

export interface DraftColeta {
  endereco?: EnderecoInput | (Endereco & { endereco?: string });
  tipos?: { id?: string; label?: string; icone?: string; tipo?: string }[];
  quantidade?: { id?: string; tipo?: string; descricao?: string; icone?: string };
}

export interface MetricsStorage {
  coletasA: number;
  coletasB: number;
  tempoMedioA: string;
  tempoMedioB: string;
}

const STORAGE_KEYS = {
  INITIALIZED: "@recytech:initialized",
  USER: "@recytech:user",
  ENDERECOS: "@recytech:enderecos",
  COLETAS: "@recytech:coletas",
  AB_VARIANT: "@recytech:ab_variant",
  DRAFT_COLETA: "@recytech:draft_coleta",
  THEME: "@recytech:theme",
  METRICS: "@recytech:metrics",
};

const DEFAULT_USER: UserStorage = {
  id: "1",
  nomeCompleto: "Visitante (Teste UX)",
  nomeUsuario: "visitante_ux",
  email: "visitante@recytech.com",
  cpf: "123.456.789-00",
  telefone: "(11) 98765-4321",
  perfil: "cidadao"
};

const DEFAULT_ENDERECOS: Endereco[] = [
  {
    id: "1",
    logradouro: "Rua das Palmeiras",
    numero: "145",
    bairro: "Centro",
    cidade: "Cotia",
    estado: "SP",
    cep: "06700-000",
    complemento: "Casa"
  },
  {
    id: "2",
    logradouro: "Av. Professor Manoel José Pedroso",
    numero: "1200",
    bairro: "Jardim Nomura",
    cidade: "Cotia",
    estado: "SP",
    cep: "06717-100",
    complemento: "Sala 4"
  }
];

const DEFAULT_COLETAS: Coleta[] = [
  {
    id: "1",
    status: "em-andamento",
    prazo: "17:00 de hoje",
    tiposLixo: [
      { tipo: "Plástico", quantidade: "15Kg (Sacola)" },
      { tipo: "Vidro", quantidade: "15Kg (Sacola)" }
    ],
    cidade: "Cotia",
    bairro: "Centro",
    endereco: {
      logradouro: "Rua das Palmeiras",
      numero: "145",
      bairro: "Centro",
      cidade: "Cotia",
      estado: "SP",
      cep: "06700-000",
      complemento: "Casa"
    },
    catador: "João Silva"
  },
  {
    id: "2",
    status: "concluida",
    dataConclusao: "Ontem às 14:30",
    tiposLixo: [
      { tipo: "Metal", quantidade: "25Kg" },
      { tipo: "Papel", quantidade: "12Kg" },
      { tipo: "Eletrônico", quantidade: "5Kg" }
    ],
    cidade: "Cotia",
    bairro: "Jardim Nomura",
    endereco: {
      logradouro: "Av. Professor Manoel José Pedroso",
      numero: "1200",
      bairro: "Jardim Nomura",
      cidade: "Cotia",
      estado: "SP",
      cep: "06717-100",
      complemento: "Sala 4"
    },
    catador: "Maria Santos"
  }
];

const DEFAULT_METRICS: MetricsStorage = {
  coletasA: 1,
  coletasB: 2,
  tempoMedioA: "1m 45s (4 telas)",
  tempoMedioB: "28s (1 tela única)"
};

export const storageService = {
  initSeedData: (force: boolean = false): void => {
    try {
      const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
      if (!isInitialized || force) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(DEFAULT_USER));
        localStorage.setItem(STORAGE_KEYS.ENDERECOS, JSON.stringify(DEFAULT_ENDERECOS));
        localStorage.setItem(STORAGE_KEYS.COLETAS, JSON.stringify(DEFAULT_COLETAS));
        localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(DEFAULT_METRICS));

        if (!localStorage.getItem(STORAGE_KEYS.AB_VARIANT)) {
          localStorage.setItem(STORAGE_KEYS.AB_VARIANT, "A");
        }
        if (!localStorage.getItem(STORAGE_KEYS.THEME)) {
          localStorage.setItem(STORAGE_KEYS.THEME, "light");
        }

        localStorage.setItem("token", "dummy-demo-token-ux-test");
        localStorage.setItem("perfil", "cidadao");
        localStorage.setItem(STORAGE_KEYS.INITIALIZED, "true");
      }
    } catch (e) {
      console.error("Erro ao inicializar localStorage:", e);
    }
  },

  // 🔹 Controle de Usuário
  getUser: (): UserStorage => {
    try {
      const u = localStorage.getItem(STORAGE_KEYS.USER);
      return u ? JSON.parse(u) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  },

  updateUser: (novo: Partial<UserStorage>): UserStorage => {
    const atual = storageService.getUser();
    const atualizado = { ...atual, ...novo };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(atualizado));
    return atualizado;
  },

  // 🔹 Endereços
  getEnderecos: (): Endereco[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ENDERECOS);
      if (!data) {
        storageService.initSeedData();
        return DEFAULT_ENDERECOS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_ENDERECOS;
    }
  },

  addEndereco: (novo: EnderecoInput): Endereco => {
    const enderecos = storageService.getEnderecos();
    const novoEndereco: Endereco = {
      ...novo,
      id: String(Date.now())
    };
    enderecos.push(novoEndereco);
    localStorage.setItem(STORAGE_KEYS.ENDERECOS, JSON.stringify(enderecos));
    return novoEndereco;
  },

  deleteEndereco: (id: string): void => {
    const enderecos = storageService.getEnderecos().filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEYS.ENDERECOS, JSON.stringify(enderecos));
  },

  // 🔹 Coletas
  getColetas: (): Coleta[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COLETAS);
      if (!data) {
        storageService.initSeedData();
        return DEFAULT_COLETAS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_COLETAS;
    }
  },

  addColeta: (dados: ColetaInput | any, variantOrigem?: "A" | "B"): Coleta => {
    const coletas = storageService.getColetas();
    
    let tiposLixoFormatados: { tipo: string; quantidade: string }[] = [];
    if (Array.isArray(dados.tiposLixo) && dados.tiposLixo.length > 0) {
      tiposLixoFormatados = dados.tiposLixo;
    } else if (Array.isArray(dados.quantidade)) {
      tiposLixoFormatados = dados.quantidade.map((q: any) => ({
        tipo: q.tipo || "Reciclável",
        quantidade: q.quantidade || "Padrão"
      }));
    } else if (Array.isArray(dados.tipos)) {
      const qtdDesc = dados.quantidade?.descricao || dados.quantidade?.tipo || "15Kg";
      tiposLixoFormatados = dados.tipos.map((t: any) => ({
        tipo: t.label || t.tipo || "Reciclável",
        quantidade: qtdDesc
      }));
    } else {
      tiposLixoFormatados = [{ tipo: "Materiais Diversos", quantidade: "1 Caixa" }];
    }

    const enderecoFinal: EnderecoInput = dados.endereco || {
      logradouro: "Rua das Palmeiras",
      numero: "145",
      bairro: "Centro",
      cidade: "Cotia",
      estado: "SP",
      cep: "06700-000",
      complemento: ""
    };

    const novaColeta: Coleta = {
      id: String(Date.now()),
      status: "em-andamento",
      prazo: `Hoje até às 18:00 (${new Date().toLocaleDateString("pt-BR")})`,
      tiposLixo: tiposLixoFormatados,
      cidade: enderecoFinal.cidade || "Cotia",
      bairro: enderecoFinal.bairro || "Centro",
      endereco: enderecoFinal,
      catador: "Aguardando catador parceiro"
    };

    const atualizadas = [novaColeta, ...coletas];
    localStorage.setItem(STORAGE_KEYS.COLETAS, JSON.stringify(atualizadas));

    // Atualiza contadores de métricas do teste A/B
    const metrics = storageService.getMetrics();
    const v = variantOrigem || storageService.getVariant();
    if (v === "B") {
      metrics.coletasB += 1;
    } else {
      metrics.coletasA += 1;
    }
    localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(metrics));

    return novaColeta;
  },

  concluirColeta: (id: string): void => {
    const coletas = storageService.getColetas().map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: "concluida" as const,
          dataConclusao: `Concluída em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`
        };
      }
      return c;
    });
    localStorage.setItem(STORAGE_KEYS.COLETAS, JSON.stringify(coletas));
  },

  cancelarColeta: (id: string): void => {
    const coletas = storageService.getColetas().filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.COLETAS, JSON.stringify(coletas));
  },

  // 🔹 Métricas do Teste
  getMetrics: (): MetricsStorage => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.METRICS);
      return data ? JSON.parse(data) : DEFAULT_METRICS;
    } catch {
      return DEFAULT_METRICS;
    }
  },

  // 🔹 Tema
  getTheme: (): "light" | "dark" => {
    return (localStorage.getItem(STORAGE_KEYS.THEME) as "light" | "dark") || "light";
  },

  setTheme: (theme: "light" | "dark"): void => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  },

  // 🔹 Rascunho da Coleta
  getDraftColeta: (): DraftColeta => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DRAFT_COLETA);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  saveDraftColeta: (draft: Partial<DraftColeta>): void => {
    const atual = storageService.getDraftColeta();
    const mesclado = { ...atual, ...draft };
    localStorage.setItem(STORAGE_KEYS.DRAFT_COLETA, JSON.stringify(mesclado));
  },

  clearDraftColeta: (): void => {
    localStorage.removeItem(STORAGE_KEYS.DRAFT_COLETA);
    localStorage.removeItem("enderecoSelecionado");
    localStorage.removeItem("tiposSelecionados");
    localStorage.removeItem("quantidadeSelecionada");
  },

  // 🔹 Teste A/B Reativo
  getVariant: (): "A" | "B" => {
    const v = localStorage.getItem(STORAGE_KEYS.AB_VARIANT);
    return v === "B" ? "B" : "A";
  },

  setVariant: (variant: "A" | "B"): void => {
    localStorage.setItem(STORAGE_KEYS.AB_VARIANT, variant);
    // Dispara evento para toda a aplicação atualizar instantaneamente
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("recytech:variant_changed", { detail: variant }));
    }
  },

  resetStorage: (): void => {
    localStorage.removeItem(STORAGE_KEYS.INITIALIZED);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.ENDERECOS);
    localStorage.removeItem(STORAGE_KEYS.COLETAS);
    localStorage.removeItem(STORAGE_KEYS.DRAFT_COLETA);
    localStorage.removeItem(STORAGE_KEYS.METRICS);
    storageService.initSeedData(true);
  }
};

if (typeof window !== "undefined") {
  storageService.initSeedData();
}
