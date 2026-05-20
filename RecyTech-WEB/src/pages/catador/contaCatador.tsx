import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar.tsx";
import { routesMapCatador } from "../../routes/routesMap.ts";
import "../../style/cidadao/conta.css";
import { catadorService } from "../../services/catador/catadorService.ts";
import { enderecoService } from "../../services/cidadao/enderecoService.ts";
import type { Endereco, EnderecoInput } from "../../types/types.ts";

export default function contaCatador() {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("conta");

  // Usuário
  const [usuario, setUsuario] = useState<any>(null);

  // Endereços
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [mostrarFormEndereco, setMostrarFormEndereco] = useState(false);
  const [novoEndereco, setNovoEndereco] = useState<EnderecoInput>({
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    complemento: "",
  });

  const [loading, setLoading] = useState(true);

  // 🔹 Carregar dados do usuário e endereços
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [user, end] = await Promise.all([
          catadorService.me(),
          enderecoService.listarMeus(),
        ]);
        setUsuario(user);
        setEnderecos(end);
      } catch (err) {
        console.error("Erro ao carregar conta:", err);
      } finally {
        setLoading(false);
      }
    };
    carregarDados();
  }, []);

  // 🔹 Navegação SPA (agora alinhada com Sidebar)
  const handleMenuSelect = (menu: string) => {
    setActiveMenu(menu);
    if (routesMapCatador[menu]) navigate(routesMapCatador[menu]);
  };

  const handleSidebarToggle = (collapsed: boolean) => {
    console.log("Sidebar:", collapsed);
  };

  // 🔹 Endereço
  const handleInputChange = (campo: string, valor: string) => {
    setNovoEndereco((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleAdicionarEndereco = async () => {
    try {
      await enderecoService.criar(novoEndereco);
      const atualizados = await enderecoService.listarMeus();
      setEnderecos(atualizados);
      setNovoEndereco({
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
        complemento: "",
      });
      setMostrarFormEndereco(false);
      alert("Endereço cadastrado com sucesso!");
    } catch (err) {
      console.error("Erro ao adicionar endereço:", err);
      alert("Erro ao salvar endereço.");
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="app-layout">
      <Sidebar
        onMenuSelect={handleMenuSelect}
        activeMenu={activeMenu}
        onToggle={handleSidebarToggle}
      />

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
                <div className="info-box">{usuario?.nomeCompleto}</div>
              </div>
              <div className="info-item">
                <label className="info-label">Nome de usuário</label>
                <div className="info-box">{usuario?.nomeUsuario}</div>
                <span className="info-observacao">
                  nome de usuário não poderá ser alterado
                </span>
              </div>
              <div className="info-item">
                <label className="info-label">CPF</label>
                <div className="info-box">
                  {usuario?.cpf || "Não informado"}
                </div>
              </div>
              <div className="info-item">
                <label className="info-label">Email</label>
                <div className="info-box">{usuario?.email}</div>
              </div>
              <div className="info-item">
                <label className="info-label">Telefone</label>
                <div className="info-box">
                  {usuario?.telefone || "Não informado"}
                </div>
              </div>

              <div className="info-item">
                <label className="info-label">Tipo de transporte</label>
                <select
                  name="transporte"
                  className="usuario-input w-100"
                  value={usuario?.transporte || ""}
                  onChange={(e) =>
                    setUsuario((prev: any) => ({
                      ...prev,
                      transporte: e.target.value,
                    }))
                  }
                >
                  <option value="" disabled>
                    Selecione o transporte
                  </option>
                  <option value="Carrinho de mão">Carrinho de mão</option>
                  <option value="Carro">Carro</option>
                  <option value="Caminhão">Caminhão</option>
                </select>
              </div>
            </div>

            {/* Endereços */}
            <div className="info-section">
              <h3 className="subtitulo">Endereço Cadastrado</h3>
              {enderecos.map((endereco) => (
                <div key={endereco.id} className="endereco-card">
                  <strong>
                    {endereco.logradouro}, {endereco.numero}
                  </strong>
                  <br />
                  {endereco.bairro} - {endereco.cidade}/{endereco.estado}
                  <br />
                  CEP: {endereco.cep}
                  {endereco.complemento && (
                    <>
                      <br />
                      Complemento: {endereco.complemento}
                    </>
                  )}
                </div>
              ))}

              {mostrarFormEndereco && (
                <div className="form-endereco">
                  <h4 className="subtitulo-form">Adicionar Novo Endereço</h4>
                  {[
                    "logradouro",
                    "numero",
                    "bairro",
                    "cidade",
                    "estado",
                    "cep",
                    "complemento",
                  ].map((campo) => (
                    <input
                      key={campo}
                      type="text"
                      placeholder={
                        campo === "complemento"
                          ? "Complemento (opcional)"
                          : campo.charAt(0).toUpperCase() + campo.slice(1)
                      }
                      className="form-input"
                      value={(novoEndereco as any)[campo]}
                      onChange={(e) => handleInputChange(campo, e.target.value)}
                    />
                  ))}
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
