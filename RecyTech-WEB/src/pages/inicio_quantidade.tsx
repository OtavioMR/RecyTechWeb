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
    const [quantidades, setQuantidades] = useState<Quantidade[]>([
        { id: 'pouco', tipo: 'Pouco', descricao: 'Até 15 Kg', selecionado: false, icone: '♻️' },
        { id: 'medio', tipo: 'Médio', descricao: 'Até 50 Kg', selecionado: false, icone: '♻️♻️' },
        { id: 'grande', tipo: 'Grande', descricao: '+50 Kg', selecionado: false, icone: '♻️♻️♻️' },
    ]);

    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);
        console.log('Menu selecionado:', menu);
    };

    const handleSidebarToggle = (collapsed: boolean) => {
        console.log('Sidebar collapsed:', collapsed);
    };

    const selecionarQuantidade = (id: string) => {
        setQuantidades(prev => prev.map(qtd => 
            qtd.id === id 
                ? { ...qtd, selecionado: true }
                : { ...qtd, selecionado: false }
        ));
        
        // Aqui você pode adicionar a navegação para a próxima página
        console.log('Quantidade selecionada:', id);
        // Exemplo: navigate('/proxima-pagina');
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