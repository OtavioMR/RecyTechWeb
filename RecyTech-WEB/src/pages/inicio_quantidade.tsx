import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../style/inicio_quantidade.css';

interface Quantidade {
  id: string;
  tipo: string;
  descricao: string;
  selecionado: boolean;
  icone: string;
}

export default function InicioQuantidade() {
    const [activeMenu, setActiveMenu] = useState('inicio');
    const quantidades: Quantidade[] = [
        { id: 'pouco', tipo: 'Pouco', descricao: 'Até 15 Kg', selecionado: false, icone: '♻️' },
        { id: 'medio', tipo: 'Médio', descricao: 'Até 50 Kg', selecionado: false, icone: '♻️♻️' },
        { id: 'grande', tipo: 'Grande', descricao: '+50 Kg', selecionado: false, icone: '♻️♻️♻️' },
    ];

    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);
        console.log('Menu selecionado:', menu);
        
        // Navegação - Inicio não faz nada (está no fluxo)
        if (menu === 'opcoes') {
            window.location.href = '/opcoes';
        }
        if (menu === 'coleta') {
            window.location.href = '/coleta';
        }
        if (menu === 'conta') {
            window.location.href = '/conta';
        }
        // 'inicio' - não faz nada, está no fluxo do início
    };

    const handleSidebarToggle = (collapsed: boolean) => {
        console.log('Sidebar collapsed:', collapsed);
    };

    const selecionarQuantidade = (id: string) => {
        const quantidadeSelecionada = quantidades.find(qtd => qtd.id === id);
        if (quantidadeSelecionada) {
            // Salva a quantidade selecionada no localStorage
            localStorage.setItem('quantidadeSelecionada', JSON.stringify(quantidadeSelecionada));
            
            // Navega para a página de solicitar coleta
            window.location.href = '/inicioSolicitarColeta';
        }
    };

    const handleVoltar = () => {
        window.location.href = '/InicioTiposLixo';
    };

    return (
        <div className="app-layout">
            {/* Sidebar Fixa */}
            <Sidebar onMenuSelect={handleMenuSelect} activeMenu={activeMenu} onToggle={handleSidebarToggle} />
            
            {/* Conteúdo Principal */}
            <main className="main-content">
                <div className="content-area container-fluid px-0">
                    
                    {/* Header */}
                    <div className="nomeApp mb-3 ps-0">
                        <h1 className="m-0">RecyTech</h1>
                    </div>

                    {/* Botão Voltar alinhado à esquerda */}
                    <div className="voltar-container mb-4">
                        <button 
                            className="btn-voltar"
                            onClick={handleVoltar}
                        >
                            ← Voltar
                        </button>
                    </div>

                    {/* Título da Página */}
                    <div className="mb-4">
                        <h2 className="titulo-quantidade">Qual a quantidade:</h2>
                    </div>

                    {/* Grid de Quantidades */}
                    <div className="quantidades-container">
                        {quantidades.map((qtd) => (
                            <button
                                key={qtd.id}
                                className={`quantidade-btn ${qtd.selecionado ? 'selecionado' : ''}`}
                                onClick={() => selecionarQuantidade(qtd.id)}
                            >
                                <div className="quantidade-content">
                                    <span className="quantidade-icone">{qtd.icone}</span>
                                    <div className="quantidade-textos">
                                        <span className="quantidade-tipo">{qtd.tipo}</span>
                                        <span className="quantidade-descricao">{qtd.descricao}</span>
                                    </div>
                                    {qtd.selecionado && (
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