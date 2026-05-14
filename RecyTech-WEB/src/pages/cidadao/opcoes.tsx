import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.tsx';
import '../../style/cidadao/opcoes.css';
import { routesMapCidadao } from "../../routes/routesMap.ts";

interface Opcao {
    id: string;
    label: string;
    icone: string;
}

export default function Opcoes() {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState('opcoes');

    const opcoes: Opcao[] = [
        { id: 'tema', label: 'Tema', icone: '🎨' },
        { id: 'ajuda', label: 'Ajuda', icone: '❓' },
        { id: 'sobre', label: 'Sobre', icone: 'ℹ️' },
        { id: 'reciclagem', label: 'Reciclagem', icone: '♻️' },
        { id: 'remover-conta', label: 'Remover conta', icone: '🗑️' },
    ];

    // 🔹 Navegação SPA alinhada com Sidebar
    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);
        if (routesMapCidadao[menu]) navigate(routesMapCidadao[menu]);
    };

    const handleSidebarToggle = (collapsed: boolean) => {
        console.log('Sidebar collapsed:', collapsed);
    };

    // 🔹 Clique nas opções internas
    const handleOpcaoClick = (opcaoId: string) => {
        console.log('Opção clicada:', opcaoId);
        // Exemplo de navegação futura SPA
        // navigate(`/opcoes/${opcaoId}`);
        alert(`Navegando para: ${opcaoId}`);
    };

    return (
        <div className="app-layout">
            {/* Sidebar */}
            <Sidebar
                onMenuSelect={handleMenuSelect}
                activeMenu={activeMenu}
                onToggle={handleSidebarToggle}
            />

            {/* Conteúdo Principal */}
            <main className="main-content">
                <div className="content-area container-fluid px-0">
                    {/* Header */}
                    <div className="nomeApp mb-3 ps-0">
                        <h1 className="m-0">RecyTech</h1>
                    </div>

                    {/* Título */}
                    <div className="mb-4">
                        <h2 className="titulo-opcoes">Opções</h2>
                    </div>

                    {/* Lista de Opções */}
                    <div className="opcoes-container">
                        {opcoes.map((opcao) => (
                            <button
                                key={opcao.id}
                                className="opcao-btn"
                                onClick={() => handleOpcaoClick(opcao.id)}
                            >
                                <div className="opcao-content">
                                    <span className="opcao-icone">{opcao.icone}</span>
                                    <span className="opcao-label">{opcao.label}</span>
                                    <span className="opcao-seta">›</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
