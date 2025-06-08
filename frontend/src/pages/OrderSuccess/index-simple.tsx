import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';

const OrderSuccess = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();

    return (
        <div className="order-success">
            <div className="order-success-container">
                <div className="success-icon">
                    <div className="checkmark">✓</div>
                </div>
                
                <h1>Pedido Realizado com Sucesso!</h1>
                
                <div className="order-info">
                    <p className="success-message">
                        Seu pedido foi processado com sucesso! 
                    </p>
                    
                    <div className="order-details">
                        <h3>Detalhes do Pedido</h3>
                        <p><strong>Número do Pedido:</strong> #{orderId}</p>
                        <p><strong>Status:</strong> Confirmado</p>
                        <p><strong>Método de Pagamento:</strong> PIX</p>
                        <p><strong>Total:</strong> R$ 10,00</p>
                    </div>
                    
                    <div className="next-steps">
                        <h3>Próximos Passos</h3>
                        <ul>
                            <li>Seu pedido está sendo preparado</li>
                            <li>Você pode retirar na lojinha SAEComp</li>
                            <li>Em caso de dúvidas, entre em contato conosco</li>
                        </ul>
                    </div>
                </div>
                
                <div className="success-actions">
                    <button onClick={() => navigate('/')} className="primary-button">
                        Fazer Novo Pedido
                    </button>
                    <button onClick={() => window.print()} className="secondary-button">
                        Imprimir Comprovante
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
