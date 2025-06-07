import { useEffect, useState, useCallback } from 'react';
import ProductCard from '../../components/ProductCard';
import CategoryTabs from '../../components/CategoryTabs';
import { getProducts } from '../../services/api';
import { Product, ProductFilters } from '../../types';
import './styles.css';

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'doces' | 'salgados' | 'bebidas'>('all');

    const loadProducts = useCallback(async (category: 'all' | 'doces' | 'salgados' | 'bebidas') => {
        try {
            setLoading(true);
            setError(null);
            
            const filters: ProductFilters | undefined = category !== 'all' 
                ? { category }
                : undefined;
            
            const response = await getProducts(filters);
            
            if (response.data) {
                setProducts(response.data);
            } else {
                setProducts([]);
            }
        } catch (err) {
            console.error('Error loading products:', err);
            setError('Erro ao carregar produtos. Tente novamente.');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProducts(selectedCategory);
    }, [selectedCategory, loadProducts]);

    const handleCategoryChange = useCallback((category: 'all' | 'doces' | 'salgados' | 'bebidas') => {
        if (category !== selectedCategory) {
            setSelectedCategory(category);
        }
    }, [selectedCategory]);

    return (
        <div className="home">
            <div className="hero-section">
                <h1>Bem-vindo à Lojinha SAEComp</h1>
                <p>Deliciosos doces, salgados e bebidas para sua pausa!</p>
            </div>
            
            <CategoryTabs 
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />
            
            {loading && (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Carregando produtos...</p>
                </div>
            )}
            
            {error && (
                <div className="error">
                    <p>{error}</p>
                    <button onClick={() => loadProducts(selectedCategory)} className="retry-button">
                        Tentar novamente
                    </button>
                </div>
            )}
            
            {!loading && !error && (
                <div className="products-section">
                    {products.length === 0 ? (
                        <div className="no-products">
                            <p>Nenhum produto encontrado nesta categoria.</p>
                        </div>
                    ) : (
                        <div className="product-grid">
                            {products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;