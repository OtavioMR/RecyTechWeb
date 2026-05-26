import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.tsx';
import '../../style/cidadao/inicio_solicitar_coleta.css';
import { routesMapCidadao } from "../../routes/routesMap.ts";

interface QuantidadeSelecionada {
    id: string;
    tipo: string;
    descricao: string;
    icone: string;
}

interface TipoLixo {
    id: string;
    label: string;
    icone: string;
}

export default function InicioSolicitarColeta() {
    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState('inicio');
    const [showConfirmacao, setShowConfirmacao] = useState(false);

    const [quantidadeSelecionada, setQuantidadeSelecionada] =
        useState<QuantidadeSelecionada | null>(null);
    const [tiposSelecionados, setTiposSelecionados] = useState<TipoLixo[]>([]);
    const [endereco, setEndereco] = useState({
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        complemento: ''
    });

    // 🔹 Carregar dados do localStorage
    useEffect(() => {
        const quantidadeSalva = localStorage.getItem('quantidadeSelecionada');
        const tiposSalvos = localStorage.getItem('tiposSelecionados');
        const enderecoSalvo = localStorage.getItem('enderecoSelecionado');

        if (quantidadeSalva) {
            try {
                setQuantidadeSelecionada(JSON.parse(quantidadeSalva));
            } catch {
                setQuantidadeSelecionada({
                    id: 'erro',
                    tipo: 'Erro',
                    descricao: 'Falha ao ler',
                    icone: '🚫'
                });
            }
        }

        if (tiposSalvos) {
            try {
                setTiposSelecionados(JSON.parse(tiposSalvos));
            } catch {
                setTiposSelecionados([]);
            }
        }

        if (enderecoSalvo) {
            try {
                setEndereco(JSON.parse(enderecoSalvo));
            } catch {
                console.error("Erro ao ler endereço salvo");
            }
        }
    }, []);

    // 🔹 Navegação SPA
    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);
        if (routesMapCidadao[menu]) navigate(routesMapCidadao[menu]);
    };

    const handleVoltar = () => navigate('/inicioQuantidade');

    // 🔹 Atualizar campos do endereço
    const handleInputChange = (campo: string, valor: string) => {
        setEndereco(prev => ({ ...prev, [campo]: valor }));
    };

    const handleConfirmarSolicitacao = () => setShowConfirmacao(true);
    const handleCancelar = () => setShowConfirmacao(false);

    // 🔹 Confirmar solicitação
    const handleConfirmar = async () => {
        try {
            const solicitacao = {
                endereco,
                tipos: tiposSelecionados,
                quantidade: quantidadeSelecionada,
                usuarioId: '123', // depois pega do token
                usuarioNome: 'Rodrigo' // idem
            };

            console.log('Solicitação enviada:', solicitacao);

            // Futuro: await api.post('/solicitacoes', solicitacao);

            // Limpa cache
            localStorage.removeItem('enderecoSelecionado');
            localStorage.removeItem('tiposSelecionados');
            localStorage.removeItem('quantidadeSelecionada');

            setShowConfirmacao(false);
            alert('Solicitação de coleta confirmada!');
            navigate('/inicioCidadao');
        } catch (err) {
            console.error('Erro ao confirmar coleta:', err);
            alert('Erro ao confirmar coleta');
        }
    };

    const getQuantidadeDisplay = () =>
        quantidadeSelecionada ? `${quantidadeSelecionada.tipo}: ${quantidadeSelecionada.descricao}` : 'Carregando...';

    const getQuantidadeIcone = () =>
        quantidadeSelecionada ? quantidadeSelecionada.icone : '🚫';

    return (
        <div className="app-layout">
            <Sidebar
                onMenuSelect={handleMenuSelect}
                activeMenu={activeMenu}
                onToggle={() => { }}
                perfil="cidadao"
            />


            <main className="main-content">
                <div className="content-area container-fluid px-0">

                    <div className="nomeApp mb-3 ps-0">
                        <h1 className="m-0">RecyTech</h1>
                    </div>

                    <div className="voltar-container mb-4">
                        <button className="btn-voltar" onClick={handleVoltar}>
                            ← Voltar
                        </button>
                    </div>

                    <h2 className="titulo-solicitar mb-4">Solicitar Coleta</h2>

                    <div className="solicitar-container">

                        {/* Quantidade */}
                        <div className="info-section">
                            <h3 className="subtitulo">Quantidade estimada</h3>
                            <div className="info-box quantidade-box">
                                <span className="info-icone">{getQuantidadeIcone()}</span>
                                <span className="info-texto">{getQuantidadeDisplay()}</span>
                            </div>
                        </div>

                        {/* Tipos de lixo */}
                        <div className="info-section">
                            <h3 className="subtitulo">Tipos de lixo selecionados</h3>
                            <ul>
                                {tiposSelecionados.map((tipo) => (
                                    <li key={tipo.id}>{tipo.icone} {tipo.label}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Endereço */}
                        <div className="info-section">
                            <h3 className="subtitulo">Endereço:</h3>
                            {[
                                ["📍", "logradouro", "Logradouro"],
                                ["🔢", "numero", "Número"],
                                ["🏘️", "bairro", "Bairro"],
                                ["🏙️", "cidade", "Cidade"],
                                ["🗺️", "estado", "Estado"],
                                ["📮", "cep", "CEP"],
                                ["📝", "complemento", "Complemento (opcional)"]
                            ].map(([icone, campo, label]) => (
                                <div key={campo} className="input-group">
                                    <span className="input-icone">{icone}</span>
                                    <input
                                        type="text"
                                        placeholder={label as string}
                                        className="form-input"
                                        value={(endereco as any)[campo]}
                                        onChange={(e) => handleInputChange(campo as string, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Botão Confirmar */}
                        <div className="confirmar-container">
                            <button className="btn-confirmar-solicitacao" onClick={handleConfirmarSolicitacao}>
                                Confirmar Solicitação
                            </button>
                        </div>
                    </div>

                    {showConfirmacao && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <h3 className="modal-titulo">Confirmar Solicitação?</h3>
                                <div className="modal-botoes">
                                    <button className="btn-modal-confirmar" onClick={handleConfirmar}>Confirmar</button>
                                    <button className="btn-modal-cancelar" onClick={handleCancelar}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
