import logoRecyTech from "../assets/LogoRecyTech.png";
import "../style/Responsividade.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function LoginCatador() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Login Catador:", { email, senha });
        navigate("/inicioCatador"); // rota protegida
    };

    return (

        <div className="login-screen-login-catador">
            <button className="Btn-back" onClick={() => navigate("/")}>
                <div className="sign-back"><svg className="w-6 h-6 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                </svg>

                </div>
                <div className="text-back">Voltar</div>
            </button>

            {/* Logo */}
            <div className="col-12 mb-4">
                <img
                    className="logo img-fluid"
                    src={logoRecyTech}
                    alt="Logo RecyTech"
                />
            </div>



            {/* Formulário */}
            <div className="form-catador">
                <form onSubmit={handleSubmit}>

                    <div className="titulo">
                        <h2>Catador</h2>
                    </div>

                    {/* Email */}
                    <div className="input-container-catador">
                        <input
                            type="text"
                            placeholder="USUÁRIO/EMAIL"
                            className="usuario-input w-100"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="floating-label">CATADOR/EMAIL</label>
                    </div>

                    {/* Senha */}
                    <div className="input-container-catador">
                        <input
                            type="password"
                            placeholder="SENHA"
                            className="usuario-input w-100"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <label className="floating-label">SENHA</label>
                    </div>

                    {/* Botão Entrar - Catador Style */}
                    <button type="submit" className="button-catador">
                        <span className="text">Entrar</span>
                        <svg className="arr-1" viewBox="0 0 24 24">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                        </svg>
                        <svg className="arr-2" viewBox="0 0 24 24">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                        </svg>
                        <span className="circle"></span>
                    </button>

                    {/* Esqueci a senha */}
                    <div className="text-center my-3">
                        <a href="#" className="text-primary" style={{ fontSize: "0.9rem" }} onClick={() => navigate("/esqueciMinhasenha-catador")}>
                            Esqueci minha senha
                        </a>
                    </div>

                    {/* Botão Cadastrar-se - Cidadao Style (inverso) */}
                    <button
                        type="button"
                        className="button-cidadao"
                        onClick={() => navigate("/cadastroCatador")}
                    >
                        <span className="text">Cadastrar-se</span>
                        <svg className="arr-1" viewBox="0 0 24 24">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                        </svg>
                        <svg className="arr-2" viewBox="0 0 24 24">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                        </svg>
                        <span className="circle"></span>
                    </button>

                </form>
            </div>
        </div>

    );
}