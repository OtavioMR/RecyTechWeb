import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.tsx';
import '../../style/cidadao/inicio_tipos_lixo.css';
import { routesMapCidadao } from "../../routes/routesMap.ts";

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
        { id: 'eletronicos', label: 'Eletrónicos', selecionado: false, cor: '#9E9E9E', corTexto: '#FFFFFF', icone: '💻' },
    ]);

    // 🔹 Navegação SPA
    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);
        if (routesMapCidadao[menu]) navigate(routesMapCidadao[menu]);
    };

    const handleSidebarToggle = (collapsed: boolean) => {
        console.log('Sidebar collapsed:', collapsed);
    };

    // 🔹 Toggle seleção
    const toggleTipoLixo = (id: string) => {
        setTiposLixo(prev =>
            prev.map(tipo =>
                tipo.id === id
                    ? { ...tipo, selecionado: !tipo.selecionado }
                    : tipo
            )
        );
    };

    // 🔹 Confirmar: salva no localStorage e vai para quantidade
    const handleConfirmar = () => {
        const selecionados = tiposLixo.filter(t => t.selecionado);
        localStorage.setItem('tiposSelecionados', JSON.stringify(selecionados));
        navigate('/inicioQuantidade');
    };

    // 🔹 Voltar
    const handleVoltar = () => {
        navigate('/inicioCidadao');
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

                    {/* Botão Voltar */}
                    <div className="voltar-container mb-4">
                        <button className="btn-voltar" onClick={handleVoltar}>
                            ← Voltar
                        </button>
                    </div>

                    {/* Título */}
                    <div className="mb-4">
                        <h2 className="titulo-tipos-lixo">Quais o tipo de lixo:</h2>
                    </div>

                    {/* Grid de Tipos de Lixo */}
                    <div className="tipos-lixo-container">
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

                    {/* Botão Confirmar */}
                    <div className="confirmar-container">
                        <button className="btn-confirmar" onClick={handleConfirmar}>
                            Confirmar
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
