import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import { routesMapCidadao } from "../../routes/routesMap.ts";

import Sidebar from '../../components/Sidebar.tsx';
import '../../style/cidadao/inicioCidadao.css';
import { enderecoService } from '../../services/cidadao/enderecoService.ts';
import { storageService } from '../../services/storageService.ts';
import type { Endereco } from '../../types/types.ts';
import { ABComparisonHeader } from '../../components/ABComparisonHeader.tsx';

export default function InicioCidadao() {
    const navigate = useNavigate();

    const [enderecos, setEnderecos] = useState<Endereco[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeMenu, setActiveMenu] = useState('inicio');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
        const carregar = async () => {
            try {
                const dados = await enderecoService.listarMeus();
                setEnderecos(dados);
            } catch (error) {
                console.error("Erro ao buscar endereços:", error);
            } finally {
                setLoading(false);
            }
        };

        carregar();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            const mapElement = document.querySelector('.leaflet-container') as any;
            if (mapElement && mapElement._leaflet_map) {
                mapElement._leaflet_map.invalidateSize();
            }
        }, 350);

        return () => clearTimeout(timer);
    }, [sidebarCollapsed]);

    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);
        if (routesMapCidadao[menu]) navigate(routesMapCidadao[menu]);
    };

    const handleSidebarToggle = (collapsed: boolean) => {
        setSidebarCollapsed(collapsed);
    };

    const handleEnderecoClick = (endereco: Endereco) => {
        storageService.saveDraftColeta({ endereco });
        localStorage.setItem('enderecoSelecionado', JSON.stringify(endereco));
        navigate('/inicioTiposLixo');
    };

    const position: [number, number] = [-23.6033, -46.919];

    return (
        <div className="app-layout">
            <Sidebar
                onMenuSelect={handleMenuSelect}
                activeMenu={activeMenu}
                onToggle={handleSidebarToggle}
                perfil="cidadao"
            />

            <main className="main-content">
                <div className="content-area container-fluid px-0" style={{ maxWidth: '680px', margin: '0 auto' }}>
                    {/* Header Limpo */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h2 className="titulo-coleta">Solicitar Coleta</h2>
                        <span className="badge bg-light text-muted border">Passo 1 de 4</span>
                    </div>

                    {/* Switcher A/B Minimalista */}
                    <ABComparisonHeader currentVariant="A" />

                    {/* Endereços para seleção rápida */}
                    <div className="mb-4">
                        <label className="fw-bold text-dark small text-uppercase mb-2 d-block">
                            Onde devemos retirar os recicláveis?
                        </label>

                        {loading ? (
                            <p className="text-muted small">Carregando endereços...</p>
                        ) : enderecos.length === 0 ? (
                            <p className="text-muted small">Nenhum endereço cadastrado.</p>
                        ) : (
                            <div className="d-flex flex-column gap-2">
                                {enderecos.map((e) => (
                                    <div
                                        key={e.id}
                                        className="p-3 bg-white border rounded shadow-sm d-flex justify-content-between align-items-center"
                                        style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                                        onClick={() => handleEnderecoClick(e)}
                                        onMouseEnter={(el) => (el.currentTarget.style.borderColor = '#2e7d32')}
                                        onMouseLeave={(el) => (el.currentTarget.style.borderColor = '#e5e7eb')}
                                    >
                                        <div>
                                            <strong className="text-dark d-block">
                                                📍 {e.logradouro}, {e.numero} {e.complemento ? `(${e.complemento})` : ''}
                                            </strong>
                                            <small className="text-muted">
                                                {e.bairro} — {e.cidade}/{e.estado}
                                            </small>
                                        </div>
                                        <button className="btn btn-sm btn-outline-success">
                                            Selecionar ➔
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Mapa Compacto de Região */}
                    <div className="mb-3">
                        <div className="map-container" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                            <MapContainer
                                center={position}
                                zoom={14}
                                style={{
                                    height: '24vh',
                                    width: '100%',
                                }}
                                key={sidebarCollapsed ? 'collapsed' : 'expanded'}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution="&copy; OpenStreetMap contributors"
                                />
                                <Marker position={position}>
                                    <Popup>Região de Coleta: Cotia/SP</Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
