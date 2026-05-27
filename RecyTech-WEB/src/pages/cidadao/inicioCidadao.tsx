import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import { routesMapCidadao } from "../../routes/routesMap.ts";


import { useTokenWatcher } from '../../hooks/tokenWatcher.ts';
import Sidebar from '../../components/Sidebar.tsx';
import '../../style/cidadao/inicioCidadao.css';

interface Endereco {
    endereco: string;
    cep: string;
    bairro: string;
    cidade: string;
    estado: string;
}

export default function InicioCidadao() {
    useTokenWatcher(); // ✅ Mantém segurança

    const navigate = useNavigate();

    const [enderecos, setEnderecos] = useState<Endereco[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeMenu, setActiveMenu] = useState('inicio');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // 🔹 Buscar endereços
    useEffect(() => {
        const buscarEnderecos = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    "http://localhost:3000/endereco-usuario/meus-enderecos",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setEnderecos(res.data);
            } catch (error) {
                console.error("Erro ao buscar endereços:", error);
            } finally {
                setLoading(false);
            }
        };

        buscarEnderecos();
        const interval = setInterval(buscarEnderecos, 5000);
        return () => clearInterval(interval);
    }, []);

    // 🔹 Ajuste mapa sidebar
    useEffect(() => {
        const timer = setTimeout(() => {
            const mapElement = document.querySelector('.leaflet-container') as any;
            if (mapElement && mapElement._leaflet_map) {
                mapElement._leaflet_map.invalidateSize();
            }
        }, 350);

        return () => clearTimeout(timer);
    }, [sidebarCollapsed]);

    // 🔹 Navegação SPA (agora alinhada com Sidebar)
    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);
        if (routesMapCidadao[menu]) navigate(routesMapCidadao[menu]);
    };


    const handleSidebarToggle = (collapsed: boolean) => {
        setSidebarCollapsed(collapsed);
    };

    // 🔹 Quando clicar em um endereço, salva no localStorage e vai para tipos de lixo
    const handleEnderecoClick = (endereco: Endereco) => {
        localStorage.setItem('enderecoSelecionado', JSON.stringify(endereco));
        navigate('/inicioTiposLixo');
    };

    const position: [number, number] = [-23.55052, -46.633308];

    return (
        <div className="app-layout">
            <Sidebar
                onMenuSelect={handleMenuSelect}
                activeMenu={activeMenu}
                onToggle={handleSidebarToggle}
                perfil="cidadao"
            />

            <main className="main-content">
                <div className="content-area container-fluid px-0">
                    {/* Header */}
                    <div className="nomeApp mb-3 ps-0">
                        <h1 className="m-0">RecyTech</h1>
                    </div>

                    {/* Mapa */}
                    <div className="mb-3">
                        <div className="map-container">
                            <MapContainer
                                center={position}
                                zoom={16}
                                style={{
                                    height: '50vh',
                                    width: '100%',
                                    borderRadius: '10px'
                                }}
                                key={sidebarCollapsed ? 'collapsed' : 'expanded'}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution="&copy; OpenStreetMap contributors"
                                />
                                <Marker position={position}>
                                    <Popup>
                                        <strong>Você está aqui!</strong><br />
                                        RecyTech - Sistema de Coleta
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>

                    {/* Pesquisa */}
                    <div className="pesquisa d-flex align-items-center mb-3 p-3">
                        <i className="bi bi-search px-2"></i>
                        <input
                            type="text"
                            placeholder="Para onde?"
                            className="border-0 bg-transparent flex-grow-1 px-2"
                            style={{ outline: 'none' }}
                            onClick={(e) => e.currentTarget.focus()}
                        />
                    </div>

                    {/* Endereços */}
                    <div className="mb-3">
                        <p className="enderecos-titulo">Meus endereços:</p>
                        <div className="enderecos">
                            {loading ? (
                                <p className="text-center m-0">Carregando endereços...</p>
                            ) : enderecos.length === 0 ? (
                                <p className="text-center m-0">Nenhum endereço cadastrado.</p>
                            ) : (
                                <div className="list-group">
                                    {enderecos.map((e, index) => (
                                        <div
                                            key={index}
                                            className="list-group-item mb-2"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleEnderecoClick(e)}
                                        >
                                            <strong>{e.endereco}</strong><br />
                                            {e.cep} - {e.bairro} ({e.cidade}/{e.estado})
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
