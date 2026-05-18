import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarCatador from "../../components/SidebarCatador.tsx";
import "../../style/catador/inicioCatador.css";
import type { Coleta } from "../../types/types.ts";
import { routesMapCatador } from "../../routes/routesMap.ts";
// import { catadorService } from "../../services/catador/catadorService"; // futuro backend

// 🔹 Tipo local para UI (coletas disponíveis)
interface ColetaDisponivel extends Coleta {
    expandida: boolean;
    bairro: string; // adicionar bairro às coletas disponíveis
}

export default function InicioCatador() {
    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState("inicio");
    const [coletas, setColetas] = useState<ColetaDisponivel[]>([]);
    const [loading, setLoading] = useState(true);
    const [coletaSelecionada, setColetaSelecionada] = useState<string | null>(null);

    // 🔹 Buscar coletas disponíveis (simulação sem backend, depois troca para catadorService)
    useEffect(() => {
        const carregarColetas = async () => {
            try {
           
                const data: ColetaDisponivel[] = [
                    {
                        id: "1",
                        status: "em-andamento",
                        prazo: "17:00 do dia 15/11/2024",
                        tiposLixo: [
                            { tipo: "Plástico", quantidade: "15Kg", icone: "🥤", cor: "#F44336" },
                            { tipo: "Vidro", quantidade: "10Kg", icone: "🍶", cor: "#4CAF50" }
                        ],
                        endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
                        catador: "", 
                        bairro: "Centro",
                        expandida: false
                    },
                    {
                        id: "2",
                        status: "em-andamento",
                        prazo: "18:30 do dia 15/11/2024",
                        tiposLixo: [
                            { tipo: "Metais", quantidade: "25Kg", icone: "🔩", cor: "#FFEB3B" },
                            { tipo: "Papel", quantidade: "12Kg", icone: "📄", cor: "#2196F3" }
                        ],
                        endereco: "Av. Principal, 456 - Jardim, Rio de Janeiro - RJ",
                        catador: "",
                        bairro: "Jardim",
                        expandida: false
                    },
                    {
                        id: "3",
                        status: "em-andamento",
                        prazo: "19:00 do dia 15/11/2024",
                        tiposLixo: [
                            { tipo: "Eletrônicos", quantidade: "5Kg", icone: "💻", cor: "#9E9E9E" },
                            { tipo: "Plástico", quantidade: "8Kg", icone: "🥤", cor: "#F44336" },
                            { tipo: "Vidro", quantidade: "12Kg", icone: "🍶", cor: "#4CAF50" }
                        ],
                        endereco: "Rua das Acácias, 789 - Vila Verde, São Paulo - SP",
                        catador: "",
                        bairro: "Vila Verde",
                        expandida: false
                    },
                    {
                        id: "4",
                        status: "em-andamento",
                        prazo: "16:00 do dia 15/11/2024",
                        tiposLixo: [
                            { tipo: "Papel", quantidade: "20Kg", icone: "📄", cor: "#2196F3" }
                        ],
                        endereco: "Rua Comercial, 321 - Bom Retiro, São Paulo - SP",
                        catador: "",
                        bairro: "Bom Retiro",
                        expandida: false
                    }
                ];

                setColetas(data.map((c) => ({ ...c, expandida: false })));
            } catch (err) {
                console.error("Erro ao buscar coletas disponíveis:", err);
            } finally {
                setLoading(false);
            }
        };

        carregarColetas();
    }, []);

    // 🔹 Navegação SPA (alinhada com Sidebar)
    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);
        if (routesMapCatador[menu]) navigate(routesMapCatador[menu]);
    };

    const handleSidebarToggle = (collapsed: boolean) => {
        console.log("Sidebar collapsed:", collapsed);
    };

    // 🔹 Expandir card
    const toggleExpansao = (id: string) => {
        setColetas((prev) =>
            prev.map((c) => (c.id === id ? { ...c, expandida: !c.expandida } : c))
        );
        setColetaSelecionada(coletaSelecionada === id ? null : id);
    };

    // 🔹 Aceitar coleta
    const handleAceitarColeta = (id: string) => {
        console.log("Coleta aceita:", id);
        // TODO: Chamar serviço catadorService.aceitarColeta(id)
        alert(`Coleta ${id} aceita com sucesso!`);
        // Remover coleta da lista após aceitar
        setColetas((prev) => prev.filter((c) => c.id !== id));
        setColetaSelecionada(null);
    };

    // 🔹 Recusar coleta
    const handleRecusarColeta = (id: string) => {
        console.log("Coleta recusada:", id);
        // Fechar expansão sem aceitar
        toggleExpansao(id);
    };

    if (loading) {
        return (
            <div className="app-layout">
                <SidebarCatador
                    onMenuSelect={handleMenuSelect}
                    activeMenu={activeMenu}
                    onToggle={handleSidebarToggle}
                />
                <main className="main-content">
                    <div className="content-area container-fluid px-0">
                        <div className="nomeApp mb-3 ps-0">
                            <h1 className="m-0">RecyTech</h1>
                        </div>
                        <div className="loading-spinner">Carregando coletas disponíveis...</div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="app-layout">
            <SidebarCatador
                onMenuSelect={handleMenuSelect}
                activeMenu={activeMenu}
                onToggle={handleSidebarToggle}
            />

            <main className="main-content">
                <div className="content-area container-fluid px-0">
                    {/* Header */}
                    <div className="nomeApp mb-3 ps-0">
                        <h1 className="m-0">RecyTech</h1>
                    </div>

                    {/* Título */}
                    <div className="mb-4">
                        <h2 className="titulo-coletas-disponiveis">Coletas Disponíveis</h2>
                        <p className="subtitulo-coletas">Escolha uma coleta para aceitar</p>
                    </div>

                    {/* Lista de Coletas Disponíveis */}
                    {coletas.length === 0 ? (
                        <div className="nenhuma-coleta-container">
                            <p className="nenhuma-coleta">
                                😊 Nenhuma coleta disponível no momento. Volte mais tarde!
                            </p>
                        </div>
                    ) : (
                        <div className="coletas-container">
                            {coletas.map((coleta) => (
                                <div
                                    key={coleta.id}
                                    className={`coleta-card-catador ${coleta.expandida ? "expandida" : ""}`}
                                    onClick={() => toggleExpansao(coleta.id)}
                                >
                                    {/* Conteúdo do Card - Sempre Visível */}
                                    <div className="coleta-header">
                                        <div className="coleta-info-base">
                                            {/* Bairro */}
                                            <div className="coleta-item bairro-item">
                                                <span className="item-icon">📍</span>
                                                <span className="item-label">Bairro</span>
                                                <span className="item-value">{coleta.bairro}</span>
                                            </div>

                                            {/* Prazo */}
                                            <div className="coleta-item prazo-item">
                                                <span className="item-icon">⏰</span>
                                                <span className="item-label">Prazo</span>
                                                <span className="item-value">{coleta.prazo}</span>
                                            </div>

                                            {/* Quantidade */}
                                            <div className="coleta-item quantidade-item">
                                                <span className="item-icon">📦</span>
                                                <span className="item-label">Quantidade Total</span>
                                                <span className="item-value">
                                                    {coleta.tiposLixo.reduce((acc, tipo) => {
                                                        const qtd = parseInt(tipo.quantidade.replace(/\D/g, ""));
                                                        return acc + qtd;
                                                    }, 0)}
                                                    Kg
                                                </span>
                                            </div>

                                            {/* Tipos de Lixo */}
                                            <div className="coleta-item tipos-item">
                                                <span className="item-icon">♻️</span>
                                                <span className="item-label">Tipos de Lixo</span>
                                                <div className="tipos-lixo">
                                                    {coleta.tiposLixo.map((tipo, idx) => (
                                                        <div key={idx} className="tipo-lixo-item">
                                                            <span className="tipo-icone">{tipo.icone}</span>
                                                            <span className="tipo-nome">{tipo.tipo}</span>
                                                            <span className="tipo-quantidade">{tipo.quantidade}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Seta Indicadora */}
                                        <div className="coleta-seta">
                                            <span className="seta">⌄</span>
                                        </div>
                                    </div>

                                    {/* Conteúdo Expandido - Endereço Completo */}
                                    {coleta.expandida && (
                                        <div className="coleta-expandida">
                                            <div className="endereco-container">
                                                <h4 className="endereco-titulo">Bairro</h4>
                                                <p className="endereco-texto">{coleta.bairro}</p>
                                            </div>

                                            {/* Botões de Ação */}
                                            <div className="botoes-acao">
                                                <button
                                                    className="btn-aceitar"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAceitarColeta(coleta.id);
                                                    }}
                                                >
                                                    ✓ Aceitar
                                                </button>
                                                <button
                                                    className="btn-recusar"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRecusarColeta(coleta.id);
                                                    }}
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
