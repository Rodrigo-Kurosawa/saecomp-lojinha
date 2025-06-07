import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../hooks/useCart';
import './styles.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-link">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="product-image"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-product.svg';
          }}
        />
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>
      </Link>
      <div className="product-footer">
        <p className="product-price">R$ {product.price.toFixed(2)}</p>
        <button 
          onClick={handleAddToCart} 
          className="add-to-cart-button"
          disabled={!product.isAvailable || product.stock === 0}
        >
          {product.stock === 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;