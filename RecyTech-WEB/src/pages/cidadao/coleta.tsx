import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar.tsx";
import "../../style/cidadao/coleta.css";
import type { Coleta } from "../../types/types.ts";
import { routesMapCidadao } from "../../routes/routesMap.ts";
// import { coletaService } from "../services/coletaService"; // futuro backend

// 🔹 Tipo local para UI
interface ColetaUI extends Coleta {
    expandida: boolean;
}

export default function Coleta() {
    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState("coleta");
    const [coletas, setColetas] = useState<ColetaUI[]>([]);
    const [loading, setLoading] = useState(true);

    // 🔹 Buscar coletas (simulação sem backend, depois troca para coletaService)
    useEffect(() => {
        const carregarColetas = async () => {
            try {
                // Futuro: const data = await coletaService.listarMinhas();
                const data: Coleta[] = [
                    {
                        id: "1",
                        status: "em-andamento",
                        prazo: "17:00 do dia 15/11/2024",
                        tiposLixo: [
                            { tipo: "Plástico", quantidade: "15Kg", icone: "🥤", cor: "#F44336" },
                            { tipo: "Vidro", quantidade: "15Kg", icone: "🍶", cor: "#4CAF50" }
                        ],
                        endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
                        catador: "João Silva"
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
                        catador: "Maria Santos"
                    }
                ];

                setColetas(data.map((c) => ({ ...c, expandida: false })));
            } catch (err) {
                console.error("Erro ao buscar coletas:", err);
            } finally {
                setLoading(false);
            }
        };

        carregarColetas();
    }, []);

    // 🔹 Navegação SPA (agora alinhada com Sidebar)
    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);
        if (routesMapCidadao[menu]) navigate(routesMapCidadao[menu]);
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

    return (
        <div className="app-layout">
            <Sidebar
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
                        <h2 className="titulo-coleta">Minhas Coletas:</h2>
                    </div>

                    {/* Lista de Coletas */}
                    <div className="coletas-container">
                        {loading ? (
                            <p>Carregando coletas...</p>
                        ) : coletas.length === 0 ? (
                            <div className="nenhuma-coleta">
                                <p>Nenhuma coleta confirmada ainda.</p>
                            </div>
                        ) : (
                            coletas.map((coleta) => (
                                <div
                                    key={coleta.id}
                                    className={`coleta-card ${coleta.expandida ? "expandida" : ""}`}
                                    onClick={() => toggleExpansao(coleta.id)}
                                >
                                    {/* Status */}
                                    <div className="coleta-status">
                                        <span className={`status-badge ${coleta.status}`}>
                                            {coleta.status === "em-andamento"
                                                ? "🟡 Coleta Em Andamento"
                                                : "🟢 Coleta Concluída"}
                                        </span>
                                        <span className="seta">{coleta.expandida ? "▲" : "▼"}</span>
                                    </div>

                                    {/* Prazo ou Conclusão */}
                                    <div className="coleta-info">
                                        {coleta.status === "em-andamento" ? (
                                            <p className="prazo">📅 Prazo até {coleta.prazo}</p>
                                        ) : (
                                            <p className="conclusao">
                                                ✅ Coleta feita em {coleta.dataConclusao}
                                            </p>
                                        )}
                                    </div>

                                    {/* Tipos de Lixo */}
                                    <div className="tipos-lixo">
                                        {coleta.tiposLixo.map((lixo, index) => (
                                            <div key={index} className="tipo-lixo-item">
                                                <span
                                                    className="lixo-icone"
                                                    style={{ backgroundColor: lixo.cor }}
                                                >
                                                    {lixo.icone}
                                                </span>
                                                <span className="lixo-info">
                                                    {lixo.tipo} - {lixo.quantidade}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Informações Expandidas */}
                                    {coleta.expandida && (
                                        <div className="informacoes-expandidas">
                                            <div className="info-item">
                                                <span className="info-label">📍 Endereço:</span>
                                                <span className="info-value">{coleta.endereco}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">👤 Catador responsável:</span>
                                                <span className="info-value">{coleta.catador}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
