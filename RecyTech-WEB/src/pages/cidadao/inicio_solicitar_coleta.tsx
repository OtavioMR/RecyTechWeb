import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.tsx';
import '../../style/cidadao/inicio_solicitar_coleta.css';
import { routesMapCidadao } from "../../routes/routesMap.ts";
import { storageService } from '../../services/storageService.ts';
import { coletaService } from '../../services/cidadao/coletaService.ts';
import type { EnderecoInput } from '../../types/types.ts';
import { ABComparisonHeader } from '../../components/ABComparisonHeader.tsx';

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
    const [salvando, setSalvando] = useState(false);

    const [quantidadeSelecionada, setQuantidadeSelecionada] =
        useState<QuantidadeSelecionada | null>(null);
    const [tiposSelecionados, setTiposSelecionados] = useState<TipoLixo[]>([]);
    const [endereco, setEndereco] = useState<EnderecoInput>({
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: 'Cotia',
        estado: 'SP',
        cep: '',
        complemento: ''
    });

    useEffect(() => {
        const enderecos = storageService.getEnderecos();
        const draft = storageService.getDraftColeta();

        // Quantidade
        if (draft.quantidade) {
            setQuantidadeSelecionada(draft.quantidade as QuantidadeSelecionada);
        } else {
            const quantidadeSalva = localStorage.getItem('quantidadeSelecionada');
            if (quantidadeSalva) {
                try {
                    setQuantidadeSelecionada(JSON.parse(quantidadeSalva));
                } catch {
                    setQuantidadeSelecionada({ id: 'medio', tipo: 'Médio', descricao: 'Até 50 Kg', icone: '♻️♻️' });
                }
            } else {
                setQuantidadeSelecionada({ id: 'pouco', tipo: 'Pouco', descricao: 'Até 15 Kg', icone: '♻️' });
            }
        }

        // Tipos de Lixo
        if (draft.tipos && draft.tipos.length > 0) {
            setTiposSelecionados(draft.tipos as TipoLixo[]);
        } else {
            const tiposSalvos = localStorage.getItem('tiposSelecionados');
            if (tiposSalvos) {
                try {
                    setTiposSelecionados(JSON.parse(tiposSalvos));
                } catch {
                    setTiposSelecionados([{ id: 'plastico', label: 'Plástico', icone: '🥤' }]);
                }
            } else {
                setTiposSelecionados([{ id: 'plastico', label: 'Plástico', icone: '🥤' }]);
            }
        }

        // Endereço
        if (draft.endereco) {
            const e = draft.endereco as any;
            setEndereco({
                logradouro: e.logradouro || e.endereco || '',
                numero: e.numero || '',
                bairro: e.bairro || '',
                cidade: e.cidade || 'Cotia',
                estado: e.estado || 'SP',
                cep: e.cep || '',
                complemento: e.complemento || ''
            });
        } else if (enderecos.length > 0) {
            const primeiro = enderecos[0];
            setEndereco({
                logradouro: primeiro.logradouro,
                numero: primeiro.numero,
                bairro: primeiro.bairro,
                cidade: primeiro.cidade,
                estado: primeiro.estado,
                cep: primeiro.cep,
                complemento: primeiro.complemento || ''
            });
        }
    }, []);

    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);
        if (routesMapCidadao[menu]) navigate(routesMapCidadao[menu]);
    };

    const handleVoltar = () => navigate('/inicioQuantidade');

    const handleConfirmar = async () => {
        try {
            setSalvando(true);
            const dadosParaSalvar = {
                endereco,
                tipos: tiposSelecionados,
                quantidade: quantidadeSelecionada
            };

            await coletaService.criar(dadosParaSalvar);
            storageService.clearDraftColeta();
            navigate('/coleta');
        } catch (err) {
            console.error('Erro ao confirmar coleta:', err);
            alert('Erro ao salvar coleta localmente');
        } finally {
            setSalvando(false);
        }
    };

    return (
        <div className="app-layout">
            <Sidebar
                onMenuSelect={handleMenuSelect}
                activeMenu={activeMenu}
                onToggle={() => {}}
                perfil="cidadao"
            />

            <main className="main-content">
                <div className="content-area container-fluid px-0" style={{ maxWidth: '680px', margin: '0 auto' }}>
                    {/* Header Limpo */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h2 className="titulo-coleta">Revisar Solicitação</h2>
                        <span className="badge bg-light text-muted border">Passo 4 de 4</span>
                    </div>

                    {/* Switcher A/B Minimalista */}
                    <ABComparisonHeader currentVariant="A" />

                    {/* Card de Resumo Limpo */}
                    <div className="p-4 bg-white border rounded shadow-sm mb-4">
                        <div className="mb-3 pb-3 border-bottom">
                            <span className="text-muted small text-uppercase fw-bold d-block mb-1">📍 Endereço de Retirada</span>
                            <strong className="fs-6 text-dark d-block">
                                {endereco.logradouro}, {endereco.numero} {endereco.complemento ? `(${endereco.complemento})` : ''}
                            </strong>
                            <small className="text-muted">{endereco.bairro} — {endereco.cidade}/{endereco.estado}</small>
                        </div>

                        <div className="mb-3 pb-3 border-bottom">
                            <span className="text-muted small text-uppercase fw-bold d-block mb-1">♻️ Volume Estimado</span>
                            <strong className="fs-6 text-dark">
                                {quantidadeSelecionada ? `${quantidadeSelecionada.tipo}: ${quantidadeSelecionada.descricao}` : 'Até 15 Kg'}
                            </strong>
                        </div>

                        <div>
                            <span className="text-muted small text-uppercase fw-bold d-block mb-2">📦 Materiais Selecionados</span>
                            <div className="d-flex flex-wrap gap-2">
                                {tiposSelecionados.map((tipo) => (
                                    <span key={tipo.id} className="badge bg-light text-dark border px-3 py-2 fs-6">
                                        {tipo.icone} {tipo.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="d-flex justify-content-between align-items-center gap-2">
                        <button className="btn btn-outline-secondary" onClick={handleVoltar}>
                            ← Voltar
                        </button>
                        <button
                            className="btn btn-success px-4 py-2 fw-bold"
                            onClick={handleConfirmar}
                            disabled={salvando}
                        >
                            {salvando ? 'Salvando...' : 'Confirmar Coleta ✓'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
