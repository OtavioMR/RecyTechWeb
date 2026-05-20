// types.ts

// 🔹 Endereço
export interface EnderecoInput {
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento?: string;
}

export interface Endereco extends EnderecoInput {
  id: string;
}

// 🔹 Coleta
export interface ColetaInput {
  quantidade: {
    tipo: string;       // Ex: "Plástico"
    quantidade: string; // Ex: "15Kg"
  }[];
  endereco: EnderecoInput;
}

export interface Coleta {
  id: string;
  status: "disponivel" | "em-andamento" | "concluida"; // ✅ ciclo completo
  prazo?: string;
  dataConclusao?: string;
  tiposLixo: {
    tipo: string;
    quantidade: string;
  }[];
  cidade: string;
  bairro: string;
  catador?: string; // ✅ opcional, só aparece quando coleta é aceita
}

// 🔹 Usuário
export interface Usuario {
  id: string;
  nomeCompleto: string;
  nomeUsuario: string;
  email: string;
  cpf?: string;
  telefone?: string;
}

export interface UsuarioCreate {
  nomeCompleto: string;
  email: string;
  nomeUsuario: string;
  senha: string;
}

export interface UsuarioUpdate {
  nomeCompleto?: string;
  email?: string;
  cpf?: string;
  telefone?: string;
}

// 🔹 Login
export interface LoginInput {
  email: string;
  senha: string;
}

export interface AuthResponse {
  access_token: string;
}
