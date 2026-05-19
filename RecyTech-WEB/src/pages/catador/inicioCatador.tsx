import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import "../../style/catador/inicioCatador.css";
import type { Coleta } from "../../types/types";
import { routesMapCatador } from "../../routes/routesMap";
import { lixoMap } from "../../utils/lixoMap";
// import { catadorService } from "../../services/catador/catadorService"; // ✅ futuro backend

// 🔹 Tipo local para UI
interface ColetaDisponivel extends Coleta {
  expandida: boolean;
}

export default function InicioCatador() {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("inicio");
  const [coletas, setColetas] = useState<ColetaDisponivel[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Buscar coletas disponíveis
  useEffect(() => {
    const carregarColetas = async () => {
      try {
        // ✅ Futuro: consumir API
        // const response = await catadorService.listarColetasDisponiveis();
        // setColetas(response.filter(c => c.status === "disponivel"));

        // 🔹 Mock temporário
        const data: ColetaDisponivel[] = [
          {
            id: "1",
            status: "disponivel", // ✅ só aparece aqui porque está disponível
            prazo: "17:00",
            tiposLixo: [{ tipo: "Metal", quantidade: "50Kg" }],
            cidade: "São Paulo",
            bairro: "Centro",
            expandida: false,
          },
          {
            id: "2",
            status: "disponivel",
            prazo: "19:00",
            tiposLixo: [{ tipo: "Plástico", quantidade: "15Kg" }],
            cidade: "Osasco",
            bairro: "Jardim América",
            expandida: false,
          },
          {
            id: "3",
            status: "disponivel",
            prazo: "18:00",
            tiposLixo: [{ tipo: "Papel", quantidade: "+50Kg" }],
            cidade: "São Paulo",
            bairro: "Vila Verde",
            expandida: false,
          },
          {
            id: "4",
            status: "disponivel",
            prazo: "16:00",
            tiposLixo: [
              { tipo: "Eletrônico", quantidade: "5Kg" },
              { tipo: "Vidro", quantidade: "8Kg" },
            ],
            cidade: "Barueri",
            bairro: "Bom Retiro",
            expandida: false,
          },
        ];

        // 🔹 Filtra apenas coletas disponíveis
        setColetas(data.filter((c) => c.status === "disponivel"));
      } catch (err) {
        console.error("Erro ao buscar coletas disponíveis:", err);
      } finally {
        setLoading(false);
      }
    };

    carregarColetas();
  }, []);

  // 🔹 Navegação SPA
  const handleMenuSelect = (menu: string) => {
    setActiveMenu(menu);
    if (routesMapCatador[menu]) navigate(routesMapCatador[menu]);
  };

  // 🔹 Expandir/recolher card
  const toggleExpansao = (id: string) => {
    setColetas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, expandida: !c.expandida } : c))
    );
  };

  // 🔹 Aceitar coleta — dispara API e remove da lista
  const handleAceitarColeta = async (id: string) => {
    try {
      // ✅ Futuro: chamar API
      // await catadorService.aceitarColeta(id);

      // 🔹 Remove da lista local (não é mais "disponivel")
      setColetas((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Erro ao aceitar coleta:", err);
    }
  };

  // 🔹 Recusar coleta — apenas fecha o card expandido
  const handleRecusarColeta = (id: string) => {
    setColetas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, expandida: false } : c))
    );
  };

  return (
    <div className="app-layout">
      <Sidebar
        onMenuSelect={handleMenuSelect}
        activeMenu={activeMenu}
        onToggle={(collapsed) => console.log("Sidebar collapsed:", collapsed)}
      />

      <main className="conteudo">
        <div className="content-area container-fluid px-0">
          <h1 className="m-0">RecyTech</h1>

          {loading ? (
            <div className="loading-spinner">Carregando coletas disponíveis...</div>
          ) : coletas.length === 0 ? (
            <p className="nenhuma-coleta">
              😊 Nenhuma coleta disponível no momento. Volte mais tarde!
            </p>
          ) : (
            <div className="coletas-container">
              {coletas.map((coleta) => (
                <div
                  key={coleta.id}
                  className={`coleta-card-catador ${coleta.expandida ? "expandida" : ""}`}
                  style={{
                    backgroundColor:
                      lixoMap[coleta.tiposLixo[0].tipo]?.cor || "#ccc",
                  }}
                  onClick={() => toggleExpansao(coleta.id)}
                >
                  {/* Corpo do card */}
                  <div className="coleta-body">
                    {/* Coluna de textos — lado esquerdo */}
                    <div>
                      <span className="coleta-titulo">Colete agora</span>
                      <span className="coleta-prazo">
                        Prazo até às {coleta.prazo}
                      </span>

                      <div className="coleta-tipos">
                        {coleta.tiposLixo.map((tipo, idx) => {
                          const visual =
                            lixoMap[tipo.tipo] || { cor: "#ccc", icone: "❓" };
                          return (
                            <span
                              key={idx}
                              className="tipo-tag"
                              style={{ color: visual.cor }}
                            >
                              {visual.icone} {tipo.tipo} — {tipo.quantidade}
                            </span>
                          );
                        })}
                      </div>

                      {/* ✅ Mostra apenas cidade e bairro */}
                      <span className="coleta-localizacao">
                        📍 {coleta.cidade} — {coleta.bairro}
                      </span>
                    </div>

                    {/* Ícone principal — lado direito */}
                    <div className="coleta-icone-principal">
                      {lixoMap[coleta.tiposLixo[0].tipo]?.icone || "❓"}
                    </div>
                  </div>

                  {/* Área expandida */}
                  {coleta.expandida && (
                    <div
                      className="coleta-expandida"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p>
                        Ao aceitar, a coleta será atribuída a você e não aparecerá
                        mais nesta lista.
                      </p>
                      <div className="botoes-acao">
                        <button
                          className="button-catador"
                          onClick={() => handleAceitarColeta(coleta.id)}
                        >
                          ✓ Aceitar
                        </button>
                        <button
                          className="button-catador"
                          onClick={() => handleRecusarColeta(coleta.id)}
                        >
                          ✗ Não Aceitar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
