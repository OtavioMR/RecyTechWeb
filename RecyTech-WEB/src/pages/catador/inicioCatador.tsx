import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import "../../style/catador/inicioCatador.css";
import type { Coleta } from "../../types/types";
import { routesMapCatador } from "../../routes/routesMap";
import { lixoMap } from "../../utils/lixoMap";
import { catadorService } from "../../services/catador/catadorService"; // ✅ integrado

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
        // ✅ Chamada real ao back-end
        const response = await catadorService.listarColetasDisponiveis();

        let data: ColetaDisponivel[] = response.map((c) => ({
          ...c,
          expandida: false,
        }));

        // 🔹 Se não vier nada da API, usa mock para testar design
        if (data.length === 0) {
          data = getMockColetas();
        }

        setColetas(data.filter((c) => c.status === "disponivel"));
      } catch (err) {
        console.error("Erro ao buscar coletas disponíveis:", err);

        // 🔹 Se der erro na API, também usa mock completo
        setColetas(getMockColetas());
      } finally {
        setLoading(false);
      }
    };

    carregarColetas();
  }, []);

  // 🔹 Mock centralizado
  const getMockColetas = (): ColetaDisponivel[] => [

    {
      id: "mock0",
      status: "disponivel",
      prazo: "17:00",
      tiposLixo: [{ tipo: "Vidro", quantidade: "50Kg" }],
      cidade: "Cotia",
      bairro: "Jardim Petropolis",
      expandida: false,
    },
    {
      id: "mock1",
      status: "disponivel",
      prazo: "17:00",
      tiposLixo: [{ tipo: "Metal", quantidade: "50Kg" }],
      cidade: "São Paulo",
      bairro: "Centro",
      expandida: false,
    },
    {
      id: "mock2",
      status: "disponivel",
      prazo: "19:00",
      tiposLixo: [{ tipo: "Plástico", quantidade: "15Kg" }],
      cidade: "Osasco",
      bairro: "Jardim América",
      expandida: false,
    },
    {
      id: "mock3",
      status: "disponivel",
      prazo: "18:00",
      tiposLixo: [{ tipo: "Papel", quantidade: "+50Kg" }],
      cidade: "São Paulo",
      bairro: "Vila Verde",
      expandida: false,
    },
    {
      id: "mock4",
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
      await catadorService.aceitarColeta(id);
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
        perfil="catador"   // 🔹 obrigatório agora
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
            <div className="id-inicio-catador">
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

                      <span className="coleta-localizacao">
                        📍 {coleta.cidade} — {coleta.bairro}
                      </span>
                    </div>

                    <div className="coleta-icone-principal">
                      {lixoMap[coleta.tiposLixo[0].tipo]?.icone || "❓"}
                    </div>
                  </div>

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
