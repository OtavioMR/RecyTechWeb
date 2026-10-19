import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.tsx';
import '../../style/cidadao/inicio_quantidade.css';
import { routesMapCidadao } from "../../routes/routesMap.ts";
import { storageService } from '../../services/storageService.ts';
import { ABComparisonHeader } from '../../components/ABComparisonHeader.tsx';

interface Quantidade {
    id: string;
    tipo: string;
    descricao: string;
    icone: string;
}

export default function InicioQuantidade() {
    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState('inicio');
    const [selecionado, setSelecionado] = useState<string | null>(null);

    const quantidades: Quantidade[] = [
        { id: 'pouco', tipo: 'Pouco', descricao: 'Até 15 Kg (1 a 2 sacolas)', icone: '♻️' },
        { id: 'medio', tipo: 'Médio', descricao: 'Até 50 Kg (1 caixa cheia)', icone: '♻️♻️' },
        { id: 'grande', tipo: 'Grande', descricao: '+50 Kg (múltiplos volumes)', icone: '♻️♻️♻️' },
    ];

    useEffect(() => {
        const draft = storageService.getDraftColeta();
        const salva = draft.quantidade || (() => {
            const ls = localStorage.getItem('quantidadeSelecionada');
            return ls ? JSON.parse(ls) : null;
        })();

        if (salva && salva.id) {
            setSelecionado(salva.id);
        }
    }, []);

    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);
        if (routesMapCidadao[menu]) navigate(routesMapCidadao[menu]);
    };

    const selecionarQuantidade = (id: string) => {
        setSelecionado(id);
        const quantidade = quantidades.find(qtd => qtd.id === id);
        if (quantidade) {
            localStorage.setItem('quantidadeSelecionada', JSON.stringify(quantidade));
            storageService.saveDraftColeta({ quantidade });
            navigate('/inicioSolicitarColeta');
        }
    };

    const handleVoltar = () => {
        navigate('/inicioTiposLixo');
    };

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
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h2 className="titulo-coleta">Qual o volume?</h2>
                        <span className="badge bg-light text-muted border">Passo 3 de 4</span>
                    </div>

                    {/* Switcher A/B Minimalista */}
                    <ABComparisonHeader currentVariant="A" />

                    {/* Grid de Quantidades */}
                    <div className="quantidades-container mb-4">
                        {quantidades.map((qtd) => (
                            <button
                                key={qtd.id}
                                className={`quantidade-btn ${selecionado === qtd.id ? 'selecionado' : ''}`}
                                onClick={() => selecionarQuantidade(qtd.id)}
                            >
                                <div className="quantidade-content">
                                    <span className="quantidade-icone">{qtd.icone}</span>
                                    <div className="quantidade-textos">
                                        <span className="quantidade-tipo">{qtd.tipo}</span>
                                        <span className="quantidade-descricao">{qtd.descricao}</span>
                                    </div>
                                    {selecionado === qtd.id && (
                                        <span className="check-icon">✓</span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Botão Voltar */}
                    <div>
                        <button className="btn btn-outline-secondary" onClick={handleVoltar}>
                            ← Voltar aos Materiais
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
