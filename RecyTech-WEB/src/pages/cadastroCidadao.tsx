import LogoRecyTech from "../assets/LogoRecyTech.png";
import React, { useState } from "react";
import axios from "axios";

export default function CadastroCidadao() {
    
    const [formData, setFormData] = useState({
        nomeCompleto: "",
        email: "",
        nomeUsuario: "",
        senha: "",
        confirmarSenha: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.senha !== formData.confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            await axios.post("http://localhost:3000/usuario/create", {
                nomeCompleto: formData.nomeCompleto,
                email: formData.email,
                nomeUsuario: formData.nomeUsuario,
                senha: formData.senha,
            });

            //console.log(response.data);
            alert("Usuário cadastrado com sucesso!");
            setFormData({
                nomeCompleto: "",
                email: "",
                nomeUsuario: "",
                senha: "",
                confirmarSenha: "",
            })
        } catch (error: any) {
            console.error(error);

            if (error.response) {
                alert(`Erro: ${error.response.data.message || "Ocorreu um erro no servidor."}`);
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-start" style={{ minHeight: "100vh", paddingTop: "80px" }}>
            <div className="row text-center w-100">

                <div className="col-12 mb-3">
                    <img src={LogoRecyTech} alt="Logo RecyTech" className="img-fluid" />
                </div>

                <div className="col-12 col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2 text-start">
                            <label><b>Nome completo</b></label>
                            <input type="text" name="nomeCompleto" placeholder="Digite seu nome completo" className="usuario-input w-100" onChange={handleChange} value={formData.nomeCompleto} />
                        </div>

                        <div className="mb-2 text-start">
                            <label><b>Email</b></label>
                            <input type="email" name="email" placeholder="Digite o seu email" className="usuario-input w-100" onChange={handleChange} value={formData.email} />
                        </div>

                        <div className="mb-2 text-start">
                            <label><b>Nome de usuário</b></label>
                            <input type="text" name="nomeUsuario" placeholder="Digite o seu nome de usuário" className="usuario-input w-100" onChange={handleChange} value={formData.nomeUsuario} />
                        </div>

                        <div className="mb-2 text-start">
                            <label><b>Senha</b></label>
                            <input type="password" name="senha" placeholder="Digite sua senha" className="usuario-input w-100" onChange={handleChange} value={formData.senha} />
                        </div>

                        <div className="mb-5 text-start">
                            <label><b>Confirmar senha</b></label>
                            <input type="password" name="confirmarSenha" placeholder="Confirme sua senha" className="usuario-input w-100" onChange={handleChange} value={formData.confirmarSenha} />
                        </div>

                        <div className="d-flex justify-content-center mb-3">
                            <button type="submit" className="btn btn-primary w-75" style={{ height: "45px", borderRadius: "25px" }}>
                                Cadastrar
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}
