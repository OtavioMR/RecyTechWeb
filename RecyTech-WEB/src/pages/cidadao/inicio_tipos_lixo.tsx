import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.tsx';
import '../../style/cidadao/inicio_tipos_lixo.css';
import { routesMapCidadao } from "../../routes/routesMap.ts";
import { storageService } from '../../services/storageService.ts';
import { ABComparisonHeader } from '../../components/ABComparisonHeader.tsx';

interface TipoLixo {
    id: string;
    label: string;
    selecionado: boolean;
    cor: string;
    corTexto: string;
    icone: string;
}

export default function InicioTiposLixo() {
    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState('inicio');
    const [tiposLixo, setTiposLixo] = useState<TipoLixo[]>([
        { id: 'papel', label: 'Papel', selecionado: false, cor: '#2196F3', corTexto: '#FFFFFF', icone: '📄' },
        { id: 'plastico', label: 'Plástico', selecionado: false, cor: '#F44336', corTexto: '#FFFFFF', icone: '🥤' },
        { id: 'vidro', label: 'Vidro', selecionado: false, cor: '#4CAF50', corTexto: '#FFFFFF', icone: '🍶' },
        { id: 'metais', label: 'Metais', selecionado: false, cor: '#FFEB3B', corTexto: '#666666', icone: '🔩' },
        { id: 'eletronicos', label: 'Eletrônicos', selecionado: false, cor: '#9E9E9E', corTexto: '#FFFFFF', icone: '💻' },
    ]);

    useEffect(() => {
        const draft = storageService.getDraftColeta();
        const salvos = draft.tipos || (() => {
            const ls = localStorage.getItem('tiposSelecionados');
            return ls ? JSON.parse(ls) : null;
        })();

        if (salvos && Array.isArray(salvos) && salvos.length > 0) {
            const idsSalvos = new Set(salvos.map((s: any) => s.id));
            setTiposLixo(prev =>
                prev.map(item => ({
                    ...item,
                    selecionado: idsSalvos.has(item.id)
                }))
            );
        }
    }, []);

    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);
        if (routesMapCidadao[menu]) navigate(routesMapCidadao[menu]);
    };

    const toggleTipoLixo = (id: string) => {
        setTiposLixo(prev =>
            prev.map(tipo =>
                tipo.id === id
                    ? { ...tipo, selecionado: !tipo.selecionado }
                    : tipo
            )
        );
    };

    const handleConfirmar = () => {
        const selecionados = tiposLixo.filter(t => t.selecionado);
        if (selecionados.length === 0) {
            alert('Selecione ao menos um tipo de material.');
            return;
        }

        localStorage.setItem('tiposSelecionados', JSON.stringify(selecionados));
        storageService.saveDraftColeta({ tipos: selecionados });
        navigate('/inicioQuantidade');
    };

    const handleVoltar = () => {
        navigate('/inicioCidadao');
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
                        <h2 className="titulo-coleta">O que vai descartar?</h2>
                        <span className="badge bg-light text-muted border">Passo 2 de 4</span>
                    </div>

                    {/* Switcher A/B Minimalista */}
                    <ABComparisonHeader currentVariant="A" />

                    {/* Grid de Tipos de Lixo */}
                    <div className="tipos-lixo-container mb-4">
                        {tiposLixo.map((tipo) => (
                            <button
                                key={tipo.id}
                                className={`tipo-lixo-btn ${tipo.selecionado ? 'selecionado' : ''}`}
                                onClick={() => toggleTipoLixo(tipo.id)}
                                style={{
                                    backgroundColor: tipo.selecionado ? tipo.cor : '#F5F5F5',
                                    borderColor: tipo.cor,
                                    color: tipo.selecionado ? tipo.corTexto : '#333333'
                                }}
                            >
                                <span className="tipo-lixo-icone">{tipo.icone}</span>
                                <span className="tipo-lixo-label">{tipo.label}</span>
                                {tipo.selecionado && (
                                    <span className="check-icon">✓</span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Botões de Ação */}
                    <div className="d-flex justify-content-between align-items-center gap-2">
                        <button className="btn btn-outline-secondary" onClick={handleVoltar}>
                            ← Voltar
                        </button>
                        <button className="btn btn-success px-4" onClick={handleConfirmar}>
                            Avançar ➔
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
