import logoRecyTech from "../assets/LogoRecyTech.png";

import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function LoginCatador() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulação de login (substitua por axios se precisar)
        console.log("Login Catador:", { email, senha });
        navigate("/inicioCatador"); // rota protegida
    };

    return (
        <div className="login-screen-login-cidadao">

                {/* Logo */}
                <div className="col-12 mb-4">
                    <img
                        className="logo img-fluid"
                        src={logoRecyTech}
                        alt="Logo RecyTech"
                    />
                </div>

                {/* Formulário */}
                <div className="col-12 col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>

                        {/* Email */}
                        <div className="mb-4 text-start">
                            <input
                                type="text"
                                placeholder="USUÁRIO/EMAIL"
                                className="usuario-input w-100"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Senha */}
                        <div className="mb-4 text-start">
                            <input
                                type="password"
                                placeholder="SENHA"
                                className="usuario-input w-100"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
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
                            <a href="#" className="text-primary" style={{ fontSize: "0.9rem" }}>
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