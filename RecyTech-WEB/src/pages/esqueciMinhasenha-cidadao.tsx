import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Responsividade.css";
import logoRecyTech from "../assets/LogoRecyTech.png";

export default function EsqueciMinhaSenhaCidadao() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Aqui futuramente você chama o backend
        console.log("Recuperação de senha para:", email);

        alert("Se este email existir, enviaremos instruções de recuperação.");
        navigate("/loginCidadao");
    };

    return (
        <div className="esqueci-senha-cidadao">

            {/* VOLTAR (SPA OK) */}
            <button
                className="Btn-back"
                onClick={() => navigate("/loginCidadao")}
            >
                <div className="sign-back">
                    <svg
                        className="w-6 h-6 text-gray-800 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h14M5 12l4-4m-4 4 4 4"
                        />
                    </svg>
                </div>
                <div className="text-back">Voltar</div>
            </button>

            {/* LOGO */}
            <div className="col-12 mb-4">
                <img
                    className="logo img-fluid"
                    src={logoRecyTech}
                    alt="Logo RecyTech"
                />
            </div>

            {/* FORM */}
            <div className="form-cidadao">

                <div className="titulo">
                    <h2>Recuperação de Senha</h2>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="input-container-cidadao">
                        <input
                            type="text"
                            placeholder=" "
                            className="usuario-input w-100"
                            autoComplete="username email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="floating-label">
                            CIDADÃO/EMAIL
                        </label>
                    </div>

                    <button type="submit" className="button-catador">
                        <span className="text">Enviar</span>

                        <svg className="arr-1" viewBox="0 0 24 24">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                        </svg>

                        <svg className="arr-2" viewBox="0 0 24 24">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                        </svg>

                        <span className="circle"></span>
                    </button>

                </form>
            </div>
        </div>
    );
}