import "../style/iniciologin.css";
import LogoRecyTech from "../assets/LogoRecyTech.png";
import { useNavigate } from "react-router-dom";




export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="login-screen-Inicio">
            <div className="">
                <img src={LogoRecyTech} className="logo" alt="Logo Recytech" />
                <p className="app-subtitle">Conectando pessoas à reciclagem</p>
                <p className="welcome-text mt-20">
                    Bem-vindo ao RecyTech! Escolha uma opção para continuar.
                </p>

                <div className="mt-50">
                    <button className="button-cidadao" onClick={() => navigate("/loginCidadao")}>
                        <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                        </svg>
                        <span className="text">Entrar como Cidadão</span>
                        <span className="circle"></span>
                        <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                        </svg>
                    </button>

                    <button className="button-catador" onClick={() => navigate("/loginCatador")}>
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

