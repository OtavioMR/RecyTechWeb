// src/components/Sidebar.tsx
import React, { useState } from 'react';
import './Sidebar.css';

// Ícones (substitua por seus próprios ícones ou biblioteca de ícones)
const InicioIcon = () => <span>🏠</span>;
const OpcoesIcon = () => <span>⚙️</span>;
const ColetaIcon = () => <span>🗑️</span>;
const ContaIcon = () => <span>👤</span>;

interface SidebarProps {
  onMenuSelect: (menu: string) => void;
  activeMenu?: string;
  onToggle?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuSelect, activeMenu = 'inicio', onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { key: 'inicio', label: 'Inicio', icon: <InicioIcon /> },
    { key: 'opcoes', label: 'Opções', icon: <OpcoesIcon /> },
    { key: 'coleta', label: 'Coleta', icon: <ColetaIcon /> },
    { key: 'conta', label: 'Conta', icon: <ContaIcon /> },
  ];

  const handleToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onToggle) {
      onToggle(newCollapsedState);
    }
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Header da Sidebar */}
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
          aria-label={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          {isCollapsed ? '➡️' : '⬅️'}
        </button>
      </div>

      {/* Menu de Navegação */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.key}
            className={`sidebar-item ${activeMenu === item.key ? 'active' : ''}`}
            onClick={() => onMenuSelect(item.key)}
            aria-label={item.label}
            title={item.label}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {!isCollapsed && (
              <span className="sidebar-label">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer da Sidebar */}
      {!isCollapsed && (
        <div className="sidebar-footer">
          <button 
            className="sidebar-logout-btn"
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
          >
            <span className="logout-icon">🚪</span>
            <span className="logout-text">Sair</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;