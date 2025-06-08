import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import { useCart } from '../../hooks/useCart';
import Button from '../Button';

const CardContainer = styled(motion.div)`
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border: 1px solid #333;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 30px rgba(76, 175, 80, 0.2);
    border-color: #4CAF50;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 200px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }
  
  p {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    flex: 1;
  }
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
`;

const Price = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #4CAF50;
`;

const StockBadge = styled.span<{ inStock: boolean }>`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ inStock }) => inStock ? '#10b981' : '#ef4444'};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <CardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ImageContainer>
          <img 
            src={product.imageUrl} 
            alt={product.name}
            onError={(e) => {
              e.currentTarget.src = '/placeholder-product.svg';
            }}
          />
          <StockBadge inStock={product.stock > 0}>
            {product.stock > 0 ? 'Em Estoque' : 'Esgotado'}
          </StockBadge>
        </ImageContainer>
        <ProductInfo>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </ProductInfo>
      </Link>
      <ProductFooter>
        <Price>R$ {product.price.toFixed(2)}</Price>
        <Button 
          onClick={handleAddToCart} 
          disabled={!product.isAvailable || product.stock === 0}
          size="small"
          variant={product.stock === 0 ? 'secondary' : 'primary'}
        >
          {product.stock === 0 ? 'Esgotado' : 'Adicionar'}
        </Button>
      </ProductFooter>
    </CardContainer>
  );
};

export default ProductCard;