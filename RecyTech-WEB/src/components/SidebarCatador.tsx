// src/components/SidebarCatador.tsx
import React, { useState } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

const InicioIcon = () => <span>🏠</span>;
const ColetasIcon = () => <span>🗑️</span>;
const PerfilIcon = () => <span>👤</span>;

interface SidebarCatadorProps {
    onMenuSelect: (menu: string) => void;
    activeMenu?: string;
    onToggle?: (collapsed: boolean) => void;
}

const SidebarCatador: React.FC<SidebarCatadorProps> = ({
    onMenuSelect,
    activeMenu = "inicio",
    onToggle
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const menuItems = [
        { key: "inicio", label: "Coletas Disponíveis", icon: <InicioIcon /> },
        { key: "minhasColetas", label: "Minhas Coletas", icon: <ColetasIcon /> },
        { key: "perfil", label: "Perfil", icon: <PerfilIcon /> }
    ];

    const handleToggle = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        onToggle?.(newState);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/loginCatador");
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

export default SidebarCatador;
