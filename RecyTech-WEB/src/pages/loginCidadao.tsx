import LogoRecyTech from "../assets/LogoRecyTech.png";
import { useNavigate } from "react-router-dom";
import "../style/loginCatador.css";

export default function LoginCidadao() {
    const navigate = useNavigate();

    // const [listaUsuarios, setUsuarios] = useState<any[]>([]);


    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     try {
    //         const response = await axios.get("http://localhost:3000/usuario/todos");
    //         setUsuarios(response.data);
    //         console.log(response.data);
    //     } catch (error: any) {
    //         console.error(`Erro: ${error.response ? error.response.data.message : "Ocorreu um erro no servidor."}`);
    //     }
    // }

    return (
        <div className="container d-flex justify-content-center align-items-start" style={{ minHeight: "100vh", paddingTop: "80px" }}>
            <div className="row text-center w-100">

                <div className="col-12 mb-3">
                    <img src={LogoRecyTech} alt="Logo RecyTech" className="img-fluid" />
                </div>

                {/* Formulário */}
                <div className="col-12 col-md-6 offset-md-3">
                    <form>

                        {/* Usuário / Email */}
                        <div className="mb-4 text-start">
                            <input
                                type="text"
                                placeholder="USUÁRIO/EMAIL"
                                className="usuario-input w-100"
                                name="nomeOuEmail"
                        
                          
                            />
                        </div>

                        {/* Senha */}
                        <div className="mb-4 text-start">
                            <input
                                type="password"
                                placeholder="SENHA"
                                className="usuario-input w-100"
                                name="senha"
                             
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
