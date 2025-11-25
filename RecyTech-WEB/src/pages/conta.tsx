import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../style/conta.css";
import { api } from "../services/api";

export default function Conta() {
  // ---------------------------------------------------------------------------
  // ESTADOS: INFORMAÇÕES DO USUÁRIO
  // ---------------------------------------------------------------------------
  const [nomeCompleto, setNome] = useState("");
  const [emailUsuario, setEmail] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [cpf, setCPF] = useState("");
  const [telefone, setTelefone] = useState("");

  // ---------------------------------------------------------------------------
  // ESTADOS: FORMULÁRIO DE ENDEREÇO
  // ---------------------------------------------------------------------------
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

  // Atualiza qualquer campo do formulário
  const handleInputChange = (campo: string, valor: string) => {
    setNovoEndereco((prev) => ({ ...prev, [campo]: valor }));
  };

  // ---------------------------------------------------------------------------
  // BUSCAR DADOS DO USUÁRIO LOGADO
  // ---------------------------------------------------------------------------
  async function handleDados() {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/usuario/usuario-logado", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = response.data;

      setNome(data.nomeCompleto);
      setNomeUsuario(data.nomeUsuario);
      setEmail(data.dadosUsuario.emailUsuario);
      setCPF(data.dadosUsuario.cpf);
      setTelefone(data.dadosUsuario.telefone);

    } catch (error) {
      console.error("Erro ao buscar cidadão!", error);
    }
  }

  // Carrega os dados ao iniciar a página
  useEffect(() => {
    handleDados();
  }, []);

  // ---------------------------------------------------------------------------
  // SALVAR NOVO ENDEREÇO NO BACK-END
  // ---------------------------------------------------------------------------
  async function handleAdicionarEndereco() {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...novoEndereco,
        usuario: { id: 64 } // depois substitui pelo usuário real logado
      };

      await api.post("/endereco-usuario", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

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

      // Fecha o formulário
      setMostrarFormEndereco(false);

    } catch (error) {
      console.error("Erro ao adicionar endereço:", error);
      alert("Erro ao salvar endereço.");
    }
  }

  // ---------------------------------------------------------------------------
  // RENDERIZAÇÃO
  // ---------------------------------------------------------------------------
  return (
    <div className="app-layout">
      {/* Sidebar fixa */}
      <Sidebar
        onMenuSelect={() => {}}
        activeMenu="conta"
        onToggle={() => {}}
      />

      <main className="main-content">
        <div className="content-area container-fluid px-0">

          {/* Título do app */}
          <div className="nomeApp mb-3 ps-0">
            <h1 className="m-0">RecyTech</h1>
          </div>

          {/* Título da seção */}
          <div className="mb-4">
            <h2 className="titulo-conta">Minha Conta</h2>
          </div>

          {/* Container principal */}
          <div className="conta-container">

            {/* Informações Pessoais */}
            <div className="info-section">

              <h3 className="subtitulo">Informações Pessoais</h3>

              <div className="info-item">
                <label className="info-label">Nome Completo</label>
                <div className="info-box">
                  <span className="info-value">{nomeCompleto}</span>
                </div>
              </div>

              <div className="info-item">
                <label className="info-label">Nome de usuário</label>
                <div className="info-box">
                  <span className="info-value">{nomeUsuario}</span>
                </div>
                <span className="info-observacao">
                  nome de usuário não poderá ser alterado
                </span>
              </div>

              <div className="info-item">
                <label className="info-label">CPF</label>
                <div className="info-box">
                  <span className="info-value">{cpf}</span>
                </div>
              </div>

              <div className="info-item">
                <label className="info-label">Email</label>
                <div className="info-box">
                  <span className="info-value">{emailUsuario}</span>
                </div>
              </div>

              <div className="info-item">
                <label className="info-label">Telefone</label>
                <div className="info-box">
                  <span className="info-value">{telefone}</span>
                </div>
              </div>

              {/* Botão de abrir formulário */}
              {!mostrarFormEndereco && (
                <button
                  className="btn-adicionar-endereco"
                  onClick={() => setMostrarFormEndereco(true)}
                >
                  + Adicionar Endereço
                </button>
              )}

              {/* Formulário de endereço */}
              {mostrarFormEndereco && (
                <div className="form-endereco">

                  <h4 className="subtitulo-form">Adicionar Novo Endereço</h4>

                  <input
                    type="text"
                    placeholder="Logradouro"
                    className="form-input"
                    value={novoEndereco.logradouro}
                    onChange={(e) =>
                      handleInputChange("logradouro", e.target.value)
                    }
                  />

                  <input
                    type="text"
                    placeholder="Número"
                    className="form-input"
                    value={novoEndereco.numero}
                    onChange={(e) =>
                      handleInputChange("numero", e.target.value)
                    }
                  />

                  <input
                    type="text"
                    placeholder="Bairro"
                    className="form-input"
                    value={novoEndereco.bairro}
                    onChange={(e) =>
                      handleInputChange("bairro", e.target.value)
                    }
                  />

                  <input
                    type="text"
                    placeholder="Cidade"
                    className="form-input"
                    value={novoEndereco.cidade}
                    onChange={(e) =>
                      handleInputChange("cidade", e.target.value)
                    }
                  />

                  <input
                    type="text"
                    placeholder="Estado"
                    className="form-input"
                    value={novoEndereco.estado}
                    onChange={(e) =>
                      handleInputChange("estado", e.target.value)
                    }
                  />

                  <input
                    type="text"
                    placeholder="CEP"
                    className="form-input"
                    value={novoEndereco.cep}
                    onChange={(e) =>
                      handleInputChange("cep", e.target.value)
                    }
                  />

                  <input
                    type="text"
                    placeholder="Complemento (opcional)"
                    className="form-input"
                    value={novoEndereco.complemento}
                    onChange={(e) =>
                      handleInputChange("complemento", e.target.value)
                    }
                  />

                  <div className="botoes-form">
                    <button
                      className="btn-cancelar"
                      onClick={() => setMostrarFormEndereco(false)}
                    >
                      Cancelar
                    </button>

                    <button
                      className="btn-adicionar"
                      onClick={handleAdicionarEndereco}
                    >
                      Adicionar Endereço
                    </button>
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
