import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../style/conta.css';

interface Endereco {
  id: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string;
}

export default function Conta() {
    const [activeMenu, setActiveMenu] = useState('conta');
    const [mostrarFormEndereco, setMostrarFormEndereco] = useState(false);
    const [editandoEmail, setEditandoEmail] = useState(false);
    const [editandoTelefone, setEditandoTelefone] = useState(false);
    
    // Dados fictícios - depois virão do back-end
    const [dadosUsuario, setDadosUsuario] = useState({
        nomeUsuario: 'joaosilva123',
        email: 'joao.silva@gmail.com',
        telefone: '(11) 98765-4321'
    });

    const [enderecos, setEnderecos] = useState<Endereco[]>([
        {
            id: '1',
            logradouro: 'Rua das Flores',
            numero: '123',
            bairro: 'Centro',
            cidade: 'São Paulo',
            estado: 'SP',
            cep: '01234-567',
            complemento: 'Apto 45'
        }
    ]);

    const [novoEndereco, setNovoEndereco] = useState({
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        complemento: ''
    });

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
        if (menu === 'coleta') {
            window.location.href = '/coleta';
        }
    };

    const handleSidebarToggle = (collapsed: boolean) => {
        console.log('Sidebar collapsed:', collapsed);
    };

    const handleInputChange = (campo: string, valor: string) => {
        setNovoEndereco(prev => ({
            ...prev,
            [campo]: valor
        }));
    };

    const handleAdicionarEndereco = () => {
        if (novoEndereco.logradouro && novoEndereco.numero && novoEndereco.bairro && 
            novoEndereco.cidade && novoEndereco.estado && novoEndereco.cep) {
            
            const endereco: Endereco = {
                id: Date.now().toString(),
                ...novoEndereco
            };
            
            setEnderecos(prev => [...prev, endereco]);
            setNovoEndereco({
                logradouro: '',
                numero: '',
                bairro: '',
                cidade: '',
                estado: '',
                cep: '',
                complemento: ''
            });
            setMostrarFormEndereco(false);
            alert('Endereço adicionado com sucesso!');
        } else {
            alert('Preencha todos os campos obrigatórios!');
        }
    };

    const handleSalvarEmail = () => {
        // Aqui você pode adicionar a lógica para salvar no back-end
        setEditandoEmail(false);
        alert('Email alterado com sucesso!');
    };

    const handleSalvarTelefone = () => {
        // Aqui você pode adicionar a lógica para salvar no back-end
        setEditandoTelefone(false);
        alert('Telefone alterado com sucesso!');
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
                        <h2 className="titulo-conta">Minha Conta</h2>
                    </div>

                    {/* Conteúdo da Conta */}
                    <div className="conta-container">
                        
                        {/* Informações do Usuário */}
                        <div className="info-section">
                            <h3 className="subtitulo">Informações Pessoais</h3>
                            
                            {/* Nome de Usuário */}
                            <div className="info-item">
                                <label className="info-label">Nome de usuário</label>
                                <div className="info-box">
                                    <span className="info-value">{dadosUsuario.nomeUsuario}</span>
                                </div>
                                <span className="info-observacao">nome de usuário não poderá ser alterado</span>
                            </div>

                            {/* Email */}
                            <div className="info-item">
                                <label className="info-label">Email</label>
                                <div className="info-box">
                                    {editandoEmail ? (
                                        <div className="edicao-container">
                                            <input
                                                type="email"
                                                value={dadosUsuario.email}
                                                onChange={(e) => setDadosUsuario(prev => ({
                                                    ...prev,
                                                    email: e.target.value
                                                }))}
                                                className="input-edicao"
                                            />
                                            <button 
                                                className="btn-salvar"
                                                onClick={handleSalvarEmail}
                                            >
                                                Salvar
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="info-value">{dadosUsuario.email}</span>
                                            <button 
                                                className="btn-alterar"
                                                onClick={() => setEditandoEmail(true)}
                                            >
                                                Alterar
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Telefone */}
                            <div className="info-item">
                                <label className="info-label">Telefone</label>
                                <div className="info-box">
                                    {editandoTelefone ? (
                                        <div className="edicao-container">
                                            <input
                                                type="tel"
                                                value={dadosUsuario.telefone}
                                                onChange={(e) => setDadosUsuario(prev => ({
                                                    ...prev,
                                                    telefone: e.target.value
                                                }))}
                                                className="input-edicao"
                                            />
                                            <button 
                                                className="btn-salvar"
                                                onClick={handleSalvarTelefone}
                                            >
                                                Salvar
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="info-value">{dadosUsuario.telefone}</span>
                                            <button 
                                                className="btn-alterar"
                                                onClick={() => setEditandoTelefone(true)}
                                            >
                                                Alterar
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Endereços */}
                        <div className="info-section">
                            <h3 className="subtitulo">Endereços Cadastrados</h3>
                            
                            {enderecos.map((endereco) => (
                                <div key={endereco.id} className="endereco-card">
                                    <div className="endereco-info">
                                        <strong>{endereco.logradouro}, {endereco.numero}</strong>
                                        <br />
                                        {endereco.bairro} - {endereco.cidade}/{endereco.estado}
                                        <br />
                                        CEP: {endereco.cep}
                                        {endereco.complemento && (
                                            <>
                                                <br />
                                                Complemento: {endereco.complemento}
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Formulário de Novo Endereço */}
                            {mostrarFormEndereco && (
                                <div className="form-endereco">
                                    <h4 className="subtitulo-form">Adicionar Novo Endereço</h4>
                                    
                                    <div className="input-group">
                                        <span className="input-icone">📍</span>
                                        <input
                                            type="text"
                                            placeholder="Logradouro"
                                            className="form-input"
                                            value={novoEndereco.logradouro}
                                            onChange={(e) => handleInputChange('logradouro', e.target.value)}
                                        />
                                    </div>

                                    <div className="input-group">
                                        <span className="input-icone">🔢</span>
                                        <input
                                            type="text"
                                            placeholder="Número"
                                            className="form-input"
                                            value={novoEndereco.numero}
                                            onChange={(e) => handleInputChange('numero', e.target.value)}
                                        />
                                    </div>

                                    <div className="input-group">
                                        <span className="input-icone">🏘️</span>
                                        <input
                                            type="text"
                                            placeholder="Bairro"
                                            className="form-input"
                                            value={novoEndereco.bairro}
                                            onChange={(e) => handleInputChange('bairro', e.target.value)}
                                        />
                                    </div>

                                    <div className="input-group">
                                        <span className="input-icone">🏙️</span>
                                        <input
                                            type="text"
                                            placeholder="Cidade"
                                            className="form-input"
                                            value={novoEndereco.cidade}
                                            onChange={(e) => handleInputChange('cidade', e.target.value)}
                                        />
                                    </div>

                                    <div className="input-group">
                                        <span className="input-icone">🗺️</span>
                                        <input
                                            type="text"
                                            placeholder="Estado"
                                            className="form-input"
                                            value={novoEndereco.estado}
                                            onChange={(e) => handleInputChange('estado', e.target.value)}
                                        />
                                    </div>

                                    <div className="input-group">
                                        <span className="input-icone">📮</span>
                                        <input
                                            type="text"
                                            placeholder="CEP"
                                            className="form-input"
                                            value={novoEndereco.cep}
                                            onChange={(e) => handleInputChange('cep', e.target.value)}
                                        />
                                    </div>

                                    <div className="input-group">
                                        <span className="input-icone">📝</span>
                                        <input
                                            type="text"
                                            placeholder="Complemento (opcional)"
                                            className="form-input"
                                            value={novoEndereco.complemento}
                                            onChange={(e) => handleInputChange('complemento', e.target.value)}
                                        />
                                    </div>

                                    <div className="botoes-form">
                                        <button 
                                            className="btn-cancelar"
                                            onClick={() => setMostrarFormEndereco(false)}
                                        >
                                            Cancelar
                                        </button>
                                        <button 
                                            className="btn-adicionar"
                                            onClick={handleAdicionarEndereco}
                                        >
                                            Adicionar Endereço
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Botão para mostrar formulário */}
                            {!mostrarFormEndereco && (
                                <button 
                                    className="btn-adicionar-endereco"
                                    onClick={() => setMostrarFormEndereco(true)}
                                >
                                    + Adicionar Endereço
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Conteúdo baseado no menu selecionado */}
                    {activeMenu === 'inicio' && (
                        <div className="inicio-content p-3 mt-3 w-100">
                            <h3>Página Inicial</h3>
                            <p>Voltar para a página inicial</p>
                        </div>
                    )}

                    {activeMenu === 'opcoes' && (
                        <div className="opcoes-content p-3 mt-3 w-100">
                            <h3>Opções do Sistema</h3>
                            <p>Configurações e preferências</p>
                        </div>
                    )}

                    {activeMenu === 'coleta' && (
                        <div className="coleta-content p-3 mt-3 w-100">
                            <h3>Minhas Coletas</h3>
                            <p>Gerencie suas coletas de resíduos</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}