import LogoRecyTech from "../assets/LogoRecyTech.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "../style/inicioCidadao.css";

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
        <div className="container d-flex justify-content-center align-items-start" style={{ minHeight: "100vh", paddingTop: "80px" }}>
            <div className="row text-center w-100">

                <div className="col-12 mb-3">
                    <img src={LogoRecyTech} alt="Logo RecyTech" className="img-fluid" />
                </div>

                {/* Formulário */}
                <div className="col-12 col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>

                        {/* Usuário / Email */}
                        <div className="mb-4 text-start">
                            <input
                                type="text"
                                placeholder="USUÁRIO/EMAIL"
                                className="usuario-input w-100"
                                name="nomeOuEmail"
                                value={email}
                                onChange={e => setEmail(e.target.value)}


                            />
                        </div>

                        {/* Senha */}
                        <div className="mb-4 text-start">
                            <input
                                type="password"
                                placeholder="SENHA"
                                className="usuario-input w-100"
                                name="senha"
                                value={senha}
                                onChange={e => setSenha(e.target.value)}

                            />
                        </div>

                        {/* Botão Entrar */}
                        <div className="d-flex justify-content-center mb-3">
                            <button
                                type="submit"
                                className="btn btn-primary w-75"
                                style={{ height: "45px", borderRadius: "25px" }}
                            >
                                Entrar
                            </button>
                        </div>


                        {/* Esqueci a senha */}
                        <div className="text-center mb-3">
                            <a href="#" className="text-primary" style={{ fontSize: "0.9rem" }}>
                                Esqueci minha senha
                            </a>
                        </div>

                        {/* Cadastre-se */}
                        <div className="d-flex justify-content-center mb-5">
                            <button
                                type="button"
                                className="w-75"
                                style={{ height: "45px", borderRadius: "25px" }}
                                onClick={() => navigate("/cadastroCidadao")}
                            >
                                Cadastrar-se
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
