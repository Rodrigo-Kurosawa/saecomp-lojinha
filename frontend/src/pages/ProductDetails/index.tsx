import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../hooks/useCart';
import { productService } from '../../services/api';
import StockIndicator from '../../components/StockIndicator';
import './styles.css';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addItem } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                setError('Product ID not found');
                setLoading(false);
                return;
            }

            try {
                const response = await productService.getById(id);
                if (response.data) {
                    setProduct(response.data);
                } else {
                    setError('Produto não encontrado');
                }
            } catch (err: any) {
                setError(err.message || 'Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            // Add product to cart multiple times based on quantity
            for (let i = 0; i < quantity; i++) {
                addItem(product);
            }
            // Optionally show a success message or redirect
        }
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <div className="product-details-loading">
                <div className="loading-spinner"></div>
                <p>Carregando produto...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-details-error">
                <h2>Erro</h2>
                <p>{error}</p>
                <button onClick={handleBackToHome} className="back-button">
                    Voltar à loja
                </button>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-details-error">
                <h2>Produto não encontrado</h2>
                <p>O produto que você está procurando não existe.</p>
                <button onClick={handleBackToHome} className="back-button">
                    Voltar à loja
                </button>
            </div>
        );
    }

    return (
        <div className="product-details">
            <div className="product-details-container">
                <button onClick={handleBackToHome} className="back-button">
                    ← Voltar
                </button>
                
                <div className="product-details-content">
                    <div className="product-image-section">
                        <img 
                            src={product.imageUrl || '/placeholder-product.svg'} 
                            alt={product.name}
                            className="product-image"
                        />
                    </div>
                    
                    <div className="product-info-section">
                        <h1 className="product-title">{product.name}</h1>
                        <p className="product-category">{product.category}</p>
                        <p className="product-description">{product.description}</p>
                        
                        <div className="product-price">
                            R$ {product.price.toFixed(2)}
                        </div>
                        
                        <StockIndicator stock={product.stock} showWarning={true} />
                        
                        {product.stock > 0 && (
                            <div className="purchase-section">
                                <div className="quantity-selector">
                                    <label htmlFor="quantity">Quantidade:</label>
                                    <div className="quantity-controls">
                                        <button 
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            disabled={quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <input
                                            id="quantity"
                                            type="number"
                                            min="1"
                                            max={product.stock}
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                                        />
                                        <button 
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            disabled={quantity >= product.stock}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                
                                <button 
                                    className="add-to-cart-button"
                                    onClick={handleAddToCart}
                                >
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;