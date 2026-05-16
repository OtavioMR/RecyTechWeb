import LogoRecyTech from "../../assets/LogoRecyTech.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/catador/cadastroCatador.css";
import { catadorService } from "../../services/catador/catadorService";
import type { UsuarioCreate } from "../../types/types";

export default function CadastroCatador() {
    const navigate = useNavigate();

    // 🔹 Tipagem explícita
    const [formData, setFormData] = useState<UsuarioCreate & { confirmarSenha: string }>({
        nomeCompleto: "",
        email: "",
        nomeUsuario: "",
        senha: "",
        confirmarSenha: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.senha !== formData.confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        setLoading(true);

        try {
            await catadorService.criar({
                nomeCompleto: formData.nomeCompleto,
                email: formData.email,
                nomeUsuario: formData.nomeUsuario,
                senha: formData.senha
            });

            alert("Catador cadastrado com sucesso!");

            setFormData({
                nomeCompleto: "",
                email: "",
                nomeUsuario: "",
                senha: "",
                confirmarSenha: ""
            });

            // 🔹 Navegação SPA
            navigate("/loginCatador");
        } catch (error: any) {
            console.error(error);
            alert(error?.response?.data?.message || "Erro ao cadastrar catador");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-screen-catador">
            {/* Botão Voltar */}
            <button className="Btn-back" onClick={() => navigate(-1)}>
                <div className="sign-back">
                    <svg className="w-6 h-6 text-gray-800 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                    </svg>
                </div>
                <div className="text-back">Voltar</div>
            </button>

            {/* Logo */}
            <div className="col-12 mb-4">
                <img src={LogoRecyTech} alt="Logo RecyTech" className="logo img-fluid" />
            </div>

            {/* Formulário */}
            <div className="form-catador">
                <form onSubmit={handleSubmit}>
                    {/* Nome completo */}
                    <div className="input-container-catador">
                        <input
                            type="text"
                            name="nomeCompleto"
                            placeholder=" "
                            className="usuario-input w-100"
                            onChange={handleChange}
                            value={formData.nomeCompleto}
                        />
                        <label className="floating-label">Nome completo</label>
                    </div>

                    {/* Email */}
                    <div className="input-container-catador">
                        <input
                            type="email"
                            name="email"
                            placeholder=" "
                            className="usuario-input w-100"
                            onChange={handleChange}
                            value={formData.email}
                        />
                        <label className="floating-label">Email</label>
                    </div>

                    {/* Nome de usuário */}
                    <div className="input-container-catador">
                        <input
                            type="text"
                            name="nomeUsuario"
                            placeholder=" "
                            className="usuario-input w-100"
                            onChange={handleChange}
                            value={formData.nomeUsuario}
                        />
                        <label className="floating-label">Nome de usuário</label>
                    </div>

                    {/* Senha */}
                    <div className="input-container-catador">
                        <input
                            type="password"
                            name="senha"
                            placeholder=" "
                            className="usuario-input w-100"
                            onChange={handleChange}
                            value={formData.senha}
                        />
                        <label className="floating-label">Senha</label>
                    </div>

                    {/* Confirmar senha */}
                    <div className="input-container-catador">
                        <input
                            type="password"
                            name="confirmarSenha"
                            placeholder=" "
                            className="usuario-input w-100"
                            onChange={handleChange}
                            value={formData.confirmarSenha}
                        />
                        <label className="floating-label">Confirmar senha</label>
                    </div>

                    {/* Botão Cadastrar */}
                    <div>
                        <button type="submit" className="button-catador" disabled={loading}>
                            <span className="text">{loading ? "Cadastrando..." : "Cadastrar-se"}</span>
                            <svg className="arr-1" viewBox="0 0 24 24">
                                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                            </svg>
                            <svg className="arr-2" viewBox="0 0 24 24">
                                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                            </svg>
                            <span className="circle"></span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
