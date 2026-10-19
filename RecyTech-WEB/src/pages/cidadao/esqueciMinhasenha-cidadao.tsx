import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/cidadao/esqueci_minhaSenha_Cidadao.css"
import LogoRecyTech from "../../assets/LogoRecyTech.png";
import { cidadaoService } from "../../services/cidadao/cidadaoService";

export default function EsqueciMinhaSenhaCidadao() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email) {
            alert("Informe seu email para recuperar a senha.");
            return;
        }

        setLoading(true);

        try {
            await cidadaoService.recuperarSenha({ email });
            alert("Instruções de recuperação enviadas para seu email!");
            navigate("/loginCidadao");
        } catch (error: any) {
            console.error(error);
            alert(error?.response?.data?.message || "Erro ao enviar recuperação de senha");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="esqueci-senha-cidadao">
            {/* VOLTAR */}
            <button className="Btn-back" onClick={() => navigate("/loginCidadao")}>
                <div className="sign-back">
                    <svg
                        className="w-6 h-6 text-gray-800 text-white"
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
                <img className="logo img-fluid" src={LogoRecyTech} alt="Logo RecyTech" />
            </div>

            {/* FORM */}
            <div className="form-cidadao">
                <form onSubmit={handleSubmit}>
                    <div className="titulo">
                        <h2>Recuperação de Senha</h2>
                    </div>

                    <div className="input-container-cidadao">
                        <input
                            type="email"
                            name="email"
                            placeholder=" "
                            className="usuario-input w-100"
                            autoComplete="username email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="floating-label">CIDADÃO/EMAIL</label>
                    </div>

                    <button type="submit" className="button-cidadao" disabled={loading}>
                        <span className="text">{loading ? "Enviando..." : "Enviar"}</span>
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
