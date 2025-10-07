import logoRecyTech from "../assets/LogoRecyTech.png";
import "../style/loginCatador.css";

export default function LoginCatador() {
    return (
        <div className="container d-flex justify-content-center align-items-start" style={{ minHeight: "100vh", paddingTop: "80px" }}>
            <div className="row text-center w-100">
                
                {/* Logo */}
                <div className="col-12 mb-4">
                    <img className="img-fluid"
                        src={logoRecyTech} 
                        alt="Logo RecyTech" 
                        style={{
                            marginBottom: "20px"
                        }} 
                    />
                </div>

                {/* Formulário */}
                <div className="col-12 col-md-6 offset-md-3">
                    <form action="" method="get">

                        {/* Usuário / Email */}
                        <div className="mb-4 text-start">
                            <input 
                                type="text"
                                placeholder="USUÁRIO/EMAIL"
                                className="usuario-input w-100"
                            />
                        </div>

                        {/* Senha */}
                        <div className="mb-4 text-start">
                            <input 
                                type="password"
                                placeholder="SENHA"
                                className="usuario-input w-100"
                            />
                        </div>

                        {/* Botão Entrar */}
                        <div className="d-flex justify-content-center mb-3">
                            <button 
                                type="button" 
                                className="btn btn-primary w-75"
                                style={{ height: "45px", borderRadius: "25px" }}
                            >
                                Entrar
                            </button>
                        </div>

                        {/* Esqueci a senha */}
                        <div className="text-center">
                            <a href="#" className="text-primary" style={{ fontSize: "0.9rem" }}>
                                Esqueci minha senha
                            </a>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
