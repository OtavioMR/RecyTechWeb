import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../style/inicio_solicitar_coleta.css';

interface QuantidadeSelecionada {
    id: string;
    tipo: string;
    descricao: string;
    selecionado: boolean;
    icone: string;
}

export default function InicioSolicitarColeta() {
    const [activeMenu, setActiveMenu] = useState('inicio');
    const [showConfirmacao, setShowConfirmacao] = useState(false);
    const [quantidadeSelecionada, setQuantidadeSelecionada] = useState<QuantidadeSelecionada | null>(null);
    const [endereco, setEndereco] = useState({
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '', // NOVO CAMPO CEP
        complemento: ''
    });

    // Lê a quantidade do localStorage quando o componente carrega
    useEffect(() => {
        const quantidadeSalva = localStorage.getItem('quantidadeSelecionada');
        if (quantidadeSalva) {
            try {
                const quantidade = JSON.parse(quantidadeSalva);
                setQuantidadeSelecionada(quantidade);
            } catch (error) {
                console.error('Erro ao ler quantidade do localStorage:', error);
                // Valor padrão caso ocorra erro
                setQuantidadeSelecionada({
                    id: 'medio',
                    tipo: 'Erro',
                    descricao: 'Deu erro',
                    selecionado: true,
                    icone: '🚫'
                });
            }
        } else {
            // Valor padrão caso não tenha quantidade salva
            setQuantidadeSelecionada({
                id: 'medio',
                tipo: 'Não selecionado',
                descricao: 'Selecione primeiro',
                selecionado: true,
                icone: '🚫'
            });
        }
    }, []);

const handleMenuSelect = (menu: string) => {
    setActiveMenu(menu);
    console.log('Menu selecionado:', menu);
    
    // Navegação entre páginas
    if (menu === 'inicio') {
        window.location.href = '/inicioCidadao';
    }
    if (menu === 'opcoes') {
        window.location.href = '/opcoes';
    }
};

    const handleSidebarToggle = (collapsed: boolean) => {
        console.log('Sidebar collapsed:', collapsed);
    };

    const handleVoltar = () => {
        window.location.href = '/inicioQuantidade';
    };

    const handleInputChange = (campo: string, valor: string) => {
        setEndereco(prev => ({
            ...prev,
            [campo]: valor
        }));
    };

    const handleConfirmarSolicitacao = () => {
        setShowConfirmacao(true);
    };

    const handleConfirmar = () => {
        console.log('Solicitação confirmada:', { 
            quantidade: quantidadeSelecionada, 
            endereco 
        });
        setShowConfirmacao(false);
        // Aqui você pode adicionar a lógica para enviar para o back-end
        alert('Solicitação de coleta confirmada!');
        
        // Limpa a quantidade do localStorage após o uso
        localStorage.removeItem('quantidadeSelecionada');
    };

    const handleCancelar = () => {
        setShowConfirmacao(false);
    };

    const getQuantidadeDisplay = () => {
        if (!quantidadeSelecionada) return 'Carregando...';
        return `${quantidadeSelecionada.tipo}: ${quantidadeSelecionada.descricao}`;
    };

    const getQuantidadeIcone = () => {
        if (!quantidadeSelecionada) return '🚫';
        return quantidadeSelecionada.icone;
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

                    {/* Botão Voltar */}
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
                        <h2 className="titulo-solicitar">Solicitar Coleta</h2>
                    </div>

                    {/* Conteúdo Principal */}
                    <div className="solicitar-container">
                        
                        {/* Quantidade Estimada */}
                        <div className="info-section">
                            <h3 className="subtitulo">Quantidade estimada</h3>
                            <div className="info-box quantidade-box">
                                <span className="info-icone">{getQuantidadeIcone()}</span>
                                <span className="info-texto">{getQuantidadeDisplay()}</span>
                            </div>
                        </div>

                        {/* Endereço */}
                        <div className="info-section">
                            <h3 className="subtitulo">Endereço:</h3>
                            
                            <div className="input-group">
                                <span className="input-icone">📍</span>
                                <input
                                    type="text"
                                    placeholder="Logradouro"
                                    className="form-input"
                                    value={endereco.logradouro}
                                    onChange={(e) => handleInputChange('logradouro', e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <span className="input-icone">🔢</span>
                                <input
                                    type="text"
                                    placeholder="Número"
                                    className="form-input"
                                    value={endereco.numero}
                                    onChange={(e) => handleInputChange('numero', e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <span className="input-icone">🏘️</span>
                                <input
                                    type="text"
                                    placeholder="Bairro"
                                    className="form-input"
                                    value={endereco.bairro}
                                    onChange={(e) => handleInputChange('bairro', e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <span className="input-icone">🏙️</span>
                                <input
                                    type="text"
                                    placeholder="Cidade"
                                    className="form-input"
                                    value={endereco.cidade}
                                    onChange={(e) => handleInputChange('cidade', e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <span className="input-icone">🗺️</span>
                                <input
                                    type="text"
                                    placeholder="Estado"
                                    className="form-input"
                                    value={endereco.estado}
                                    onChange={(e) => handleInputChange('estado', e.target.value)}
                                />
                            </div>

                            {/* NOVO CAMPO CEP */}
                            <div className="input-group">
                                <span className="input-icone">📮</span>
                                <input
                                    type="text"
                                    placeholder="CEP"
                                    className="form-input"
                                    value={endereco.cep}
                                    onChange={(e) => handleInputChange('cep', e.target.value)}
                                    maxLength={9}
                                />
                            </div>

                            <div className="input-group">
                                <span className="input-icone">📝</span>
                                <input
                                    type="text"
                                    placeholder="Complemento (opcional)"
                                    className="form-input"
                                    value={endereco.complemento}
                                    onChange={(e) => handleInputChange('complemento', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Botão Confirmar Solicitação */}
                        <div className="confirmar-container">
                            <button 
                                className="btn-confirmar-solicitacao"
                                onClick={handleConfirmarSolicitacao}
                            >
                                Confirmar Solicitação
                            </button>
                        </div>
                    </div>

                    {/* Modal de Confirmação */}
                    {showConfirmacao && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <h3 className="modal-titulo">Confirmar Solicitação?</h3>
                                <div className="modal-botoes">
                                    <button 
                                        className="btn-modal-confirmar"
                                        onClick={handleConfirmar}
                                    >
                                        Confirmar
                                    </button>
                                    <button 
                                        className="btn-modal-cancelar"
                                        onClick={handleCancelar}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

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