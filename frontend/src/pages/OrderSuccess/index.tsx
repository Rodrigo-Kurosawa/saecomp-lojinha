import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheck, FiShoppingBag, FiPrinter, FiClock, FiCreditCard } from 'react-icons/fi';
import Button from '../../components/Button';
import Card from '../../components/Card';

const OrderSuccessContainer = styled.div`
  min-height: 80vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%);
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SuccessContent = styled(motion.div)`
  text-align: center;
`;

const SuccessIcon = styled(motion.div)`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #4caf50, #81c784);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem auto;
  box-shadow: 0 20px 40px rgba(76, 175, 80, 0.3);

  svg {
    font-size: 3rem;
    color: white;
  }
`;

const SuccessTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #4caf50, #81c784);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SuccessMessage = styled.p`
  color: #ccc;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const OrderDetails = styled(Card)`
  padding: 2rem;
  margin: 2rem 0;
  text-align: left;

  h3 {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    color: #ccc;
    margin: 0.75rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &:last-child {
      border-bottom: none;
    }

    strong {
      color: #fff;
    }

    span {
      color: #4CAF50;
      font-weight: 600;
    }
  }
`;

const NextSteps = styled(Card)`
  padding: 2rem;
  margin: 2rem 0;
  text-align: left;

  h3 {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    color: #ccc;
    margin: 1rem 0;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border-left: 4px solid #4CAF50;
    position: relative;
    padding-left: 3rem;

    &::before {
      content: '→';
      position: absolute;
      left: 1rem;
      color: #4CAF50;
      font-weight: 700;
      font-size: 1.2rem;
    }
  }
`;

const SuccessActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

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
    <OrderSuccessContainer>
      <Container>
        <SuccessContent
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SuccessIcon
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            <FiCheck />
          </SuccessIcon>
          
          <SuccessTitle>Pedido Realizado com Sucesso!</SuccessTitle>
          
          <SuccessMessage>
            Seu pedido foi processado com sucesso. 
          </SuccessMessage>
          
          <OrderDetails>
            <h3><FiShoppingBag /> Detalhes do Pedido</h3>
            <p><strong>Número do Pedido:</strong> <span>#{orderId}</span></p>
            <p><strong>Status:</strong> <span>Aguardando Confirmação de Pagamento</span></p>
            <p><strong>Método de Pagamento:</strong> <span><FiCreditCard /> PIX</span></p>
          </OrderDetails>
          
          <NextSteps>
            <h3><FiClock /> Próximos Passos</h3>
            <ul>
              <li>Se você ainda não fez o pagamento, volte para finalizar</li>
              <li>Após a confirmação do pagamento, seu pedido será preparado</li>
              <li>Você pode retirar seu pedido na lojinha SAEComp</li>
            </ul>
          </NextSteps>
        
          <SuccessActions>
            <Button variant="primary" onClick={handleBackToHome}>
              <FiShoppingBag /> Fazer Novo Pedido
            </Button>
            <Button variant="outline" onClick={() => window.print()}>
              <FiPrinter /> Imprimir Comprovante
            </Button>
          </SuccessActions>
        </SuccessContent>
      </Container>
    </OrderSuccessContainer>
  );
};

export default OrderSuccess;
