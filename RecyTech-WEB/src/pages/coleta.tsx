import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../style/coleta.css';
import { useNavigate } from 'react-router-dom';

interface Coleta {
  id: string;
  status: 'pendente' | 'concluida';
  prazo?: string;
  dataConclusao?: string;
  tiposLixo: Array<{
    tipo: string;
    quantidade: string;
    icone: string;
    cor: string;
  }>;
  endereco: string;
  catador: string;
  expandida: boolean;
}

export default function Coleta() {

    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState('coleta');
    const [coletas, setColetas] = useState<Coleta[]>([
        {
            id: '1',
            status: 'pendente',
            prazo: '23:59:00 do dia 26/11/2024',
            tiposLixo: [
                { tipo: 'Plástico', quantidade: '15Kg', icone: '🥤', cor: '#F44336' },
                { tipo: 'Vidro', quantidade: '8Kg', icone: '🍶', cor: '#4CAF50' }
            ],
            endereco: 'Rua das Flores, 123 - Centro, São Paulo - SP',
            catador: 'João Silva',
            expandida: false
        },
        {
            id: '2',
            status: 'concluida',
            dataConclusao: '14/11/2024 às 14:30',
            tiposLixo: [
                { tipo: 'Metais', quantidade: '25Kg', icone: '🔩', cor: '#FFEB3B' },
                { tipo: 'Papel', quantidade: '12Kg', icone: '📄', cor: '#2196F3' },
                { tipo: 'Eletrônicos', quantidade: '5Kg', icone: '💻', cor: '#9E9E9E' }
            ],
            endereco: 'Av. Principal, 456 - Jardim, Rio de Janeiro - RJ',
            catador: 'Maria Santos',
            expandida: false
        },
        {
            id: '3',
            status: 'concluida',
            prazo: '18:00 do dia 16/11/2024',
            tiposLixo: [
                { tipo: 'Vidro', quantidade: '20Kg', icone: '🍶', cor: '#4CAF50' }
            ],
            endereco: 'Travessa da Paz, 789 - Vila Nova, Belo Horizonte - MG',
            catador: 'Pedro Oliveira',
            expandida: false
        }
    ]);

    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);
        console.log('Menu selecionado:', menu);
        
        // Navegação completa
        if (menu === 'inicio') {
            navigate( '/inicioCidadao');
        }
        if (menu === 'opcoes') {
            navigate( '/opcoes');
        }
        if (menu === 'conta') {
            navigate( '/conta');
        }
        // 'coleta' - não faz nada, já está na página
    };

    const handleSidebarToggle = (collapsed: boolean) => {
        console.log('Sidebar collapsed:', collapsed);
    };

    const toggleExpansao = (id: string) => {
        setColetas(prev => prev.map(coleta => 
            coleta.id === id 
                ? { ...coleta, expandida: !coleta.expandida }
                : coleta
        ));
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

                    {/* Título da Página */}
                    <div className="mb-4">
                        <h2 className="titulo-coleta">Minhas Coletas:</h2>
                    </div>

                    {/* Lista de Coletas */}
                    <div className="coletas-container">
                        {coletas.length === 0 ? (
                            <div className="nenhuma-coleta">
                                <p>Nenhuma coleta confirmada ainda.</p>
                            </div>
                        ) : (
                            coletas.map((coleta) => (
                                <div 
                                    key={coleta.id} 
                                    className={`coleta-card ${coleta.expandida ? 'expandida' : ''}`}
                                    onClick={() => toggleExpansao(coleta.id)}
                                >
                                    {/* Status da Coleta */}
                                    <div className="coleta-status">
                                        <span className={`status-badge ${coleta.status}`}>
                                            {coleta.status === 'pendente' ? '🟡 Coleta Em Andamento' : '🟢 Coleta Concluída'}
                                        </span>
                                        <span className="seta">
                                            {coleta.expandida ? '▲' : '▼'}
                                        </span>
                                    </div>

                                    {/* Prazo ou Data de Conclusão */}
                                    <div className="coleta-info">
                                        {coleta.status === 'concluida' ? (
                                            <p className="prazo">📅 Prazo até {coleta.prazo}</p>
                                        ) : (
                                            <p className="conclusao">✅ Coleta feita em {coleta.dataConclusao}</p>
                                        )}
                                    </div>

                                    {/* Tipos de Lixo */}
                                    <div className="tipos-lixo">
                                        {coleta.tiposLixo.map((lixo, index) => (
                                            <div key={index} className="tipo-lixo-item">
                                                <span 
                                                    className="lixo-icone"
                                                    style={{ backgroundColor: lixo.cor }}
                                                >
                                                    {lixo.icone}
                                                </span>
                                                <span className="lixo-info">
                                                    {lixo.tipo} - {lixo.quantidade}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Informações Expandidas */}
                                    {coleta.expandida && (
                                        <div className="informacoes-expandidas">
                                            <div className="info-item">
                                                <span className="info-label">📍 Endereço:</span>
                                                <span className="info-value">{coleta.endereco}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">👤 Catador responsável:</span>
                                                <span className="info-value">{coleta.catador}</span>
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