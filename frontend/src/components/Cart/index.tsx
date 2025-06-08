import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiTrash2, FiShoppingBag, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';
import Button from '../Button';
import Card from '../Card';

const CartContainer = styled.div`
  min-height: 80vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%);
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(76, 175, 80, 0.2);

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #4CAF50, #03B04B);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;

    h1 {
      font-size: 2rem;
    }
  }
`;

const EmptyCartContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  min-height: 60vh;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyTitle = styled.h2`
  font-size: 2rem;
  color: #fff;
  margin-bottom: 1rem;
`;

const EmptyText = styled.p`
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CartItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: grid;
  grid-template-columns: 120px 1fr auto auto;
  gap: 1rem;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(238, 9, 122, 0.3);
    box-shadow: 0 10px 30px rgba(238, 9, 122, 0.1);
  }

  @media (max-width: 768px) {
    grid-template-columns: 80px 1fr;
    grid-template-rows: auto auto auto;
    gap: 1rem;
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid rgba(76, 175, 80, 0.2);

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #fff;
    margin: 0;
  }

  p {
    margin: 0;
    color: #888;
    font-size: 0.9rem;
  }

  .price {
    font-size: 1.1rem;
    font-weight: 600;
    color: #4CAF50;
  }
`;

const ItemControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.5rem;
`;

const QuantityButton = styled.button`
  background: transparent;
  border: 1px solid rgba(76, 175, 80, 0.5);
  color: #4CAF50;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: rgba(76, 175, 80, 0.1);
    border-color: #4CAF50;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const Quantity = styled.span`
  color: #fff;
  font-weight: 600;
  min-width: 32px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 0, 0, 0.5);
  color: #ff4757;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 0, 0, 0.1);
    border-color: #ff4757;
  }
`;

const ItemTotal = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #4CAF50;
  text-align: right;

  @media (max-width: 768px) {
    grid-column: 1 / -1;
    text-align: center;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const CartSummary = styled.div`
  position: sticky;
  top: 2rem;
  height: fit-content;
`;

const SummaryCard = styled(Card)`
  padding: 2rem;

  h3 {
    font-size: 1.5rem;
    color: #fff;
    margin-bottom: 1.5rem;
    text-align: center;
  }
`;

const SummaryLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #ccc;

  &.total {
    border-bottom: none;
    font-size: 1.2rem;
    font-weight: 700;
    color: #fff;
    padding-top: 1rem;
    margin-top: 1rem;
    border-top: 2px solid rgba(76, 175, 80, 0.3);

    span:last-child {
      color: #4CAF50;
    }
  }
`;

const CheckoutButton = styled(Link)`
  display: block;
  background: linear-gradient(135deg, #4CAF50, #03B04B);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 1.5rem 0 1rem 0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(238, 9, 122, 0.3);
    text-decoration: none;
    color: white;
  }
`;

const ContinueShoppingLink = styled(Link)`
  display: block;
  text-align: center;
  color: #888;
  text-decoration: none;
  padding: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #4CAF50;
    text-decoration: none;
  }
`;

const Cart = () => {
    const navigate = useNavigate();
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
            <CartContainer>
                <Container>
                    <EmptyCartContainer
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <EmptyIcon>
                            <FiShoppingBag />
                        </EmptyIcon>
                        <EmptyTitle>Seu carrinho está vazio</EmptyTitle>
                        <EmptyText>Adicione alguns produtos deliciosos ao seu carrinho!</EmptyText>
                        <Button variant="primary" onClick={() => navigate('/')}>
                            Continuar Comprando
                        </Button>
                    </EmptyCartContainer>
                </Container>
            </CartContainer>
        );
    }

    return (
        <CartContainer>
            <Container>
                <CartHeader>
                    <h1>Meu Carrinho</h1>
                    <Button variant="outline" onClick={handleClearCart}>
                        <FiTrash2 /> Limpar Carrinho
                    </Button>
                </CartHeader>
                
                <CartContent>
                    <CartItems>
                        {state.items.map((item, index) => (
                            <CartItem
                                key={item._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <ItemImage 
                                    src={item.imageUrl} 
                                    alt={item.name}
                                    onError={(e) => {
                                        e.currentTarget.src = '/placeholder-product.png';
                                    }}
                                />
                                <ItemDetails>
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p className="price">R$ {item.price.toFixed(2)}</p>
                                </ItemDetails>
                                <ItemControls>
                                    <QuantityControls>
                                        <QuantityButton 
                                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <FiMinus />
                                        </QuantityButton>
                                        <Quantity>{item.quantity}</Quantity>
                                        <QuantityButton 
                                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                            disabled={item.quantity >= item.stock}
                                        >
                                            <FiPlus />
                                        </QuantityButton>
                                    </QuantityControls>
                                    <RemoveButton 
                                        onClick={() => removeItem(item._id)}
                                        title="Remover item"
                                    >
                                        <FiTrash2 />
                                    </RemoveButton>
                                </ItemControls>
                                <ItemTotal>
                                    R$ {(item.price * item.quantity).toFixed(2)}
                                </ItemTotal>
                            </CartItem>
                        ))}
                    </CartItems>
                    
                    <CartSummary>
                        <SummaryCard>
                            <h3>Resumo do Pedido</h3>
                            <SummaryLine>
                                <span>Subtotal ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'})</span>
                                <span>R$ {getTotalPrice().toFixed(2)}</span>
                            </SummaryLine>
                            <SummaryLine className="total">
                                <span>Total</span>
                                <span>R$ {getTotalPrice().toFixed(2)}</span>
                            </SummaryLine>
                            <CheckoutButton to="/checkout">
                                Finalizar Compra
                            </CheckoutButton>
                            <ContinueShoppingLink to="/">
                                Continuar Comprando
                            </ContinueShoppingLink>
                        </SummaryCard>
                    </CartSummary>
                </CartContent>
            </Container>
        </CartContainer>
    );
};

export default Cart;