// src/components/Sidebar.tsx
import React, { useState } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

const InicioIcon = () => <span>🏠</span>;
const OpcoesIcon = () => <span>⚙️</span>;
const ColetaIcon = () => <span>🗑️</span>;
const ContaIcon = () => <span>👤</span>;

interface SidebarProps {
    onMenuSelect: (menu: string) => void;
    activeMenu?: string;
    onToggle?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    onMenuSelect,
    activeMenu = "inicio",
    onToggle
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const menuItems = [
        { key: "inicio", label: "Início", icon: <InicioIcon /> },
        { key: "opcoes", label: "Opções", icon: <OpcoesIcon /> },
        { key: "coleta", label: "Coleta", icon: <ColetaIcon /> },
        { key: "conta", label: "Conta", icon: <ContaIcon /> }
    ];

    const handleToggle = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        onToggle?.(newState);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/loginCidadao");
    };

    const handleMenuClick = (menuKey: string) => {
        onMenuSelect(menuKey); // 🔹 deixa o pai decidir rota
    };

    return (
        <>
            <div className={`sidebar ${isCollapsed ? "sidebar-collapsed" : ""}`}>
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
                            className={`sidebar-item ${activeMenu === item.key ? "active" : ""
                                }`}
                            onClick={() => handleMenuClick(item.key)}
                        >
                            <span className="sidebar-icon">{item.icon}</span>
                            {!isCollapsed && <span className="sidebar-label">{item.label}</span>}
                        </button>
                    ))}
                </nav>

                {!isCollapsed && (
                    <div className="sidebar-footer">
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
