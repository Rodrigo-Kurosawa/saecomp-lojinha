import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { Order, PaymentMethod } from '../../types';
import { orderService, paymentService } from '../../services/api';
import './styles.css';

const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const { state, clearCart, getTotalPrice } = useCart();
    const cartItems = state.items;
    const totalAmount = getTotalPrice();
    
    // Form states
    const [customerData, setCustomerData] = useState({
        name: '',
        course: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [qrCodeData, setQrCodeData] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);

    // Redirect if cart is empty
    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/');
        }
    }, [cartItems, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCustomerData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = (): boolean => {
        // No validation needed since all fields are optional
        return true;
    };

    const handleSubmitOrder = async () => {
        setError(null);
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Create order
            const orderData = {
                customerName: customerData.name.trim() || undefined,
                customerCourse: customerData.course.trim() || undefined,
                items: cartItems.map(item => ({
                    productId: item._id,
                    quantity: item.quantity,
                    price: item.price
                })),
                paymentMethod: 'pix' as PaymentMethod,
                totalAmount
            };

            const orderResponse = await orderService.create(orderData);
            
            const newOrderId = orderResponse.data?._id;
            if (!newOrderId) {
                throw new Error('Falha ao criar pedido');
            }
            setOrderId(newOrderId);

            // Generate PIX payment QR code
            const pixResponse = await paymentService.generatePix({
                orderId: newOrderId,
                amount: totalAmount,
                customerName: customerData.name.trim() || undefined
            });
            if (pixResponse.data?.qrCode) {
                setQrCodeData(pixResponse.data.qrCode);
            } else {
                throw new Error('Falha ao gerar código PIX');
            }
        } catch (err: any) {
            console.error('Checkout error:', err);
            let errorMessage = 'Erro ao processar pedido';
            
            if (err.message) {
                errorMessage = err.message;
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.code === 'ECONNABORTED') {
                errorMessage = 'Timeout: Verifique sua conexão e tente novamente';
            } else if (err.code === 'NETWORK_ERROR') {
                errorMessage = 'Erro de rede: Verifique sua conexão';
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentComplete = () => {
        clearCart();
        navigate(`/order-success/${orderId}`, { state: { orderId } });
    };

    if (cartItems.length === 0) {
        return null; // Will redirect
    }

    return (
        <div className="checkout">
            <div className="checkout-container">
                <h1>Finalizar Compra</h1>
                
                {/* Order Summary */}
                <div className="order-summary">
                    <h2>Resumo do Pedido</h2>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item._id} className="cart-item">
                                <img 
                                    src={item.imageUrl || '/placeholder-product.svg'} 
                                    alt={item.name}
                                    className="item-image"
                                />
                                <div className="item-info">
                                    <h3>{item.name}</h3>
                                    <p>Quantidade: {item.quantity}</p>
                                    <p>Preço unitário: R$ {item.price.toFixed(2)}</p>
                                    <p className="item-total">
                                        Subtotal: R$ {(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="total-amount">
                        <h3>Total: R$ {totalAmount.toFixed(2)}</h3>
                    </div>
                </div>

                {!qrCodeData ? (
                    /* Customer Form */
                    <div className="customer-form">
                        <h2>Dados do Cliente</h2>
                        
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmitOrder(); }}>
                            <div className="form-group">
                                <label htmlFor="name">Nome (opcional)</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={customerData.name}
                                    onChange={handleInputChange}
                                    placeholder="Digite seu nome"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="course">Curso que faz (opcional)</label>
                                <select
                                    id="course"
                                    name="course"
                                    value={customerData.course}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione seu curso</option>
                                    <option value="Engenharia de Computação">Engenharia de Computação</option>
                                    <option value="Engenharia Ambiental">Engenharia Ambiental</option>
                                    <option value="Engenharia Aeronáutica">Engenharia Aeronáutica</option>
                                    <option value="Engenharia de Materiais">Engenharia de Materiais</option>
                                    <option value="Professores/Funcionários">Professores/Funcionários</option>
                                    <option value="Outros">Outros</option>
                                </select>
                            </div>

                            <div className="payment-info">
                                <p><strong>💳 Pagamento via PIX</strong></p>
                                <p>Após confirmar o pedido, você receberá um QR Code para pagamento via PIX.</p>
                            </div>

                            {error && (
                                <div className="error-message">
                                    {error}
                                </div>
                            )}

                            <div className="form-actions">
                                <button
                                    type="button"
                                    onClick={() => navigate('/')}
                                    className="back-button"
                                >
                                    Voltar à Loja
                                </button>
                                <button
                                    type="submit"
                                    className="submit-button"
                                    disabled={loading}
                                >
                                    {loading ? 'Processando...' : 'Finalizar Pedido'}
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    /* PIX Payment */
                    <div className="pix-payment">
                        <h2>Pagamento PIX</h2>
                        <p>Escaneie o QR Code abaixo para realizar o pagamento:</p>
                        
                        <div className="qr-code-container">
                            <div className="qr-code-placeholder">
                                <p>{qrCodeData}</p>
                                <small>QR Code gerado para pagamento PIX</small>
                            </div>
                        </div>
                        
                        <div className="payment-info">
                            <p><strong>Valor:</strong> R$ {totalAmount.toFixed(2)}</p>
                            <p><strong>Pedido:</strong> #{orderId}</p>
                        </div>
                        
                        <div className="payment-actions">
                            <button
                                onClick={() => setQrCodeData(null)}
                                className="back-button"
                            >
                                Voltar
                            </button>
                            <button
                                onClick={handlePaymentComplete}
                                className="confirm-payment-button"
                            >
                                Confirmar Pagamento
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;