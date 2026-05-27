import LogoRecyTech from "../../assets/LogoRecyTech.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../../style/cidadao/loginCidadao.css";

import { cidadaoService } from "../../services/cidadao/cidadaoService"; // serviço de login
import type { LoginInput } from "../../types/types"; // 🔹 importando tipo

export default function LoginCidadao() {
    const navigate = useNavigate();

    // 🔹 Tipagem explícita
    const [formData, setFormData] = useState<LoginInput>({
        email: "",
        senha: ""
    });

    const [loading, setLoading] = useState(false);

    // 🔹 Atualizar campos
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 🔹 Submeter formulário
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await cidadaoService.login(formData);

            // salva token e perfil
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("perfil", "cidadao");

            // navega sem reload
            navigate("/inicioCidadao");
        } catch (error) {
            console.error(error);
            alert("Erro ao fazer login. Verifique suas credenciais.");
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="login-screen-login-cidadao">
            {/* Botão Voltar */}
            <button className="Btn-back" onClick={() => navigate("/")}>
                <div className="sign-back">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
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

            {/* Logo */}
            <div className="col-12 mb-4">
                <img className="logo img-fluid" src={LogoRecyTech} alt="Logo RecyTech" />
            </div>

            {/* Formulário */}
            <div className="form-cidadao">
                <form onSubmit={handleSubmit}>
                    <div className="titulo">
                        <h2>Cidadão</h2>
                    </div>

                    {/* Email */}
                    <div className="input-container-cidadao">
                        <input
                            type="text"
                            name="email"
                            placeholder=" "
                            className="usuario-input w-100"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="username email"
                        />
                        <label className="floating-label">CIDADÃO/EMAIL</label>
                    </div>

                    {/* Senha */}
                    <div className="input-container-cidadao">
                        <input
                            type="password"
                            name="senha"
                            placeholder=" "
                            className="usuario-input w-100"
                            value={formData.senha}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />
                        <label className="floating-label">SENHA</label>
                    </div>

                    {/* Botão Entrar */}
                    <button type="submit" className="button-catador" disabled={loading}>
                        <span className="text">{loading ? "Entrando..." : "Entrar"}</span>
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
                        <a
                            href="#"
                            className="text-primary"
                            onClick={() => navigate("/esqueciMinhasenha-cidadao")}
                        >
                            Esqueci minha senha
                        </a>
                    </div>

                    {/* Botão Cadastrar-se */}
                    <button
                        type="button"
                        className="button-cidadao"
                        onClick={() => navigate("/cadastroCidadao")}
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
