import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar.tsx";
import "../../style/cidadao/coleta.css";
import type { Coleta } from "../../types/types.ts";
import { lixoMap } from "../../utils/lixoMap";
import { routesMapCidadao } from "../../routes/routesMap.ts";

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
                const data: Coleta[] = [
                    {
                        id: "1",
                        status: "em-andamento",
                        prazo: "17:00 do dia 15/11/2024",
                        tiposLixo: [
                            { tipo: "Plástico", quantidade: "15Kg" },
                            { tipo: "Vidro", quantidade: "15Kg" }
                        ],
                        cidade: "São Paulo",   // ✅ adicionado
                        bairro: "Centro",      // ✅ adicionado
                        endereco: {
                            logradouro: "Rua das Flores",
                            numero: "123",
                            bairro: "Centro",
                            cidade: "São Paulo",
                            estado: "SP",
                            cep: "00000-000",
                            complemento: ""
                        },
                        catador: "João Silva"
                    },
                    {
                        id: "2",
                        status: "concluida",
                        dataConclusao: "14/11/2024 às 14:30",
                        tiposLixo: [
                            { tipo: "Metal", quantidade: "25Kg" },
                            { tipo: "Papel", quantidade: "12Kg" },
                            { tipo: "Eletrônico", quantidade: "5Kg" }
                        ],
                        cidade: "Rio de Janeiro", // ✅ adicionado
                        bairro: "Jardim",         // ✅ adicionado
                        endereco: {
                            logradouro: "Av. Principal",
                            numero: "456",
                            bairro: "Jardim",
                            cidade: "Rio de Janeiro",
                            estado: "RJ",
                            cep: "11111-111",
                            complemento: ""
                        },
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

    // 🔹 Navegação SPA
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
                perfil="cidadao"
            />


            <main className="main-content">
                <div className="content-area container-fluid px-0">
                    <div className="nomeApp mb-3 ps-0">
                        <h1 className="m-0">RecyTech</h1>
                    </div>

                    <div className="mb-4">
                        <h2 className="titulo-coleta">Minhas Coletas:</h2>
                    </div>

                    <div className="coletas-container id-coleta-cidadao">
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
                                    <div className="coleta-status">
                                        <span className={`status-badge ${coleta.status}`}>
                                            {coleta.status === "em-andamento"
                                                ? "🟡 Coleta Em Andamento"
                                                : "🟢 Coleta Concluída"}
                                        </span>
                                        <span className="seta">{coleta.expandida ? "▲" : "▼"}</span>
                                    </div>

                                    <div className="coleta-info">
                                        {coleta.status === "em-andamento" ? (
                                            <p className="prazo">📅 Prazo até {coleta.prazo}</p>
                                        ) : (
                                            <p className="conclusao">
                                                ✅ Coleta feita em {coleta.dataConclusao}
                                            </p>
                                        )}
                                    </div>

                                    <div className="tipos-lixo">
                                        {coleta.tiposLixo.map((lixo, index) => {
                                            const visual = lixoMap[lixo.tipo] || { icone: "❓", cor: "#ccc" };
                                            return (
                                                <div key={index} className="tipo-lixo-item">
                                                    <span
                                                        className="lixo-icone"
                                                        style={{ backgroundColor: visual.cor }}
                                                    >
                                                        {visual.icone}
                                                    </span>
                                                    <span className="lixo-info">
                                                        {lixo.tipo} - {lixo.quantidade}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {coleta.expandida && (
                                        <div className="informacoes-expandidas">
                                            <div className="info-item">
                                                <span className="info-label">📍 Endereço:</span>
                                                <span className="info-value">
                                                    {coleta.endereco
                                                        ? `${coleta.endereco.logradouro}, ${coleta.endereco.numero} - ${coleta.endereco.bairro}, ${coleta.endereco.cidade} - ${coleta.endereco.estado}`
                                                        : "Endereço não informado"}
                                                </span>
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
