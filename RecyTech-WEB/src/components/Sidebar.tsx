// src/components/Sidebar.tsx
import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { storageService } from "../services/storageService";

const InicioIcon = () => <span>🏠</span>;
const OpcoesIcon = () => <span>⚙️</span>;
const ColetaIcon = () => <span>🗑️</span>;
const ContaIcon = () => <span>👤</span>;

interface SidebarProps {
    onMenuSelect: (menu: string) => void;
    activeMenu?: string;
    onToggle?: (collapsed: boolean) => void;
    perfil: "cidadao" | "catador";
}

const Sidebar: React.FC<SidebarProps> = ({
    onMenuSelect,
    activeMenu = "inicio",
    onToggle,
    perfil,
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [variant, setVariant] = useState<"A" | "B">("A");
    const navigate = useNavigate();

    useEffect(() => {
        setVariant(storageService.getVariant());

        const handleVariantChange = (e: any) => {
            if (e.detail) {
                setVariant(e.detail);
            }
        };

        window.addEventListener("recytech:variant_changed", handleVariantChange);
        return () => window.removeEventListener("recytech:variant_changed", handleVariantChange);
    }, []);

    const menuItems = [
        { key: "inicio", label: "Solicitar Coleta", icon: <InicioIcon /> },
        { key: "coleta", label: "Minhas Coletas", icon: <ColetaIcon /> },
        { key: "conta", label: "Minha Conta", icon: <ContaIcon /> },
        { key: "opcoes", label: "Configurações", icon: <OpcoesIcon /> },
    ];

    const handleToggle = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        onToggle?.(newState);
    };

    const handleLogout = () => {
        navigate("/");
    };

    const handleMenuClick = (menuKey: string) => {
        if (menuKey === "inicio" && perfil === "cidadao") {
            const currentVar = storageService.getVariant();
            if (currentVar === "B") {
                navigate("/solicitar-coleta-rapida");
            } else {
                navigate("/inicioCidadao");
            }
            return;
        }

        onMenuSelect(menuKey);
    };

    const handleToggleVariantDirectly = () => {
        const next = variant === "A" ? "B" : "A";
        storageService.setVariant(next);
        setVariant(next);
        if (next === "B") {
            navigate("/solicitar-coleta-rapida");
        } else {
            navigate("/inicioCidadao");
        }
    };

    return (
        <>
            <div className={`sidebar ${isCollapsed ? "sidebar-collapsed" : ""}`} data-perfil={perfil}>
                <div className="sidebar-header">
                    {!isCollapsed && (
                        <div className="sidebar-logo">
                            <span className="logo-icon">♻️</span>
                            <span className="logo-text">RecyTech</span>
                        </div>
                    )}
                    <button
                        className="sidebar-toggle"
                        onClick={handleToggle}
                        aria-label="Toggle menu"
                    >
                        {isCollapsed ? "➡️" : "⬅️"}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <button
                            key={item.key}
                            className={`sidebar-item ${activeMenu === item.key ? "active" : ""}`}
                            onClick={() => handleMenuClick(item.key)}
                        >
                            <span className="sidebar-icon">{item.icon}</span>
                            {!isCollapsed && <span className="sidebar-label">{item.label}</span>}
                        </button>
                    ))}
                </nav>

                {!isCollapsed && (
                    <div className="sidebar-footer">
                        {perfil === "cidadao" && (
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-success w-100 mb-2 py-1"
                                onClick={handleToggleVariantDirectly}
                                style={{ fontSize: "0.75rem" }}
                            >
                                Modo: {variant === "A" ? "4 Etapas" : "Tela Única"} ⇄
                            </button>
                        )}

                        <button className="sidebar-logout-btn" onClick={handleLogout}>
                            <span className="logout-icon">🚪</span>
                            <span className="logout-text">Sair</span>
                        </button>
                    </div>
                )}
            </div>

            <button
                className="mobile-logout-btn"
                onClick={handleLogout}
                aria-label="Sair"
            >
                <div className="sign">🚪</div>
                <div className="mobile-logout-text">Sair</div>
            </button>
        </>
    );
};

export default Sidebar;
