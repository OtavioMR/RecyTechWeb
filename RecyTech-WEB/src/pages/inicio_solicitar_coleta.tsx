import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { api } from '../services/api';
import '../style/inicio_solicitar_coleta.css';

interface QuantidadeSelecionada {
    id: string;
    tipo: string;
    descricao: string;
    selecionado: boolean;
    icone: string;
}

export default function InicioSolicitarColeta() {
    // Estado do menu lateral
    const [activeMenu, setActiveMenu] = useState('inicio');

    // Controle do modal de confirmação
    const [showConfirmacao, setShowConfirmacao] = useState(false);

    // Quantidade de itens vinda do localStorage
    const [quantidadeSelecionada, setQuantidadeSelecionada] =
        useState<QuantidadeSelecionada | null>(null);

    // Endereço vindo do backend
    const [endereco, setEndereco] = useState({
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        complemento: ''
    });

    // Carrega quantidade armazenada no localStorage
    useEffect(() => {
        const quantidadeSalva = localStorage.getItem('quantidadeSelecionada');

        if (quantidadeSalva) {
            try {
                setQuantidadeSelecionada(JSON.parse(quantidadeSalva));
            } catch {
                setQuantidadeSelecionada({
                    id: 'medio',
                    tipo: 'Erro',
                    descricao: 'Falha ao ler',
                    selecionado: true,
                    icone: '🚫'
                });
            }
        }
    }, []);

    // Busca endereço do usuário usando a rota correta
    useEffect(() => {
        const fetchEndereco = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await api.get(
                    "/endereco-usuario/meus-enderecos",
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const lista = response.data;

                if (!Array.isArray(lista) || lista.length === 0) {
                    console.warn("Nenhum endereço encontrado.");
                    return;
                }

                const e = lista[0]; // PEGA O PRIMEIRO ENDEREÇO

                setEndereco({
                    logradouro: e.logradouro || '',
                    numero: e.numero || '',
                    bairro: e.bairro || '',
                    cidade: e.cidade || '',
                    estado: e.estado || '',
                    cep: e.cep || '',
                    complemento: e.complemento || ''
                });

            } catch (error) {
                console.error("Erro ao buscar endereço do usuário:", error);
            }
        };

        fetchEndereco();
    }, []);


    // Navegação do menu lateral (sim, você ainda usa reload, mas isso é outra novela)
    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);

        if (menu === 'opcoes') window.location.href = '/opcoes';
        if (menu === 'coleta') window.location.href = '/coleta';
        if (menu === 'conta') window.location.href = '/conta';
    };

    const handleVoltar = () => window.location.href = '/inicioQuantidade';

    // Atualiza campos do endereço quando o usuário editar manualmente
    const handleInputChange = (campo: string, valor: string) => {
        setEndereco(prev => ({ ...prev, [campo]: valor }));
    };

    const handleConfirmarSolicitacao = () => setShowConfirmacao(true);
    const handleCancelar = () => setShowConfirmacao(false);

    const handleConfirmar = () => {
        console.log('Solicitação confirmada:', { quantidade: quantidadeSelecionada, endereco });
        alert('Solicitação de coleta confirmada!');
        localStorage.removeItem('quantidadeSelecionada');
        setShowConfirmacao(false);
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

                        <div className="info-section">
                            <h3 className="subtitulo">Quantidade estimada</h3>
                            <div className="info-box quantidade-box">
                                <span className="info-icone">{getQuantidadeIcone()}</span>
                                <span className="info-texto">{getQuantidadeDisplay()}</span>
                            </div>
                        </div>

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
