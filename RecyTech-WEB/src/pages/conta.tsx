import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../style/conta.css";
import { api } from "../services/api";

interface Endereco {
  id: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento?: string;
}

export default function Conta() {
  // ---------------------------------------------------------------------------
  // ESTADOS: INFORMAÇÕES DO USUÁRIO
  // ---------------------------------------------------------------------------
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [nomeCompleto, setNome] = useState("");
  const [emailUsuario, setEmail] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [cpf, setCPF] = useState("");
  const [telefone, setTelefone] = useState("");

  // ---------------------------------------------------------------------------
  // ESTADOS: ENDEREÇOS
  // ---------------------------------------------------------------------------
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [mostrarFormEndereco, setMostrarFormEndereco] = useState(false);

  const [novoEndereco, setNovoEndereco] = useState({
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    complemento: ""
  });

  const handleInputChange = (campo: string, valor: string) => {
    setNovoEndereco((prev) => ({ ...prev, [campo]: valor }));
  };

  // ---------------------------------------------------------------------------
  // BUSCAR DADOS DO USUÁRIO LOGADO
  // ---------------------------------------------------------------------------
  async function handleDados() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Usuário logado
      const response = await api.get("/usuario/usuario-logado", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = response.data;
      setUsuarioId(data.id);
      setNome(data.nomeCompleto);
      setNomeUsuario(data.nomeUsuario);
      setEmail(data.dadosUsuario.emailUsuario);
      setCPF(data.dadosUsuario.cpf);
      setTelefone(data.dadosUsuario.telefone);

      // Endereços do usuário
      const responseEnderecos = await api.get("/endereco-usuario/meus-enderecos", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const dadosEnderecos = Array.isArray(responseEnderecos.data)
        ? responseEnderecos.data
        : [responseEnderecos.data];

      setEnderecos(dadosEnderecos);

    } catch (error) {
      console.error("Erro ao buscar usuário/endereço!", error);
    }
  }

  useEffect(() => {
    handleDados();
  }, []);

  // ---------------------------------------------------------------------------
  // ADICIONAR NOVO ENDEREÇO
  // ---------------------------------------------------------------------------
  async function handleAdicionarEndereco() {
    if (!usuarioId) {
      alert("ID do usuário não carregado ainda. Tente novamente.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const payload = {
        ...novoEndereco,
        usuario: { id: usuarioId } // Agora funciona de verdade
      };

      const response = await api.post("/endereco-usuario", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Atualiza lista de endereços localmente
      const enderecoSalvo: Endereco = response.data;
      setEnderecos((prev) => [...prev, enderecoSalvo]);

      alert("Endereço cadastrado com sucesso!");

      // Limpa formulário
      setNovoEndereco({
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
        complemento: ""
      });
      setMostrarFormEndereco(false);

    } catch (error) {
      console.error("Erro ao adicionar endereço:", error);
      alert("Erro ao salvar endereço.");
    }
  }

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <div className="app-layout">
      <Sidebar onMenuSelect={() => {}} activeMenu="conta" onToggle={() => {}} />

      <main className="main-content">
        <div className="content-area container-fluid px-0">

          <div className="nomeApp mb-3 ps-0">
            <h1 className="m-0">RecyTech</h1>
          </div>

          <div className="mb-4">
            <h2 className="titulo-conta">Minha Conta</h2>
          </div>

          <div className="conta-container">

            {/* Informações pessoais */}
            <div className="info-section">
              <h3 className="subtitulo">Informações Pessoais</h3>

              <div className="info-item">
                <label className="info-label">Nome Completo</label>
                <div className="info-box">{nomeCompleto}</div>
              </div>

              <div className="info-item">
                <label className="info-label">Nome de usuário</label>
                <div className="info-box">{nomeUsuario}</div>
                <span className="info-observacao">
                  nome de usuário não poderá ser alterado
                </span>
              </div>

              <div className="info-item">
                <label className="info-label">CPF</label>
                <div className="info-box">{cpf}</div>
              </div>

              <div className="info-item">
                <label className="info-label">Email</label>
                <div className="info-box">{emailUsuario}</div>
              </div>

              <div className="info-item">
                <label className="info-label">Telefone</label>
                <div className="info-box">{telefone}</div>
              </div>
            </div>

            {/* Endereços */}
            <div className="info-section">
              <h3 className="subtitulo">Endereços Cadastrados</h3>

              {enderecos.map((endereco) => (
                <div key={endereco.id} className="endereco-card">
                  <strong>{endereco.logradouro}, {endereco.numero}</strong>
                  <br />
                  {endereco.bairro} - {endereco.cidade}/{endereco.estado}
                  <br />
                  CEP: {endereco.cep}
                  {endereco.complemento && <><br />Complemento: {endereco.complemento}</>}
                </div>
              ))}

              {/* Botão de adicionar */}
              {!mostrarFormEndereco && (
                <button className="btn-adicionar-endereco" onClick={() => setMostrarFormEndereco(true)}>
                  + Adicionar Endereço
                </button>
              )}

              {/* Formulário */}
              {mostrarFormEndereco && (
                <div className="form-endereco">
                  <h4 className="subtitulo-form">Adicionar Novo Endereço</h4>

                  {["logradouro","numero","bairro","cidade","estado","cep","complemento"].map((campo) => (
                    <input
                      key={campo}
                      type="text"
                      placeholder={campo === "complemento" ? "Complemento (opcional)" : campo.charAt(0).toUpperCase() + campo.slice(1)}
                      className="form-input"
                      value={(novoEndereco as any)[campo]}
                      onChange={(e) => handleInputChange(campo, e.target.value)}
                    />
                  ))}

                  <div className="botoes-form">
                    <button className="btn-cancelar" onClick={() => setMostrarFormEndereco(false)}>Cancelar</button>
                    <button className="btn-adicionar" onClick={handleAdicionarEndereco}>Adicionar Endereço</button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
