import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.tsx';
import '../../style/cidadao/opcoes.css';
import { routesMapCidadao } from "../../routes/routesMap.ts";
import { storageService } from '../../services/storageService.ts';

export default function Opcoes() {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState('opcoes');
    const [variant, setVariant] = useState<'A' | 'B'>('A');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        setVariant(storageService.getVariant());
        setTheme(storageService.getTheme());
    }, []);

    const handleMenuSelect = (menu: string) => {
        setActiveMenu(menu);
        if (routesMapCidadao[menu]) navigate(routesMapCidadao[menu]);
    };

    const handleToggleVariant = (target: 'A' | 'B') => {
        storageService.setVariant(target);
        setVariant(target);
    };

    const handleIrParaTeste = () => {
        if (variant === 'B') {
            navigate('/solicitar-coleta-rapida');
        } else {
            navigate('/inicioCidadao');
        }
    };

    const handleToggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        storageService.setTheme(nextTheme);
        setTheme(nextTheme);
    };

    const handleReset = () => {
        if (window.confirm("Restaurar dados padrão do aplicativo?")) {
            storageService.resetStorage();
            window.location.reload();
        }
    };

    return (
        <div className="app-layout">
            <Sidebar
                onMenuSelect={handleMenuSelect}
                activeMenu={activeMenu}
                onToggle={() => {}}
                perfil="cidadao"
            />

            <main className="main-content">
                <div className="content-area container-fluid px-0" style={{ maxWidth: '680px', margin: '0 auto' }}>
                    <h2 className="titulo-coleta mb-4">Configurações</h2>

                    {/* Modo Teste A/B */}
                    <div className="card p-3 border rounded shadow-sm mb-3 bg-white">
                        <strong className="text-dark small text-uppercase mb-2 d-block">Fluxo de Solicitação (Teste A/B)</strong>
                        <div className="d-flex gap-2 mb-3">
                            <button
                                type="button"
                                className={`btn flex-fill ${variant === 'A' ? 'btn-success fw-bold' : 'btn-outline-secondary'}`}
                                onClick={() => handleToggleVariant('A')}
                            >
                                📋 4 Etapas (A)
                            </button>
                            <button
                                type="button"
                                className={`btn flex-fill ${variant === 'B' ? 'btn-success fw-bold' : 'btn-outline-secondary'}`}
                                onClick={() => handleToggleVariant('B')}
                            >
                                ⚡ Tela Única (B)
                            </button>
                        </div>
                        <button className="btn btn-sm btn-outline-success w-100" onClick={handleIrParaTeste}>
                            Abrir fluxo selecionado ➔
                        </button>
                    </div>

                    {/* Aparência */}
                    <div className="card p-3 border rounded shadow-sm mb-3 bg-white d-flex flex-row justify-content-between align-items-center">
                        <div>
                            <strong className="text-dark d-block">Tema Visual</strong>
                            <small className="text-muted">{theme === 'light' ? 'Modo Claro' : 'Modo Escuro'}</small>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary" onClick={handleToggleTheme}>
                            {theme === 'light' ? '🌙 Escuro' : '☀️ Claro'}
                        </button>
                    </div>

                    {/* Guia Rápido */}
                    <div className="card p-3 border rounded shadow-sm mb-3 bg-white">
                        <strong className="text-dark small text-uppercase mb-2 d-block">Guia Rápido de Reciclagem</strong>
                        <div className="d-flex flex-wrap gap-2">
                            <span className="badge bg-light text-primary border p-2">📄 Papel</span>
                            <span className="badge bg-light text-danger border p-2">🥤 Plástico</span>
                            <span className="badge bg-light text-success border p-2">🍾 Vidro</span>
                            <span className="badge bg-light text-warning text-dark border p-2">🔩 Metal</span>
                            <span className="badge bg-light text-secondary border p-2">💻 Eletrônicos</span>
                        </div>
                        <small className="text-muted mt-2 d-block">
                            Descarte apenas materiais limpos e secos para facilitar o trabalho dos catadores parceiros.
                        </small>
                    </div>

                    {/* Reset */}
                    <div className="text-center pt-2">
                        <button className="btn btn-sm btn-outline-danger" onClick={handleReset}>
                            ↺ Restaurar Dados Padrão
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
