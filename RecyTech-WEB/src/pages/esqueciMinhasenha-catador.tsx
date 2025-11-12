import { useNavigate } from "react-router-dom";
import "../style/Responsividade.css";
import logoRecyTech from "../assets/LogoRecyTech.png";


export default function EsqueciMinhaSenhaCatador() {
    const navigate = useNavigate();


    return (
        <div className="esqueci-senha-catador">
            <button className="Btn-back" onClick={() => navigate("/loginCatador")}>
                <div className="sign-back"><svg className="w-6 h-6 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                </svg>

                </div>
                <div className="text-back">Voltar</div>
            </button>

            <div className="col-12 mb-4">
                <img
                    className="logo img-fluid"
                    src={logoRecyTech}
                    alt="Logo RecyTech"
                />
            </div>

            <div className="form-cidadao">
                <div className="titulo">
                    <h2>Recuperação de Senha</h2>
                </div>

                <div className="input-container-cidadao">
                    <input
                        type="text"
                        placeholder=" "
                        className="usuario-input w-100"
                        autoComplete="username email"
                    />
                    <label className="floating-label">CATADOR/EMAIL</label>
                </div>
                <button type="submit" className="button-catador">
                    <span className="text">Enviar</span>
                    <svg className="arr-1" viewBox="0 0 24 24">
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                    </svg>
                    <svg className="arr-2" viewBox="0 0 24 24">
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                    </svg>
                    <span className="circle"></span>
                </button>
            </div>
        </div>

    );
}