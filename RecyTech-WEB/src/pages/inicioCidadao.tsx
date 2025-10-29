import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useTokenWatcher } from './tokenWatcher';

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

    const position: [number, number] = [-23.55052, -46.633308];

    return (
        <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
            {/* Conteúdo principal */}
            <div style={{ flex: 1 }}>
                <div className="nomeApp mb-3 text-start px-3 pt-3">
                    <h1>RecyTech</h1>
                </div>

                {/* Mapa */}
                <div className="mb-3 px-3">
                    <MapContainer center={position} zoom={16} style={{ height: '50vh', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />
                        <Marker position={position}>
                            <Popup>Você está aqui!</Popup>
                        </Marker>
                    </MapContainer>
                </div>

                {/* Pesquisa */}
                <div className="pesquisa d-flex align-items-center mx-3 mb-3">
                    <i className="bi bi-search fs-2 px-3"></i>
                    <p className="m-0 p-0 flex-grow-1 text-start px-4">Para onde?</p>
                </div>

                {/* Endereços */}
                <div className="enderecos mx-3 mb-3">
                    <p className="fw-bold mb-2 text-center">Meus endereços:</p>
                    {loading ? (
                        <p className='text-center'>Carregando endereços...</p>
                    ) : enderecos.length === 0 ? (
                        <p className='text-center'>Nenhum endereço cadastrado.</p>
                    ) : (
                        <ul className="list-group">
                            {enderecos.map((e, index) => (
                                <li key={index} className="list-group-item">
                                    {e.endereco}, {e.cep} - {e.bairro} ({e.cidade}/{e.estado})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Faixa azul acima do footer */}
            <div className='faixa-azul'></div>

            {/* Footer */}
            <footer className='opcoes'>
                <div className="col-3">
                    <i className="bi bi-house-door fs-2"></i>
                    <p>Início</p>
                </div>
                <div className="col-3">
                    <i className="bi bi-gear fs-2"></i>
                    <p>opções</p>
                </div>
                <div className="col-3">
                    <i className="bi bi-recycle fs-2"></i>
                    <p>Coletas</p>
                </div>
                <div className="col-3">
                    <i className="bi bi-person fs-2"></i>
                    <p>Perfil</p>
                </div>
            </footer>

        </div>
    );
}
