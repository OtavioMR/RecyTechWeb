import React from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import './ABComparisonHeader.css';

interface ABComparisonHeaderProps {
    currentVariant: 'A' | 'B';
    currentStep?: string;
}

export const ABComparisonHeader: React.FC<ABComparisonHeaderProps> = ({
    currentVariant,
}) => {
    const navigate = useNavigate();

    const handleSelectVariant = (target: 'A' | 'B') => {
        if (target === currentVariant) return;
        storageService.setVariant(target);
        if (target === 'A') {
            navigate('/inicioCidadao');
        } else {
            navigate('/solicitar-coleta-rapida');
        }
    };

    return (
        <div className="ab-minimal-bar">
            <span className="ab-minimal-label">Teste A/B:</span>
            <div className="ab-segmented-pill">
                <button
                    type="button"
                    className={`ab-seg-btn ${currentVariant === 'A' ? 'active' : ''}`}
                    onClick={() => handleSelectVariant('A')}
                >
                    📋 4 Etapas (A)
                </button>
                <button
                    type="button"
                    className={`ab-seg-btn ${currentVariant === 'B' ? 'active' : ''}`}
                    onClick={() => handleSelectVariant('B')}
                >
                    ⚡ Tela Única (B)
                </button>
            </div>
        </div>
    );
};
