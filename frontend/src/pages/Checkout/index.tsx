import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCreditCard, FiUser, FiShoppingBag, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';
import { Order, PaymentMethod } from '../../types';
import { orderService, paymentService } from '../../services/api';
import Button from '../../components/Button';
import Card from '../../components/Card';

const CheckoutContainer = styled.div`
  min-height: 80vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%);
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const CheckoutTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #4CAF50, #03B04B);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CheckoutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const OrderSummary = styled(Card)`
  padding: 2rem;
  position: sticky;
  top: 2rem;
  height: fit-content;

  h2 {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const CartItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid rgba(76, 175, 80, 0.2);
`;

const ItemInfo = styled.div`
  flex: 1;

  h3 {
    color: #fff;
    font-size: 1rem;
    margin: 0 0 0.5rem 0;
  }

  p {
    color: #888;
    font-size: 0.9rem;
    margin: 0.2rem 0;

    &.item-total {
      color: #4CAF50;
      font-weight: 600;
    }
  }
`;

const TotalAmount = styled.div`
  border-top: 2px solid rgba(76, 175, 80, 0.3);
  padding-top: 1rem;
  text-align: center;

  h3 {
    color: #4CAF50;
    font-size: 1.5rem;
    margin: 0;
  }
`;

const FormSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CustomerForm = styled(Card)`
  padding: 2rem;

  h2 {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    color: #fff;
    font-weight: 600;
    font-size: 1rem;
  }

  input {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #4CAF50;
      background: rgba(255, 255, 255, 0.15);
    }

    &::placeholder {
      color: #888;
    }
  }
`;

const PaymentInfo = styled.div`
  background: rgba(76, 175, 80, 0.1);
  border: 2px solid rgba(76, 175, 80, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;

  p {
    color: #fff;
    margin: 0.5rem 0;

    &:first-child {
      font-weight: 700;
      font-size: 1.1rem;
      color: #4CAF50;
    }
  }
`;

const ErrorMessage = styled.div`
  background: rgba(244, 67, 54, 0.1);
  border: 2px solid rgba(244, 67, 54, 0.3);
  color: #f44336;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
`;

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PixPayment = styled(Card)`
  padding: 2rem;
  text-align: center;

  h2 {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  p {
    color: #ccc;
    margin-bottom: 2rem;
  }
`;

const QrCodeContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
  border: 3px solid #4CAF50;
  box-shadow: 0 10px 30px rgba(76, 175, 80, 0.2);

  p {
    color: #333;
    font-family: monospace;
    font-size: 0.9rem;
    word-break: break-all;
    margin-bottom: 1rem;
  }

  small {
    color: #666;
    font-size: 0.8rem;
  }
`;

const PaymentDetails = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;

  p {
    color: #fff;
    margin: 0.5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      color: #4CAF50;
    }
  }
`;

const PaymentActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <CheckoutContainer>
            <Container>
                <CheckoutTitle>Finalizar Compra</CheckoutTitle>
                
                <CheckoutContent>
                    <FormSection
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {!qrCodeData ? (
                            <CustomerForm>
                                <h2><FiUser /> Dados do Cliente</h2>
                                
                                <Form onSubmit={(e) => { e.preventDefault(); handleSubmitOrder(); }}>
                                    <FormGroup>
                                        <label htmlFor="name">Nome (opcional)</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={customerData.name}
                                            onChange={handleInputChange}
                                            placeholder="Digite seu nome"
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <label htmlFor="course">Curso que faz (opcional)</label>
                                        <input
                                            type="text"
                                            id="course"
                                            name="course"
                                            value={customerData.course}
                                            onChange={handleInputChange}
                                            placeholder="Ex: Ciência da Computação"
                                        />
                                    </FormGroup>

                                    <PaymentInfo>
                                        <p><FiCreditCard /> Pagamento via PIX</p>
                                        <p>Após confirmar o pedido, você receberá um QR Code para pagamento via PIX.</p>
                                    </PaymentInfo>

                                    {error && (
                                        <ErrorMessage>
                                            {error}
                                        </ErrorMessage>
                                    )}

                                    <FormActions>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => navigate('/')}
                                        >
                                            <FiArrowLeft /> Voltar à Loja
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            disabled={loading}
                                        >
                                            {loading ? 'Processando...' : 'Finalizar Pedido'}
                                        </Button>
                                    </FormActions>
                                </Form>
                            </CustomerForm>
                        ) : (
                            <PixPayment>
                                <h2><FiCreditCard /> Pagamento PIX</h2>
                                <p>Escaneie o QR Code abaixo para realizar o pagamento:</p>
                                
                                <QrCodeContainer>
                                    <p>{qrCodeData}</p>
                                    <small>QR Code gerado para pagamento PIX</small>
                                </QrCodeContainer>
                                
                                <PaymentDetails>
                                    <p><strong>Valor:</strong> <span>R$ {totalAmount.toFixed(2)}</span></p>
                                    <p><strong>Pedido:</strong> <span>#{orderId}</span></p>
                                </PaymentDetails>
                                
                                <PaymentActions>
                                    <Button
                                        variant="outline"
                                        onClick={() => setQrCodeData(null)}
                                    >
                                        <FiArrowLeft /> Voltar
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={handlePaymentComplete}
                                    >
                                        <FiCheck /> Confirmar Pagamento
                                    </Button>
                                </PaymentActions>
                            </PixPayment>
                        )}
                    </FormSection>

                    <OrderSummary>
                        <h2><FiShoppingBag /> Resumo do Pedido</h2>
                        <CartItems>
                            {cartItems.map((item) => (
                                <CartItem key={item._id}>
                                    <ItemImage 
                                        src={item.imageUrl || '/placeholder-product.jpg'} 
                                        alt={item.name}
                                    />
                                    <ItemInfo>
                                        <h3>{item.name}</h3>
                                        <p>Quantidade: {item.quantity}</p>
                                        <p>Preço unitário: R$ {item.price.toFixed(2)}</p>
                                        <p className="item-total">
                                            Subtotal: R$ {(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </ItemInfo>
                                </CartItem>
                            ))}
                        </CartItems>
                        <TotalAmount>
                            <h3>Total: R$ {totalAmount.toFixed(2)}</h3>
                        </TotalAmount>
                    </OrderSummary>
                </CheckoutContent>
            </Container>
        </CheckoutContainer>
    );
};

export default Checkout;