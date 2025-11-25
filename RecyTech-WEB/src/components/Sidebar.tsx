// src/components/Sidebar.tsx
import React, { useState } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const InicioIcon = () => <span>🏠</span>;
const OpcoesIcon = () => <span>⚙️</span>;
const ColetaIcon = () => <span>🗑️</span>;
const ContaIcon = () => <span>👤</span>;

interface SidebarProps {
  onMenuSelect?: (menu: string) => void;
  activeMenu?: string;
  onToggle?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onMenuSelect = () => {},
  activeMenu = 'inicioCidadao',
  onToggle,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { key: 'inicioCidadao', label: 'Início', icon: <InicioIcon /> },
    { key: 'opcoes', label: 'Opções', icon: <OpcoesIcon /> },
    { key: 'coleta', label: 'Coleta', icon: <ColetaIcon /> },
    { key: 'conta', label: 'Conta', icon: <ContaIcon /> },
  ];

  const navigate = useNavigate();

  const handleToggle = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onToggle && onToggle(newState);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleMenuClick = (menuKey: string) => {
    onMenuSelect(menuKey);
    navigate(`/${menuKey}`);
  };

  return (
    <>
      <div className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        
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
            {isCollapsed ? '➡️' : '⬅️'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.key}
              className={`sidebar-item ${activeMenu === item.key ? 'active' : ''}`}
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
        <div className="sign">
          <svg viewBox="0 0 512 512">
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
          </svg>
        </div>
        <div className="mobile-logout-text">Sair</div>
      </button>
    </>
  );
};

export default Sidebar;
