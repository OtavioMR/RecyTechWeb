import LogoRecyTech from "../assets/LogoRecyTech.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
            <div className="row text-center">
                <div className="col-12 mb-3">
                    <img src={LogoRecyTech} alt="Logo RecyTech" className="img-fluid" />
                </div>
                <div className="col-12">
                    <h1 className="text-primary"><b>LOGAR COMO</b></h1>
                </div>
                <div className="col-12 mt-3">
                    <button type="button" className="btn btn-success w-50" style={{ height: "40px", borderRadius: "20px" }} onClick={() => navigate("/loginCatador")}>Catador</button>
                </div>
                <div className="col-12 mt-3">
                    <button type="button"
                        className="btn btn-primary w-50"
                        style={{ height: "40px", borderRadius: "20px" }}
                        onClick={() => navigate("/loginCidadao")}>Cidadão</button>
                </div>
            </div>
        </div>
    );
}
