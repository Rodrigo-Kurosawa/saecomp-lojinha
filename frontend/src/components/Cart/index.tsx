import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import './styles.css';

const Cart = () => {
    const { state, removeItem, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();

    const handleQuantityChange = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId);
        } else {
            updateQuantity(productId, quantity);
        }
    };

    const handleClearCart = () => {
        if (window.confirm('Tem certeza que deseja limpar todo o carrinho?')) {
            clearCart();
        }
    };

    if (state.items.length === 0) {
        return (
            <div className="cart-page">
                <div className="container">
                    <div className="cart-empty">
                        <div className="empty-icon">🛒</div>
                        <h2>Seu carrinho está vazio</h2>
                        <p>Adicione alguns produtos deliciosos ao seu carrinho!</p>
                        <Link to="/" className="continue-shopping">
                            Continuar Comprando
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <div className="cart-header">
                    <h1>Meu Carrinho</h1>
                    <button onClick={handleClearCart} className="clear-cart-btn">
                        Limpar Carrinho
                    </button>
                </div>
                
                <div className="cart-content">
                    <div className="cart-items">
                        {state.items.map(item => (
                            <div key={item._id} className="cart-item">
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.name} 
                                    className="item-image"
                                    onError={(e) => {
                                        e.currentTarget.src = '/placeholder-product.png';
                                    }}
                                />
                                <div className="item-details">
                                    <h3 className="item-name">{item.name}</h3>
                                    <p className="item-description">{item.description}</p>
                                    <p className="item-price">R$ {item.price.toFixed(2)}</p>
                                </div>
                                <div className="item-controls">
                                    <div className="quantity-controls">
                                        <button 
                                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                            className="quantity-btn"
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="quantity">{item.quantity}</span>
                                        <button 
                                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                            className="quantity-btn"
                                            disabled={item.quantity >= item.stock}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => removeItem(item._id)}
                                        className="remove-btn"
                                        title="Remover item"
                                    >
                                        🗑️
                                    </button>
                                </div>
                                <div className="item-total">
                                    R$ {(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="cart-summary">
                        <div className="summary-card">
                            <h3>Resumo do Pedido</h3>
                            <div className="summary-line">
                                <span>Subtotal ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'})</span>
                                <span>R$ {getTotalPrice().toFixed(2)}</span>
                            </div>
                            <div className="summary-line total">
                                <span>Total</span>
                                <span>R$ {getTotalPrice().toFixed(2)}</span>
                            </div>
                            <Link to="/checkout" className="checkout-btn">
                                Finalizar Compra
                            </Link>
                            <Link to="/" className="continue-shopping-link">
                                Continuar Comprando
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;