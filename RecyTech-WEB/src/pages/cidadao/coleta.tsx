import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar.tsx";
import "../../style/cidadao/coleta.css";
import type { Coleta } from "../../types/types.ts";
import { lixoMap } from "../../utils/lixoMap";
import { routesMapCidadao } from "../../routes/routesMap.ts";
import { storageService } from "../../services/storageService.ts";

interface ColetaUI extends Coleta {
    expandida: boolean;
}

export default function Coleta() {
    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState("coleta");
    const [coletas, setColetas] = useState<ColetaUI[]>([]);
    const [filtroStatus, setFiltroStatus] = useState<"todas" | "em-andamento" | "concluida">("todas");
    const [loading, setLoading] = useState(true);

    const carregarColetas = () => {
        try {
            const data = storageService.getColetas();
            setColetas(data.map((c) => ({ ...c, expandida: false })));
        } catch (err) {
            console.error("Erro ao buscar coletas:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarColetas();
    }, []);

    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);
        if (routesMapCidadao[menu]) navigate(routesMapCidadao[menu]);
    };

    const toggleExpansao = (id: string) => {
        setColetas((prev) =>
            prev.map((c) => (c.id === id ? { ...c, expandida: !c.expandida } : c))
        );
    };

    const handleConcluir = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        storageService.concluirColeta(id);
        carregarColetas();
    };

    const handleCancelar = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (window.confirm("Deseja realmente cancelar esta solicitação?")) {
            storageService.cancelarColeta(id);
            carregarColetas();
        }
    };

    const handleNovaColeta = () => {
        const variant = storageService.getVariant();
        if (variant === "B") {
            navigate("/solicitar-coleta-rapida");
        } else {
            navigate("/inicioCidadao");
        }
    };

    const coletasFiltradas = coletas.filter(c => {
        if (filtroStatus === "todas") return true;
        return c.status === filtroStatus;
    });

    return (
        <div className="app-layout">
            <Sidebar
                onMenuSelect={handleMenuSelect}
                activeMenu={activeMenu}
                onToggle={() => {}}
                perfil="cidadao"
            />

            <main className="main-content">
                <div className="content-area container-fluid px-0" style={{ maxWidth: '680px', margin: '0 auto' }}>
                    {/* Header Limpo */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="titulo-coleta">Minhas Coletas</h2>
                        <button
                            className="btn btn-sm btn-success fw-bold px-3 py-2"
                            onClick={handleNovaColeta}
                        >
                            + Nova Coleta
                        </button>
                    </div>

                    {/* Filtros em Pílula discretos */}
                    <div className="filtros-pills">
                        <button
                            type="button"
                            className={`filtro-pill-btn ${filtroStatus === 'todas' ? 'ativo' : ''}`}
                            onClick={() => setFiltroStatus('todas')}
                        >
                            Todas ({coletas.length})
                        </button>
                        <button
                            type="button"
                            className={`filtro-pill-btn ${filtroStatus === 'em-andamento' ? 'ativo' : ''}`}
                            onClick={() => setFiltroStatus('em-andamento')}
                        >
                            Em Andamento ({coletas.filter(c => c.status === 'em-andamento').length})
                        </button>
                        <button
                            type="button"
                            className={`filtro-pill-btn ${filtroStatus === 'concluida' ? 'ativo' : ''}`}
                            onClick={() => setFiltroStatus('concluida')}
                        >
                            Concluídas ({coletas.filter(c => c.status === 'concluida').length})
                        </button>
                    </div>

                    {/* Lista de Coletas */}
                    <div className="id-coleta-cidadao">
                        {loading ? (
                            <p className="text-center text-muted p-4">Carregando coletas...</p>
                        ) : coletasFiltradas.length === 0 ? (
                            <div className="text-center p-4 border rounded bg-white">
                                <p className="text-muted mb-3">Nenhuma coleta neste filtro.</p>
                                <button className="btn btn-sm btn-outline-success" onClick={handleNovaColeta}>
                                    Solicitar Coleta
                                </button>
                            </div>
                        ) : (
                            coletasFiltradas.map((coleta) => (
                                <div
                                    key={coleta.id}
                                    className={`coleta-card ${coleta.expandida ? "expandida" : ""}`}
                                    onClick={() => toggleExpansao(coleta.id)}
                                >
                                    <div className="coleta-status">
                                        <span className={`status-badge ${coleta.status}`}>
                                            {coleta.status === "em-andamento" ? "Em Andamento" : "Concluída"}
                                        </span>
                                        <span className="btn-expandir">
                                            {coleta.expandida ? "Recolher ▲" : "Detalhes ▼"}
                                        </span>
                                    </div>

                                    <div className="coleta-info">
                                        <p className="prazo">
                                            {coleta.status === "em-andamento"
                                                ? `Prazo: ${coleta.prazo || "Hoje"}`
                                                : `${coleta.dataConclusao || "Concluída"}`}
                                        </p>
                                    </div>

                                    <div className="tipos-lixo">
                                        {coleta.tiposLixo.map((lixo, index) => {
                                            const visual = lixoMap[lixo.tipo] || { icone: "♻️", cor: "#4CAF50" };
                                            return (
                                                <div key={index} className="tipo-lixo-item">
                                                    <span className="lixo-icone" style={{ backgroundColor: visual.cor }}>
                                                        {visual.icone}
                                                    </span>
                                                    <span>{lixo.tipo} ({lixo.quantidade})</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {coleta.expandida && (
                                        <div className="informacoes-expandidas">
                                            <div className="info-item">
                                                <span className="info-label">Endereço:</span>
                                                <span>
                                                    {coleta.endereco
                                                        ? `${coleta.endereco.logradouro}, ${coleta.endereco.numero} - ${coleta.endereco.bairro}`
                                                        : `${coleta.bairro}, ${coleta.cidade}`}
                                                </span>
                                            </div>

                                            <div className="info-item">
                                                <span className="info-label">Coletor:</span>
                                                <span>{coleta.catador || "Aguardando definição"}</span>
                                            </div>

                                            <div className="d-flex gap-2 mt-3">
                                                {coleta.status === "em-andamento" && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-success"
                                                        onClick={(e) => handleConcluir(e, coleta.id)}
                                                    >
                                                        Concluir
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={(e) => handleCancelar(e, coleta.id)}
                                                >
                                                    Cancelar
                                                </button>
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
