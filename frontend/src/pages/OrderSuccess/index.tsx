import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Order } from '../../types';
import { orderService } from '../../services/api';
import './styles.css';

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get orderId from URL params or location state
  const orderId = params.orderId || location.state?.orderId;

  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await orderService.getById(orderId);
        if (response.data) {
          setOrder(response.data);
        } else {
          setError('Pedido não encontrado');
        }
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar pedido');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  const handleBackToHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="order-success-loading">
        <div className="loading-spinner"></div>
        <p>Carregando informações do pedido...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="order-success-error">
        <h2>Erro</h2>
        <p>{error || 'Pedido não encontrado'}</p>
        <button onClick={handleBackToHome} className="home-button">
          Voltar à Loja
        </button>
      </div>
    );
  }

  return (
    <div className="order-success">
      <div className="order-success-container">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#28a745"/>
            <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1>Pedido Realizado com Sucesso!</h1>
        <p className="success-message">
          Seu pedido foi processado e está sendo preparado.
        </p>
        
        <div className="order-details">
          <h2>Detalhes do Pedido</h2>
          
          <div className="order-info">
            <div className="info-row">
              <span className="label">Número do Pedido:</span>
              <span className="value">#{order._id.slice(-8).toUpperCase()}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Cliente:</span>
              <span className="value">{order.customerName}</span>
            </div>
            
            {order.customerEmail && (
              <div className="info-row">
                <span className="label">Email:</span>
                <span className="value">{order.customerEmail}</span>
              </div>
            )}
            
            {order.customerPhone && (
              <div className="info-row">
                <span className="label">Telefone:</span>
                <span className="value">{order.customerPhone}</span>
              </div>
            )}
            
            <div className="info-row">
              <span className="label">Total:</span>
              <span className="value total">R$ {order.totalAmount.toFixed(2)}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Status:</span>
              <span className={`value status ${order.status}`}>
                {getStatusText(order.status)}
              </span>
            </div>
            
            <div className="info-row">
              <span className="label">Pagamento:</span>
              <span className={`value payment-status ${order.paymentStatus}`}>
                {getPaymentStatusText(order.paymentStatus)}
              </span>
            </div>
          </div>
          
          <div className="order-items">
            <h3>Itens do Pedido</h3>
            <div className="items-list">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-details">
                      {item.quantity}x R$ {item.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="item-subtotal">
                    R$ {(item.quantity * item.price).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="next-steps">
          <h3>Próximos Passos</h3>
          <ul>
            <li>Você receberá atualizações sobre o status do seu pedido</li>
            <li>Seu pedido será preparado em ordem de chegada</li>
            <li>Aguarde a confirmação para retirada</li>
          </ul>
        </div>
        
        <div className="action-buttons">
          <button onClick={handleBackToHome} className="home-button">
            Fazer Novo Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    preparing: 'Preparando',
    ready: 'Pronto',
    delivered: 'Entregue',
    cancelled: 'Cancelado'
  };
  return statusMap[status] || status;
};

const getPaymentStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: 'Pendente',
    completed: 'Pago',
    failed: 'Falhou',
    cancelled: 'Cancelado'
  };
  return statusMap[status] || status;
};

export default OrderSuccess;
