import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../style/inicio_tipos_lixo.css';

interface TipoLixo {
  id: string;
  label: string;
  selecionado: boolean;
  cor: string;
  corTexto: string;
  icone: string;
}

export default function InicioTiposLixo() {
    const [activeMenu, setActiveMenu] = useState('inicio');
    const [tiposLixo, setTiposLixo] = useState<TipoLixo[]>([
        { id: 'papel', label: 'Papel', selecionado: false, cor: '#2196F3', corTexto: '#FFFFFF', icone: '📄' },
        { id: 'plastico', label: 'Plástico', selecionado: false, cor: '#F44336', corTexto: '#FFFFFF', icone: '🥤' },
        { id: 'vidro', label: 'Vidro', selecionado: false, cor: '#4CAF50', corTexto: '#FFFFFF', icone: '🍶' },
        { id: 'metais', label: 'Metais', selecionado: false, cor: '#FFEB3B', corTexto: '#666666', icone: '🔩' },
        { id: 'eletronicos', label: 'Eletrónicos', selecionado: false, cor: '#9E9E9E', corTexto: '#FFFFFF', icone: '💻' },
        // Orgânico removido
    ]);

    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);
        console.log('Menu selecionado:', menu);
    };

    const handleSidebarToggle = (collapsed: boolean) => {
        console.log('Sidebar collapsed:', collapsed);
    };

    const toggleTipoLixo = (id: string) => {
        setTiposLixo(prev => prev.map(tipo => 
            tipo.id === id ? { ...tipo, selecionado: !tipo.selecionado } : tipo
        ));
    };

    const handleConfirmar = () => {
        const selecionados = tiposLixo.filter(tipo => tipo.selecionado);
        console.log('Tipos de lixo selecionados:', selecionados);
        
        // Navega para a página de quantidade
        window.location.href = '/inicioQuantidade';
    };

    const handleVoltar = () => {
        // Navegação direta para a tela do cidadão
        window.location.href = '/inicioCidadao';
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
                        <h2 className="titulo-tipos-lixo">Quais o tipo de lixo:</h2>
                    </div>

                    {/* Grid de Tipos de Lixo - Agora em coluna única */}
                    <div className="tipos-lixo-container .">
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
                        <button 
                            className="btn-confirmar"
                            onClick={handleConfirmar}
                        >
                            Confirmar
                        </button>
                    </div>

                    {/* Conteúdo baseado no menu selecionado */}
                    {activeMenu === 'coleta' && (
                        <div className="coleta-content p-3 mt-3 w-100">
                            <h3>Gestão de Coleta</h3>
                            <p>Interface para gerenciar coletas de resíduos</p>
                        </div>
                    )}

                    {activeMenu === 'opcoes' && (
                        <div className="opcoes-content p-3 mt-3 w-100">
                            <h3>Opções do Sistema</h3>
                            <p>Configurações e preferências</p>
                        </div>
                    )}

                    {activeMenu === 'conta' && (
                        <div className="conta-content p-3 mt-3 w-100">
                            <h3>Minha Conta</h3>
                            <p>Gerencie suas informações pessoais</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}