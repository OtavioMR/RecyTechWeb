import LogoRecyTech from "../assets/LogoRecyTech.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";





export default function LoginCidadao() {


    async function login(email: string, senha: string) {
        const response = await axios.post(
            "http://localhost:3000/auth/login",
            { email, senha },
            { headers: { 'Content-Type': 'application/json' } }
        );

        // salva token
        localStorage.setItem('token', response.data.access_token);
    }


    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        login(email, senha)
            .then(() => navigate('/inicioCidadao')) // ou rota protegida
            .catch((error) => {
                console.error(error);
                alert("Erro ao fazer login. Verifique suas credenciais.");
            });
    }

    return (
        <div className="login-screen-login-cidadao">

            <button className="Btn-back" onClick={() => navigate(-1)}>
                    <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                    <div className="text-back">Voltar</div>
                </button>

            {/* Logo */}
            <div className="col-12 mb-4">
                <img
                    className="logo img-fluid"
                    src={LogoRecyTech}
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
