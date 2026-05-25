import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import "../../style/catador/minhasColetas.css";
import type { Coleta } from "../../types/types";
import { routesMapCatador } from "../../routes/routesMap";
import { lixoMap } from "../../utils/lixoMap";
import { catadorService } from "../../services/catador/catadorService"; // ✅ integração real

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

    useEffect(() => {
        const carregarColetas = async () => {
            try {
                const data = await catadorService.listarMinhasColetas();
                setColetas(data.map(c => ({ ...c, expandida: false })));
            } catch (err) {
                console.error("Erro ao buscar minhas coletas:", err);

                // 🔹 Fallback mock para visualizar layout
                const mock: ColetaAceita[] = [
                    {
                        id: "1",
                        status: "em-andamento",
                        prazo: "17:00 do dia 03/03/2026",
                        tiposLixo: [
                            { tipo: "Plástico", quantidade: "15Kg" },
                            { tipo: "Vidro", quantidade: "10Kg" }
                        ],
                        cidade: "São Paulo",
                        bairro: "Centro",
                        endereco: {
                            logradouro: "Rua das Flores",
                            numero: "123",
                            bairro: "Centro",
                            cidade: "São Paulo",
                            estado: "SP",
                            cep: "01000-000",
                            complemento: "Apto 45"
                        },
                        catador: "João Silva",
                        dataAceita: "15/11/2024 às 10:30",
                        expandida: false
                    },
                    {
                        id: "2",
                        status: "concluida",
                        dataConclusao: "27/05/2026 às 19:00",
                        tiposLixo: [
                            { tipo: "Metal", quantidade: "25Kg" },
                            { tipo: "Papel", quantidade: "12Kg" },
                            { tipo: "Eletrônico", quantidade: "5Kg" }
                        ],
                        cidade: "Rio de Janeiro",
                        bairro: "Jardim",
                        endereco: {
                            logradouro: "Av. Atlântica",
                            numero: "500",
                            bairro: "Jardim",
                            cidade: "Rio de Janeiro",
                            estado: "RJ",
                            cep: "22000-000"
                        },
                        catador: "João Silva",
                        dataAceita: "13/11/2024 às 09:15",
                        expandida: false
                    }
                ];
                setColetas(mock);
            } finally {
                setLoading(false);
            }
        };

        carregarColetas();
    }, []);

    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);
        if (routesMapCatador[menu]) navigate(routesMapCatador[menu]);
    };

    const toggleExpansao = (id: string) => {
        setColetas(prev =>
            prev.map(c => (c.id === id ? { ...c, expandida: !c.expandida } : c))
        );
    };

    // 🔹 Concluir coleta via API
    const handleConcluir = async (id: string) => {
        try {
            const coletaAtualizada = await catadorService.concluirColeta(id);
            setColetas(prev =>
                prev.map(c => c.id === id ? { ...c, ...coletaAtualizada, expandida: false } : c)
            );
            alert("✅ Coleta concluída com sucesso!");
        } catch (err) {
            console.error("Erro ao concluir coleta:", err);
            alert("❌ Não foi possível concluir a coleta. Tente novamente.");
        }
    };

    return (
        <div className="app-layout">
            <Sidebar
                onMenuSelect={handleMenuSelect}
                activeMenu={activeMenu}
                onToggle={(collapsed) => console.log("Sidebar collapsed:", collapsed)}
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

                    {/* Conteúdo condicional */}
                    {loading ? (
                        <div className="loading-spinner">Carregando minhas coletas...</div>
                    ) : coletas.length === 0 ? (
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
                                    className={`coleta-card ${coleta.expandida ? "expandida" : ""} ${coleta.status === "concluida" ? "concluida" : "em-andamento"}`}
                                    onClick={() => toggleExpansao(coleta.id)}
                                >
                                    {/* Status Badge */}
                                    <div className="coleta-status">
                                        <span className={`status-badge ${coleta.status}`}>
                                            {coleta.status === "em-andamento" ? "Em Andamento" : "Concluída"}
                                        </span>
                                        <span className="seta">v</span>
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
                                        {coleta.tiposLixo.map((tipo, idx) => {
                                            const visual = lixoMap[tipo.tipo] || { icone: "❓", cor: "#ccc" };
                                            return (
                                                <div key={idx} className="tipo-lixo-item" style={{ color: visual.cor }}>
                                                    <span className="tipo-icone">{visual.icone}</span>
                                                    <span className="tipo-nome">{tipo.tipo}</span>
                                                    <span className="tipo-quantidade">{tipo.quantidade}</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Conteúdo Expandido */}
                                    {coleta.expandida && (
                                        <div className="coleta-expandida">
                                            <hr className="separator" />

                                            <div className="endereco-container">
                                                <h4 className="endereco-titulo">Endereço Completo</h4>
                                                {coleta.endereco ? (
                                                    <p className="endereco-texto">
                                                        {coleta.endereco.logradouro}, {coleta.endereco.numero}
                                                        {coleta.endereco.complemento ? ` - ${coleta.endereco.complemento}` : ""}
                                                        <br />
                                                        {coleta.endereco.bairro} — {coleta.endereco.cidade}/{coleta.endereco.estado}
                                                        <br />
                                                        CEP: {coleta.endereco.cep}
                                                    </p>
                                                ) : (
                                                    <p className="endereco-texto">
                                                        {coleta.bairro} — {coleta.cidade}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="data-aceita">
                                                <span className="data-label">Data de Aceitação:</span>
                                                <span className="data-valor">{coleta.dataAceita}</span>
                                            </div>

                                            {coleta.status === "em-andamento" && (
                                                <div className="acoes-container">
                                                    <button
                                                        className="btn-marcar-completo"
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // evita disparar o toggleExpansao
                                                            handleConcluir(coleta.id);
                                                        }}
                                                    >
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
