import React from 'react';
import './styles.css';

interface StockIndicatorProps {
    stock: number;
    showWarning?: boolean;
    className?: string;
}

const StockIndicator: React.FC<StockIndicatorProps> = ({ 
    stock, 
    showWarning = true, 
    className = '' 
}) => {
    const getStockStatus = () => {
        if (stock === 0) return 'out-of-stock';
        if (stock < 10) return 'low-stock';
        return 'in-stock';
    };

    const getStockText = () => {
        if (stock === 0) return 'Fora de estoque';
        if (stock === 1) return `${stock} disponível`;
        return `${stock} disponíveis`;
    };

    const stockStatus = getStockStatus();

    return (
        <div className={`stock-indicator ${className}`}>
            <span className={`stock-status ${stockStatus}`}>
                {stockStatus === 'out-of-stock' ? '✗' : '✓'} {getStockText()}
            </span>
            {showWarning && stockStatus === 'low-stock' && (
                <div className="stock-warning">
                    ⚠️ Estoque baixo! Verifique a disponibilidade pessoalmente antes de realizar a compra.
                </div>
            )}
        </div>
    );
};

export default StockIndicator;
