import { useState, useEffect } from "react";
import LogoRecyTech from "../../assets/LogoRecyTech.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../../style/paginaInicio.css";
import { storageService } from "../../services/storageService";

export default function Home() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [selectedVariant, setSelectedVariant] = useState<"A" | "B">("A");

    useEffect(() => {
        const ab = searchParams.get("ab");
        if (ab) {
            const upper = ab.toUpperCase();
            if (upper === "A" || upper === "B") {
                storageService.setVariant(upper as "A" | "B");
                setSelectedVariant(upper as "A" | "B");
                return;
            }
        }
        setSelectedVariant(storageService.getVariant());
    }, [searchParams]);

    const handleSelectVariant = (v: "A" | "B") => {
        setSelectedVariant(v);
        storageService.setVariant(v);
    };

    const handleEntrarCidadao = () => {
        if (selectedVariant === "B") {
            navigate("/solicitar-coleta-rapida");
        } else {
            navigate("/inicioCidadao");
        }
    };

    const handleEntrarCatador = () => {
        navigate("/inicioCatador");
    };

    return (
        <div className="page-inicio">
            <div className="login-screen-Inicio" style={{ maxWidth: "460px" }}>
                <img src={LogoRecyTech} className="logo" alt="Logo Recytech" />
                <p className="app-subtitle">Conectando pessoas à reciclagem</p>

                {/* Seletor Discreto do Teste A/B */}
                <div className="mb-4 mt-2">
                    <span className="text-muted small text-uppercase fw-bold d-block mb-2">Versão do Teste:</span>
                    <div className="btn-group w-100" role="group">
                        <button
                            type="button"
                            className={`btn btn-sm ${selectedVariant === "A" ? "btn-success active fw-bold" : "btn-outline-secondary"}`}
                            onClick={() => handleSelectVariant("A")}
                        >
                            📋 4 Etapas (A)
                        </button>
                        <button
                            type="button"
                            className={`btn btn-sm ${selectedVariant === "B" ? "btn-success active fw-bold" : "btn-outline-secondary"}`}
                            onClick={() => handleSelectVariant("B")}
                        >
                            ⚡ Tela Única (B)
                        </button>
                    </div>
                </div>

                <div className="d-flex flex-column gap-3 w-100">
                    <button className="button-cidadao w-100" onClick={handleEntrarCidadao}>
                        <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                        </svg>
                        <span className="text">
                            {selectedVariant === "B" ? "Solicitar Coleta (Tela Única)" : "Solicitar Coleta (4 Etapas)"}
                        </span>
                        <span className="circle"></span>
                        <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                        </svg>
                    </button>

                    <button className="button-catador w-100" onClick={handleEntrarCatador}>
                        <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                        </svg>
                        <span className="text">Entrar como Catador</span>
                        <span className="circle"></span>
                        <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
