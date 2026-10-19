import { useState, useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import './ABTestToolbar.css';

export default function ABTestToolbar() {
    const navigate = useNavigate();

    const [variant, setVariant] = useState<'A' | 'B'>('A');
    const [collapsed, setCollapsed] = useState(false);
    const [position, setPosition] = useState<{ left: number; top: number } | null>(null);
    const dragRef = useRef<{ pointerId: number; x: number; y: number; left: number; top: number } | null>(null);
    const movedRef = useRef(false);

    useEffect(() => {
        setVariant(storageService.getVariant());

        const handleVariantChange = (event: Event) => {
            const changedVariant = (event as CustomEvent<'A' | 'B'>).detail;
            if (changedVariant === 'A' || changedVariant === 'B') {
                setVariant(changedVariant);
            }
        };

        window.addEventListener('recytech:variant_changed', handleVariantChange);
        return () => window.removeEventListener('recytech:variant_changed', handleVariantChange);
    }, []);

    const handleSwitchVariant = (target: 'A' | 'B') => {
        storageService.setVariant(target);
        setVariant(target);

        if (target === 'A') {
            navigate('/inicioCidadao');
        } else {
            navigate('/solicitar-coleta-rapida');
        }
    };

    const handleReset = () => {
        if (window.confirm("Restaurar dados padrão do teste?")) {
            storageService.resetStorage();
            window.location.reload();
        }
    };

    const handleDragStart = (event: ReactPointerEvent<HTMLElement>) => {
        const wrapper = event.currentTarget.closest('.ab-toolbar-wrapper');
        if (!(wrapper instanceof HTMLElement)) return;

        const bounds = wrapper.getBoundingClientRect();
        dragRef.current = {
            pointerId: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            left: bounds.left,
            top: bounds.top,
        };
        movedRef.current = false;
        setPosition({ left: bounds.left, top: bounds.top });
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handleDragMove = (event: ReactPointerEvent<HTMLElement>) => {
        const drag = dragRef.current;
        if (!drag || drag.pointerId !== event.pointerId) return;

        const wrapper = event.currentTarget.closest('.ab-toolbar-wrapper');
        if (!(wrapper instanceof HTMLElement)) return;

        const bounds = wrapper.getBoundingClientRect();
        const left = Math.max(0, Math.min(window.innerWidth - bounds.width, drag.left + event.clientX - drag.x));
        const top = Math.max(0, Math.min(window.innerHeight - bounds.height, drag.top + event.clientY - drag.y));
        if (Math.abs(event.clientX - drag.x) > 3 || Math.abs(event.clientY - drag.y) > 3) {
            movedRef.current = true;
        }
        setPosition({ left, top });
    };

    const handleDragEnd = (event: ReactPointerEvent<HTMLElement>) => {
        if (dragRef.current?.pointerId !== event.pointerId) return;
        dragRef.current = null;
        event.currentTarget.releasePointerCapture(event.pointerId);
    };

    const toolbarStyle = position
        ? { left: `${position.left}px`, top: `${position.top}px`, right: 'auto', bottom: 'auto' }
        : undefined;

    if (collapsed) {
        return (
            <div className="ab-toolbar-wrapper" style={toolbarStyle}>
                <button
                    className="ab-toolbar-container collapsed"
                    onClick={() => {
                        if (movedRef.current) {
                            movedRef.current = false;
                            return;
                        }
                        setCollapsed(false);
                    }}
                    onPointerDown={handleDragStart}
                    onPointerMove={handleDragMove}
                    onPointerUp={handleDragEnd}
                    onPointerCancel={handleDragEnd}
                    title="Abrir Seletor A/B"
                    aria-label="Abrir seletor A/B ou arrastar para mover"
                >
                    🧪
                </button>
            </div>
        );
    }

    return (
        <div className="ab-toolbar-wrapper" style={toolbarStyle}>
            <div className="ab-toolbar-container">
                <button
                    type="button"
                    className="ab-drag-handle"
                    onPointerDown={handleDragStart}
                    onPointerMove={handleDragMove}
                    onPointerUp={handleDragEnd}
                    onPointerCancel={handleDragEnd}
                    aria-label="Arrastar seletor A/B"
                    title="Segure para mover"
                >
                    ⠿
                </button>
                <div className="ab-btn-group">
                    <button
                        type="button"
                        className={`ab-toggle-btn ${variant === 'A' ? 'active' : ''}`}
                        onClick={() => handleSwitchVariant('A')}
                    >
                        📋 4 Etapas (A)
                    </button>
                    <button
                        type="button"
                        className={`ab-toggle-btn ${variant === 'B' ? 'active' : ''}`}
                        onClick={() => handleSwitchVariant('B')}
                    >
                        ⚡ Tela Única (B)
                    </button>
                </div>

                <button
                    type="button"
                    className="ab-reset-btn"
                    onClick={handleReset}
                    title="Resetar dados do teste"
                >
                    ↺
                </button>

                <button
                    type="button"
                    className="ab-collapse-btn"
                    onClick={() => setCollapsed(true)}
                    title="Minimizar"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
