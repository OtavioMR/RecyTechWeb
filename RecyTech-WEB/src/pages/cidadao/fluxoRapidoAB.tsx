import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.tsx';
import '../../style/cidadao/fluxoRapidoAB.css';
import { routesMapCidadao } from '../../routes/routesMap.ts';
import { lixoMap } from '../../utils/lixoMap.ts';
import { storageService } from '../../services/storageService.ts';
import { coletaService } from '../../services/cidadao/coletaService.ts';
import type { Endereco, EnderecoInput } from '../../types/types.ts';
import { ABComparisonHeader } from '../../components/ABComparisonHeader.tsx';

interface OpcaoQuantidade {
    id: string;
    titulo: string;
    descricao: string;
    icone: string;
}

const OPCOES_QUANTIDADE: OpcaoQuantidade[] = [
    { id: 'pequena', titulo: 'Pequena', descricao: 'Até 15 Kg (1 sacola)', icone: '♻️' },
    { id: 'media', titulo: 'Média', descricao: 'Até 50 Kg (1 caixa)', icone: '♻️♻️' },
    { id: 'grande', titulo: 'Grande', descricao: '+50 Kg (vários volumes)', icone: '♻️♻️♻️' },
];

export default function FluxoRapidoAB() {
    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState('inicio');
    const [materiaisSelecionados, setMateriaisSelecionados] = useState<string[]>(['Plástico']);
    const [quantidadeSelecionada, setQuantidadeSelecionada] = useState<string>('pequena');
    const [enderecos, setEnderecos] = useState<Endereco[]>([]);
    const [enderecoSelecionadoId, setEnderecoSelecionadoId] = useState<string>('');
    const [mostrarFormNovoEndereco, setMostrarFormNovoEndereco] = useState(false);
    const [salvando, setSalvando] = useState(false);

    const [novoEndereco, setNovoEndereco] = useState<EnderecoInput>({
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: 'Cotia',
        estado: 'SP',
        cep: '',
        complemento: ''
    });

    useEffect(() => {
        const dados = storageService.getEnderecos();
        setEnderecos(dados);
        if (dados.length > 0) {
            setEnderecoSelecionadoId(dados[0].id);
        }
    }, []);

    const toggleMaterial = (tipo: string) => {
        setMateriaisSelecionados(prev =>
            prev.includes(tipo)
                ? prev.filter(t => t !== tipo)
                : [...prev, tipo]
        );
    };

    const handleSalvarNovoEndereco = (e: React.FormEvent) => {
        e.preventDefault();
        if (!novoEndereco.logradouro.trim() || !novoEndereco.numero.trim() || !novoEndereco.bairro.trim()) {
            alert('Por favor, preencha logradouro, número e bairro.');
            return;
        }

        const criado = storageService.addEndereco(novoEndereco);
        setEnderecos(storageService.getEnderecos());
        setEnderecoSelecionadoId(criado.id);
        setMostrarFormNovoEndereco(false);
        setNovoEndereco({
            logradouro: '',
            numero: '',
            bairro: '',
            cidade: 'Cotia',
            estado: 'SP',
            cep: '',
            complemento: ''
        });
    };

    const handleConfirmarColeta = async () => {
        if (materiaisSelecionados.length === 0) {
            alert('Selecione ao menos 1 tipo de material.');
            return;
        }

        const enderecoEscolhido = enderecos.find(e => e.id === enderecoSelecionadoId);
        if (!enderecoEscolhido) {
            alert('Selecione um endereço de retirada.');
            return;
        }

        const qtdObj = OPCOES_QUANTIDADE.find(q => q.id === quantidadeSelecionada);
        const qtdTexto = qtdObj ? `${qtdObj.titulo} (${qtdObj.descricao})` : '15Kg';

        const tiposLixoPayload = materiaisSelecionados.map(tipo => ({
            tipo,
            quantidade: qtdTexto
        }));

        try {
            setSalvando(true);
            await coletaService.criar({
                tiposLixo: tiposLixoPayload,
                endereco: enderecoEscolhido,
                cidade: enderecoEscolhido.cidade,
                bairro: enderecoEscolhido.bairro
            });

            navigate('/coleta');
        } catch (error) {
            console.error('Erro ao agendar coleta:', error);
            alert('Erro ao salvar sua solicitação.');
        } finally {
            setSalvando(false);
        }
    };

    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);
        if (routesMapCidadao[menu]) navigate(routesMapCidadao[menu]);
    };

    const enderecoAtivo = enderecos.find(e => e.id === enderecoSelecionadoId);

    const tiposDisponiveis = Object.keys(lixoMap).filter(k =>
        ['Papel', 'Plástico', 'Vidro', 'Metal', 'Eletrônico', 'Madeira', 'Orgânico'].includes(k)
    );

    return (
        <div className="app-layout">
            <Sidebar
                onMenuSelect={handleMenuSelect}
                activeMenu={activeMenu}
                onToggle={() => {}}
                perfil="cidadao"
            />

            <main className="main-content">
                <div className="content-area container-fluid px-0">
                    <div className="fluxo-rapido-container" style={{ maxWidth: '680px', margin: '0 auto' }}>
                        
                        {/* Header Limpo */}
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h2 className="titulo-coleta">Solicitação Rápida</h2>
                            <span className="badge bg-success-subtle text-success border border-success">Tela Única</span>
                        </div>

                        {/* Switcher A/B Minimalista */}
                        <ABComparisonHeader currentVariant="B" />

                        {/* 1. Materiais */}
                        <section className="bloco-secao">
                            <div className="bloco-titulo">
                                <span className="bloco-numero">1</span>
                                <span>O que vai descartar?</span>
                            </div>

                            <div className="chips-grid">
                                {tiposDisponiveis.map(tipo => {
                                    const itemVisual = lixoMap[tipo] || { cor: '#4CAF50', icone: '♻️' };
                                    const isSelecionado = materiaisSelecionados.includes(tipo);

                                    return (
                                        <div
                                            key={tipo}
                                            className={`chip-material ${isSelecionado ? 'selecionado' : ''}`}
                                            onClick={() => toggleMaterial(tipo)}
                                        >
                                            <span className="chip-icone">{itemVisual.icone}</span>
                                            <span className="chip-nome">{tipo}</span>
                                            {isSelecionado && <span className="chip-check">✓</span>}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* 2. Quantidade */}
                        <section className="bloco-secao">
                            <div className="bloco-titulo">
                                <span className="bloco-numero">2</span>
                                <span>Volume aproximado</span>
                            </div>

                            <div className="quantidades-grid">
                                {OPCOES_QUANTIDADE.map(opcao => {
                                    const isSelecionado = quantidadeSelecionada === opcao.id;
                                    return (
                                        <div
                                            key={opcao.id}
                                            className={`card-quantidade ${isSelecionado ? 'selecionado' : ''}`}
                                            onClick={() => setQuantidadeSelecionada(opcao.id)}
                                        >
                                            <span className="card-qtd-icone">{opcao.icone}</span>
                                            <div className="card-qtd-info">
                                                <h4>{opcao.titulo}</h4>
                                                <p>{opcao.descricao}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* 3. Endereço */}
                        <section className="bloco-secao">
                            <div className="bloco-titulo">
                                <span className="bloco-numero">3</span>
                                <span>Onde retirar?</span>
                            </div>

                            <div className="enderecos-grid">
                                {enderecos.map(e => {
                                    const isSelecionado = enderecoSelecionadoId === e.id;
                                    return (
                                        <div
                                            key={e.id}
                                            className={`card-endereco-radio ${isSelecionado ? 'selecionado' : ''}`}
                                            onClick={() => setEnderecoSelecionadoId(e.id)}
                                        >
                                            <div className="radio-indicator">
                                                {isSelecionado && <div className="radio-dot" />}
                                            </div>
                                            <div className="card-endereco-info">
                                                <div className="titulo-rua">
                                                    📍 {e.logradouro}, {e.numero} {e.complemento ? `(${e.complemento})` : ''}
                                                </div>
                                                <div className="detalhe-cidade">
                                                    {e.bairro} — {e.cidade}/{e.estado}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {!mostrarFormNovoEndereco ? (
                                <button
                                    type="button"
                                    className="btn-toggle-novo-endereco"
                                    onClick={() => setMostrarFormNovoEndereco(true)}
                                >
                                    + Outro endereço
                                </button>
                            ) : (
                                <form className="form-novo-endereco" onSubmit={handleSalvarNovoEndereco}>
                                    <div className="row g-2">
                                        <div className="col-8">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                placeholder="Rua / Avenida"
                                                value={novoEndereco.logradouro}
                                                onChange={e => setNovoEndereco({ ...novoEndereco, logradouro: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-4">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                placeholder="Número"
                                                value={novoEndereco.numero}
                                                onChange={e => setNovoEndereco({ ...novoEndereco, numero: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-6">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                placeholder="Bairro"
                                                value={novoEndereco.bairro}
                                                onChange={e => setNovoEndereco({ ...novoEndereco, bairro: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-6">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                value={novoEndereco.cidade}
                                                onChange={e => setNovoEndereco({ ...novoEndereco, cidade: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex gap-2 mt-2">
                                        <button type="submit" className="btn btn-sm btn-success">
                                            Salvar
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => setMostrarFormNovoEndereco(false)}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            )}
                        </section>

                        {/* Barra de Confirmação */}
                        <div className="barra-confirmacao-fixa">
                            <div className="resumo-rapido">
                                <span className="resumo-detalhes">
                                    {materiaisSelecionados.length} materiais • {enderecoAtivo?.logradouro}
                                </span>
                            </div>

                            <button
                                type="button"
                                className="btn-confirmar-rapido"
                                onClick={handleConfirmarColeta}
                                disabled={salvando || materiaisSelecionados.length === 0}
                            >
                                {salvando ? 'Salvando...' : 'Confirmar Coleta ✓'}
                            </button>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
