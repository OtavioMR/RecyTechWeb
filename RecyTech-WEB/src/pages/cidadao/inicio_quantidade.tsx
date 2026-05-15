import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.tsx';
import '../../style/cidadao/inicio_quantidade.css';
import { routesMapCidadao } from "../../routes/routesMap.ts";

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
        { id: 'pouco', tipo: 'Pouco', descricao: 'Até 15 Kg', icone: '♻️' },
        { id: 'medio', tipo: 'Médio', descricao: 'Até 50 Kg', icone: '♻️♻️' },
        { id: 'grande', tipo: 'Grande', descricao: '+50 Kg', icone: '♻️♻️♻️' },
    ];

    // 🔹 Navegação SPA
    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);
        if (routesMapCidadao[menu]) navigate(routesMapCidadao[menu]);
    };

    const handleSidebarToggle = (collapsed: boolean) => {
        console.log('Sidebar collapsed:', collapsed);
    };

    // 🔹 Selecionar quantidade: salva no localStorage e vai para solicitar coleta
    const selecionarQuantidade = (id: string) => {
        setSelecionado(id);
        const quantidade = quantidades.find(qtd => qtd.id === id);
        if (quantidade) {
            localStorage.setItem('quantidadeSelecionada', JSON.stringify(quantidade));
            navigate('/inicioSolicitarColeta');
        }
    };

    // 🔹 Voltar
    const handleVoltar = () => {
        navigate('/inicioTiposLixo');
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
                        <button
                            className="btn-voltar"
                            onClick={handleVoltar}
                        >
                            ← Voltar
                        </button>
                    </div>

                    {/* Título */}
                    <div className="mb-4">
                        <h2 className="titulo-quantidade">Qual a quantidade:</h2>
                    </div>

                    {/* Grid de Quantidades */}
                    <div className="quantidades-container">
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
                </div>
            </main>
        </div>
    );
}
