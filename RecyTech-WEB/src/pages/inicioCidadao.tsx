import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useTokenWatcher } from './tokenWatcher';
import Sidebar from '../components/Sidebar';

interface Endereco {
    endereco: string;
    cep: string;
    bairro: string;
    cidade: string;
    estado: string;
}

export default function InicioCidadao() {
    useTokenWatcher();

    const [enderecos, setEnderecos] = useState<Endereco[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeMenu, setActiveMenu] = useState('inicio');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
        const buscarEnderecos = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:3000/endereco-usuario/meus-enderecos", {
                    headers: { Authorization: `Bearer ${token}` }
                });
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

    // Efeito para redimensionar o mapa quando a sidebar altera
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
        console.log('Menu selecionado:', menu);
    };

    const handleSidebarToggle = (collapsed: boolean) => {
        setSidebarCollapsed(collapsed);
    };

    const position: [number, number] = [-23.55052, -46.633308];

    return (
        <div className="app-layout">
            {/* Sidebar Fixa */}
            <Sidebar onMenuSelect={handleMenuSelect} activeMenu={activeMenu} onToggle={handleSidebarToggle} />
            
            {/* Conteúdo Principal */}
            <main className="main-content">
                {/* Use container-fluid com px-0 para remover padding horizontal */}
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
                                        <div>
                                            <strong>Você está aqui!</strong>
                                            <br />
                                            RecyTech - Sistema de Coleta
                                        </div>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>

                    {/* Pesquisa - Agora alinhada à esquerda */}
                    <div className="pesquisa d-flex align-items-center mb-3 p-3">
                        <i className="bi bi-search px-2"></i>
                        <input 
                            type="text" 
                            placeholder="Para onde?" 
                            className="border-0 bg-transparent flex-grow-1 px-2"
                            style={{ outline: 'none' }}
                            onClick={(e) => {
                                e.currentTarget.focus();
                            }}
                        />
                    </div>
                    {/* Endereços - Use w-100 para largura total */}
                    <div className="enderecos mb-3 p-3 w-100">
                        <p className="fw-bold mb-3 text-center">Meus endereços:</p>
                        {loading ? (
                            <p className='text-center'>Carregando endereços...</p>
                        ) : enderecos.length === 0 ? (
                            <p className='text-center'>Nenhum endereço cadastrado.</p>
                        ) : (
                            <div className="list-group">
                                {enderecos.map((e, index) => (
                                    <div key={index} className="list-group-item mb-2">
                                        <strong>{e.endereco}</strong><br />
                                        {e.cep} - {e.bairro} ({e.cidade}/{e.estado})
                                    </div>
                                ))}
                            </div>
                        )}
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