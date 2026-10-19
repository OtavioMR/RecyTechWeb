import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar.tsx";
import { routesMapCidadao } from "../../routes/routesMap.ts";
import "../../style/cidadao/conta.css";
import { storageService } from "../../services/storageService.ts";
import type { Endereco, EnderecoInput } from "../../types/types.ts";

export default function Conta() {
    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState("conta");
    const [usuario, setUsuario] = useState(storageService.getUser());
    const [editandoPerfil, setEditandoPerfil] = useState(false);
    const [perfilForm, setPerfilForm] = useState(storageService.getUser());

    // Endereços
    const [enderecos, setEnderecos] = useState<Endereco[]>([]);
    const [mostrarFormEndereco, setMostrarFormEndereco] = useState(false);
    const [novoEndereco, setNovoEndereco] = useState<EnderecoInput>({
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "Cotia",
        estado: "SP",
        cep: "",
        complemento: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setUsuario(storageService.getUser());
        setPerfilForm(storageService.getUser());
        setEnderecos(storageService.getEnderecos());
        setLoading(false);
    }, []);

    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);
        if (routesMapCidadao[menu]) navigate(routesMapCidadao[menu]);
    };

    const handleSalvarPerfil = (e: React.FormEvent) => {
        e.preventDefault();
        const atualizado = storageService.updateUser(perfilForm);
        setUsuario(atualizado);
        setEditandoPerfil(false);
        alert("Dados pessoais atualizados com sucesso!");
    };

    const handleInputChange = (campo: keyof EnderecoInput, valor: string) => {
        setNovoEndereco(prev => ({ ...prev, [campo]: valor }));
    };

    const handleAdicionarEndereco = (e: React.FormEvent) => {
        e.preventDefault();
        if (!novoEndereco.logradouro.trim() || !novoEndereco.numero.trim() || !novoEndereco.bairro.trim()) {
            alert("Por favor, preencha logradouro, número e bairro.");
            return;
        }

        storageService.addEndereco(novoEndereco);
        setEnderecos(storageService.getEnderecos());
        setNovoEndereco({
            logradouro: "",
            numero: "",
            bairro: "",
            cidade: "Cotia",
            estado: "SP",
            cep: "",
            complemento: ""
        });
        setMostrarFormEndereco(false);
        alert("Endereço adicionado com sucesso!");
    };

    const handleExcluirEndereco = (id: string) => {
        if (enderecos.length <= 1) {
            alert("Você precisa manter pelo menos 1 endereço cadastrado para as coletas.");
            return;
        }

        if (window.confirm("Deseja realmente remover este endereço?")) {
            storageService.deleteEndereco(id);
            setEnderecos(storageService.getEnderecos());
        }
    };

    if (loading) return <p className="text-center p-5">Carregando...</p>;

    return (
        <div className="app-layout">
            <Sidebar
                onMenuSelect={handleMenuSelect}
                activeMenu={activeMenu}
                onToggle={() => {}}
                perfil="cidadao"
            />

            <main className="main-content">
                <div className="content-area container-fluid px-0" style={{ maxWidth: '850px', margin: '0 auto' }}>
                    <div className="nomeApp mb-3 ps-0 d-flex justify-content-between align-items-center">
                        <h1 className="m-0">RecyTech</h1>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-success"
                            onClick={() => navigate('/coleta')}
                        >
                            Ver Minhas Coletas
                        </button>
                    </div>

                    <div className="mb-4">
                        <h2 className="titulo-conta">Minha Conta</h2>
                        <p className="text-muted">Gerencie suas informações cadastrais e endereços de retirada.</p>
                    </div>

                    <div className="conta-container">
                        {/* Informações pessoais */}
                        <div className="info-section">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h3 className="subtitulo m-0">Informações Pessoais</h3>
                                {!editandoPerfil && (
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => setEditandoPerfil(true)}
                                    >
                                        ✏️ Editar Perfil
                                    </button>
                                )}
                            </div>

                            {!editandoPerfil ? (
                                <>
                                    <div className="info-item">
                                        <label className="info-label">Nome Completo</label>
                                        <div className="info-box">{usuario.nomeCompleto}</div>
                                    </div>
                                    <div className="info-item">
                                        <label className="info-label">Nome de Usuário</label>
                                        <div className="info-box">{usuario.nomeUsuario}</div>
                                    </div>
                                    <div className="info-item">
                                        <label className="info-label">CPF</label>
                                        <div className="info-box">{usuario.cpf || "123.456.789-00"}</div>
                                    </div>
                                    <div className="info-item">
                                        <label className="info-label">E-mail</label>
                                        <div className="info-box">{usuario.email}</div>
                                    </div>
                                    <div className="info-item">
                                        <label className="info-label">Telefone</label>
                                        <div className="info-box">{usuario.telefone || "(11) 98765-4321"}</div>
                                    </div>
                                </>
                            ) : (
                                <form onSubmit={handleSalvarPerfil} className="p-3 bg-light rounded border mb-3">
                                    <div className="mb-2">
                                        <label className="form-label small">Nome Completo</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={perfilForm.nomeCompleto}
                                            onChange={e => setPerfilForm({ ...perfilForm, nomeCompleto: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label small">E-mail</label>
                                        <input
                                            type="email"
                                            className="form-control form-control-sm"
                                            value={perfilForm.email}
                                            onChange={e => setPerfilForm({ ...perfilForm, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label small">Telefone</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={perfilForm.telefone || ""}
                                            onChange={e => setPerfilForm({ ...perfilForm, telefone: e.target.value })}
                                        />
                                    </div>
                                    <div className="d-flex gap-2 mt-3">
                                        <button type="submit" className="btn btn-sm btn-success">
                                            Salvar Alterações
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => setEditandoPerfil(false)}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Endereços */}
                        <div className="info-section">
                            <h3 className="subtitulo">Endereços Cadastrados ({enderecos.length})</h3>

                            <div className="d-flex flex-column gap-2 mb-3">
                                {enderecos.map((endereco) => (
                                    <div key={endereco.id} className="p-3 bg-white border rounded shadow-sm d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong className="text-dark">
                                                📍 {endereco.logradouro}, {endereco.numero} {endereco.complemento ? `(${endereco.complemento})` : ''}
                                            </strong>
                                            <br />
                                            <small className="text-muted">
                                                {endereco.bairro} — {endereco.cidade}/{endereco.estado} • CEP: {endereco.cep}
                                            </small>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleExcluirEndereco(endereco.id)}
                                            title="Remover endereço"
                                        >
                                            🗑️ Excluir
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {!mostrarFormEndereco ? (
                                <button
                                    type="button"
                                    className="btn-adicionar-endereco"
                                    onClick={() => setMostrarFormEndereco(true)}
                                >
                                    + Adicionar Novo Endereço
                                </button>
                            ) : (
                                <form onSubmit={handleAdicionarEndereco} className="form-novo-endereco p-3 bg-light rounded border">
                                    <h5 className="mb-3 text-dark">Cadastrar Novo Endereço</h5>
                                    <div className="row g-2">
                                        <div className="col-md-8">
                                            <label className="form-label small">Logradouro / Rua</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                placeholder="Ex: Rua das Flores"
                                                value={novoEndereco.logradouro}
                                                onChange={(e) => handleInputChange("logradouro", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small">Número</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                placeholder="Ex: 120"
                                                value={novoEndereco.numero}
                                                onChange={(e) => handleInputChange("numero", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small">Bairro</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                placeholder="Ex: Centro"
                                                value={novoEndereco.bairro}
                                                onChange={(e) => handleInputChange("bairro", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small">Cidade</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                value={novoEndereco.cidade}
                                                onChange={(e) => handleInputChange("cidade", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small">CEP</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                placeholder="06700-000"
                                                value={novoEndereco.cep}
                                                onChange={(e) => handleInputChange("cep", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex gap-2 mt-3">
                                        <button type="submit" className="btn btn-sm btn-success">
                                            Salvar Endereço
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => setMostrarFormEndereco(false)}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
