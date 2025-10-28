import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function InicioCidadao() {

    interface Endereco {
        endereco: string;
        cep: string;
        bairro: string;
        cidade: string;
        estado: string;
    }


    const [enderecos, setEnderecos] = useState<Endereco[]>([]);



    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("http://localhost:3000/endereco-usuario/meus-enderecos", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setEnderecos(res.data))
            .catch(err => console.log(err));
    }, []);


    const position: [number, number] = [-23.55052, -46.633308];


    return (
        <div className="d-flex flex-column" style={{ height: "70vh" }}>
            <div className="nomeApp mb-3 text-start px-3 pt-3">
                <h1>RecyTech</h1>
            </div>
            <div className="flex-grow-1 d-flex justify-content-center mb-5">
                <MapContainer center={position} zoom={16} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                    <Marker position={position}>
                        <Popup>Você está aqui!</Popup>
                    </Marker>
                </MapContainer>
            </div>

            <div className="pesquisa d-flex align-items-center mx-3">
                <i className="bi bi-search fs-2 px-3"></i>
                <p className="m-0 p-0 flex-grow-1 text-start px-4">Para onde?</p>
            </div>


            <div className="enderecos d-flex align-items-center mx-3">
                {enderecos.length === 0 ? (
                    <p className="m-0 p-0 flex-grow-1 text-start px-4">Nenhum endereço cadastrado.</p>
                ) : (
                    enderecos.map((e, index) => (
                        <p
                            key={index}
                            className="m-0 p-0 flex-grow-1 text-start px-4"
                        >
                            {e.endereco}, {e.cep} - {e.bairro} ({e.cidade}/{e.estado})
                        </p>
                    ))
                )}
            </div>




        </div>

    );
}