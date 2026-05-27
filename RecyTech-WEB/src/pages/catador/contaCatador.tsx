import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { routesMapCatador } from "../../routes/routesMap";
import "../../style/catador/contaCatador.css";
import { catadorService } from "../../services/catador/catadorService";
import type { Catador, CatadorUpdate } from "../../types/types";

export default function ContaCatador() {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("conta");
  const [usuario, setUsuario] = useState<Catador | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Carregar dados do catador
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const user = await catadorService.me();
        setUsuario(user);
      } catch (err) {
        console.error("Erro ao carregar conta:", err);
      } finally {
        setLoading(false);
      }
    };
    carregarDados();
  }, []);

  // 🔹 Navegação SPA
  const handleMenuSelect = (menu: string) => {
    setActiveMenu(menu);
    if (routesMapCatador[menu]) navigate(routesMapCatador[menu]);
  };

  // 🔹 Atualizar transporte
  const handleTransporteChange = async (valor: number) => {
    try {
      const atualizado = await catadorService.atualizar({ transporte: valor } as CatadorUpdate);
      setUsuario(atualizado);
      alert("Transporte atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar transporte:", err);
      alert("Erro ao salvar transporte.");
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        onMenuSelect={handleMenuSelect}
        activeMenu={activeMenu}
        onToggle={(collapsed) => console.log("Sidebar collapsed:", collapsed)}
        perfil="catador"
      />

      <main className="main-content">
        <div className="content-area container-fluid px-0">
          <div className="nomeApp mb-3 ps-0">
            <h1 className="m-0">RecyTech</h1>
          </div>

          <div className="mb-4">
            <h2 className="titulo-conta">Minha Conta</h2>
          </div>

          {loading ? (
            <p>Carregando...</p>
          ) : (
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
                  <div className="info-box">{usuario?.cpf || "Não informado"}</div>
                </div>
                <div className="info-item">
                  <label className="info-label">Email</label>
                  <div className="info-box">{usuario?.email}</div>
                </div>
                <div className="info-item">
                  <label className="info-label">Telefone</label>
                  <div className="info-box">{usuario?.telefone || "Não informado"}</div>
                </div>

                <div className="info-item">
                  <label className="info-label">Tipo de transporte</label>
                  <select
                    name="transporte"
                    className="usuario-input w-100"
                    value={usuario?.transporte ?? ""}
                    onChange={(e) => handleTransporteChange(parseInt(e.target.value, 10))}
                  >
                    <option value="" disabled>Selecione o transporte</option>
                    <option value={1}>Carrinho de mão</option>
                    <option value={2}>Carro</option>
                    <option value={3}>Caminhão</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
