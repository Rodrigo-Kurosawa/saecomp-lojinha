import { useNavigate } from 'react-router-dom';
import './styles.css';

const Checkout = () => {
    const navigate = useNavigate();

    const handlePayment = () => {
        // Simular pagamento e redirecionar para página de sucesso
        const orderId = Math.random().toString(36).substring(7);
        navigate(`/order-success/${orderId}`);
    };

    return (
        <div className="checkout-container">
            <h1>Finalizar Pedido</h1>
            
            <div className="checkout-content">
                <div className="order-summary">
                    <h2>Resumo do Pedido</h2>
                    <div className="order-items">
                        <div className="order-item">
                            <span>Brigadeiro x1</span>
                            <span>R$ 2,50</span>
                        </div>
                        <div className="order-item">
                            <span>Coxinha x1</span>
                            <span>R$ 4,00</span>
                        </div>
                        <div className="order-item">
                            <span>Refrigerante x1</span>
                            <span>R$ 3,50</span>
                        </div>
                        <div className="order-total">
                            <strong>Total: R$ 10,00</strong>
                        </div>
                    </div>
                </div>

                <div className="payment-section">
                    <h2>Pagamento PIX</h2>
                    <p>Escaneie o QR Code abaixo para realizar o pagamento:</p>
                    
                    <div className="qr-code-container">
                        <div className="qr-code-placeholder">
                            <p>QR CODE PIX</p>
                            <p>R$ 10,00</p>
                        </div>
                    </div>

                    <div className="payment-actions">
                        <button onClick={handlePayment} className="payment-button">
                            Simular Pagamento Concluído
                        </button>
                        <button onClick={() => navigate('/')} className="back-button">
                            Voltar para Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
