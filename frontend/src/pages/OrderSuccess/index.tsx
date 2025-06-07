import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';

const OrderSuccess = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  const handleBackToHome = () => {
    navigate('/');
  };

  if (!orderId) {
    return null;
  }

  return (
    <div className="order-success">
      <div className="order-success-container">
        <div className="success-icon">
          <div className="checkmark">✓</div>
        </div>
        
        <h1>Pedido Realizado com Sucesso!</h1>
        
        <div className="order-info">
          <p className="success-message">
            Seu pedido foi processado com sucesso. 
          </p>
          
          <div className="order-details">
            <h3>Detalhes do Pedido</h3>
            <p><strong>Número do Pedido:</strong> #{orderId}</p>
            <p><strong>Status:</strong> Aguardando Confirmação de Pagamento</p>
            <p><strong>Método de Pagamento:</strong> PIX</p>
          </div>
          
          <div className="next-steps">
            <h3>Próximos Passos</h3>
            <ul>
              <li>Se você ainda não fez o pagamento, volte para finalizar</li>
              <li>Após a confirmação do pagamento, seu pedido será preparado</li>
              <li>Você pode retirar seu pedido na lojinha SAEComp</li>
            </ul>
          </div>
        </div>
        
        <div className="success-actions">
          <button onClick={handleBackToHome} className="primary-button">
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
