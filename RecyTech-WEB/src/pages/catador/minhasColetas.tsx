import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarCatador from "../../components/SidebarCatador.tsx";
import "../../style/catador/minhasColetas.css";
import type { Coleta } from "../../types/types.ts";
import { routesMapCatador } from "../../routes/routesMap.ts";
// import { catadorService } from "../../services/catador/catadorService"; // futuro backend

// 🔹 Tipo local para UI (coletas aceitas)
interface ColetaAceita extends Coleta {
    expandida: boolean;
    dataAceita?: string;
}

export default function MinhasColetas() {
    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState("minhasColetas");
    const [coletas, setColetas] = useState<ColetaAceita[]>([]);
    const [loading, setLoading] = useState(true);

    // 🔹 Buscar coletas aceitas (simulação sem backend, depois troca para catadorService)
    useEffect(() => {
        const carregarColetas = async () => {
            try {
                // Futuro: const data = await catadorService.listarMinhasColetas();
                const data = [
                    {
                        id: "1",
                        status: "em-andamento",
                        prazo: "17:00 do dia 15/11/2024",
                        tiposLixo: [
                            { tipo: "Plástico", quantidade: "15Kg", icone: "🥤", cor: "#F44336" },
                            { tipo: "Vidro", quantidade: "10Kg", icone: "🍶", cor: "#4CAF50" }
                        ],
                        endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
                        catador: "João Silva",
                        dataAceita: "15/11/2024 às 10:30"
                    },
                    {
                        id: "2",
                        status: "concluida",
                        dataConclusao: "14/11/2024 às 14:30",
                        tiposLixo: [
                            { tipo: "Metais", quantidade: "25Kg", icone: "🔩", cor: "#FFEB3B" },
                            { tipo: "Papel", quantidade: "12Kg", icone: "📄", cor: "#2196F3" },
                            { tipo: "Eletrônicos", quantidade: "5Kg", icone: "💻", cor: "#9E9E9E" }
                        ],
                        endereco: "Av. Principal, 456 - Jardim, Rio de Janeiro - RJ",
                        catador: "João Silva",
                        dataAceita: "13/11/2024 às 09:15"
                    }
                ];

                setColetas(data.map((c) => ({ ...c, expandida: false }) as ColetaAceita));
            } catch (err) {
                console.error("Erro ao buscar minhas coletas:", err);
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
                        <div className="loading-spinner">Carregando minhas coletas...</div>
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
                        <h2 className="titulo-minhas-coletas">Minhas Coletas</h2>
                    </div>

                    {/* Lista de Coletas Aceitas */}
                    {coletas.length === 0 ? (
                        <div className="nenhuma-coleta-container">
                            <p className="nenhuma-coleta">
                                📦 Você ainda não aceitou nenhuma coleta. Volte para coletas disponíveis!
                            </p>
                        </div>
                    ) : (
                        <div className="coletas-container">
                            {coletas.map((coleta) => (
                                <div
                                    key={coleta.id}
                                    className={`coleta-card ${coleta.expandida ? "expandida" : ""} ${
                                        coleta.status === "concluida" ? "concluida" : "em-andamento"
                                    }`}
                                    onClick={() => toggleExpansao(coleta.id)}
                                >
                                    {/* Status Badge */}
                                    <div className="coleta-status">
                                        <span
                                            className={`status-badge ${coleta.status}`}
                                        >
                                            {coleta.status === "em-andamento" ? "Em Andamento" : "Concluída"}
                                        </span>
                                        <span className="seta">⌄</span>
                                    </div>

                                    {/* Conteúdo do Card - Sempre Visível */}
                                    <div className="coleta-info">
                                        {coleta.status === "em-andamento" ? (
                                            <p className="prazo">⏰ Prazo: {coleta.prazo}</p>
                                        ) : (
                                            <p className="conclusao">✓ Concluída em: {coleta.dataConclusao}</p>
                                        )}
                                    </div>

                                    {/* Tipos de Lixo */}
                                    <div className="tipos-lixo">
                                        {coleta.tiposLixo.map((tipo, idx) => (
                                            <div key={idx} className="tipo-lixo-item">
                                                <span className="tipo-icone">{tipo.icone}</span>
                                                <span className="tipo-nome">{tipo.tipo}</span>
                                                <span className="tipo-quantidade">{tipo.quantidade}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Conteúdo Expandido - Endereço Completo */}
                                    {coleta.expandida && (
                                        <div className="coleta-expandida">
                                            <hr className="separator" />
                                            
                                            <div className="endereco-container">
                                                <h4 className="endereco-titulo">Endereço Completo</h4>
                                                <p className="endereco-texto">{coleta.endereco}</p>
                                            </div>

                                            <div className="data-aceita">
                                                <span className="data-label">Data de Aceitação:</span>
                                                <span className="data-valor">{coleta.dataAceita}</span>
                                            </div>

                                            {coleta.status === "em-andamento" && (
                                                <div className="acoes-container">
                                                    <button className="btn-marcar-completo">
                                                        ✓ Marcar como Completo
                                                    </button>
                                                </div>
                                            )}
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
