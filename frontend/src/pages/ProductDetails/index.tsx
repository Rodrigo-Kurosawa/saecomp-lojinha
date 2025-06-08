import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiShoppingCart, FiMinus, FiPlus, FiCheck, FiX } from 'react-icons/fi';
import { Product } from '../../types';
import { useCart } from '../../hooks/useCart';
import { productService } from '../../services/api';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import Card from '../../components/Card';

const ProductDetailsContainer = styled.div`
  min-height: 80vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%);
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const BackButton = styled(Button)`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ErrorContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  min-height: 60vh;

  h2 {
    color: #fff;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    color: #888;
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

const ProductContent = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  position: sticky;
  top: 2rem;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: 400px;
  object-fit: cover;
  border-radius: 16px;
  border: 2px solid rgba(76, 175, 80, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    border-color: rgba(76, 175, 80, 0.4);
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProductTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  background: linear-gradient(135deg, #4CAF50, #03B04B);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ProductCategory = styled.p`
  color: #4CAF50;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
`;

const ProductDescription = styled.p`
  color: #ccc;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
`;

const ProductPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #4CAF50;
  background: rgba(76, 175, 80, 0.1);
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid rgba(76, 175, 80, 0.2);
  text-align: center;
`;

const StockStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;

  &.in-stock {
    color: #4caf50;
  }

  &.out-of-stock {
    color: #f44336;
  }
`;

const PurchaseSection = styled(Card)`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const QuantitySelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    color: #fff;
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
`;

const QuantityButton = styled.button`
  background: rgba(76, 175, 80, 0.1);
  border: 2px solid rgba(76, 175, 80, 0.3);
  color: #4CAF50;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1.2rem;

  &:hover:not(:disabled) {
    background: rgba(76, 175, 80, 0.2);
    border-color: #4CAF50;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  width: 80px;
  height: 40px;
  text-align: center;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const AddToCartButton = styled(Button)`
  font-size: 1.2rem;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

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
            <ProductDetailsContainer>
                <Container>
                    <Loading />
                </Container>
            </ProductDetailsContainer>
        );
    }

    if (error) {
        return (
            <ProductDetailsContainer>
                <Container>
                    <ErrorContainer
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Erro</h2>
                        <p>{error}</p>
                        <Button variant="primary" onClick={handleBackToHome}>
                            <FiArrowLeft /> Voltar à loja
                        </Button>
                    </ErrorContainer>
                </Container>
            </ProductDetailsContainer>
        );
    }

    if (!product) {
        return (
            <ProductDetailsContainer>
                <Container>
                    <ErrorContainer
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Produto não encontrado</h2>
                        <p>O produto que você está procurando não existe.</p>
                        <Button variant="primary" onClick={handleBackToHome}>
                            <FiArrowLeft /> Voltar à loja
                        </Button>
                    </ErrorContainer>
                </Container>
            </ProductDetailsContainer>
        );
    }

    return (
        <ProductDetailsContainer>
            <Container>
                <BackButton variant="outline" onClick={handleBackToHome}>
                    <FiArrowLeft /> Voltar
                </BackButton>
                
                <ProductContent
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <ImageSection>
                        <ProductImage 
                            src={product.imageUrl || '/placeholder-product.jpg'} 
                            alt={product.name}
                        />
                    </ImageSection>
                    
                    <InfoSection>
                        <ProductTitle>{product.name}</ProductTitle>
                        <ProductCategory>{product.category}</ProductCategory>
                        <ProductDescription>{product.description}</ProductDescription>
                        
                        <ProductPrice>
                            R$ {product.price.toFixed(2)}
                        </ProductPrice>
                        
                        <StockStatus className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                            {product.stock > 0 ? (
                                <>
                                    <FiCheck /> Em estoque ({product.stock} disponíveis)
                                </>
                            ) : (
                                <>
                                    <FiX /> Fora de estoque
                                </>
                            )}
                        </StockStatus>
                        
                        {product.stock > 0 && (
                            <PurchaseSection>
                                <QuantitySelector>
                                    <label htmlFor="quantity">Quantidade:</label>
                                    <QuantityControls>
                                        <QuantityButton 
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            disabled={quantity <= 1}
                                        >
                                            <FiMinus />
                                        </QuantityButton>
                                        <QuantityInput
                                            id="quantity"
                                            type="number"
                                            min="1"
                                            max={product.stock}
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                                        />
                                        <QuantityButton 
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            disabled={quantity >= product.stock}
                                        >
                                            <FiPlus />
                                        </QuantityButton>
                                    </QuantityControls>
                                </QuantitySelector>
                                
                                <AddToCartButton 
                                    variant="primary"
                                    onClick={handleAddToCart}
                                >
                                    <FiShoppingCart /> Adicionar ao Carrinho
                                </AddToCartButton>
                            </PurchaseSection>
                        )}
                    </InfoSection>
                </ProductContent>
            </Container>
        </ProductDetailsContainer>
    );
};

export default ProductDetails;