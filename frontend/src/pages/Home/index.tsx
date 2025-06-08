import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import NavBar from '../../components/NavBar';
import Hero from '../../components/Hero';
import ProductCard from '../../components/ProductCard';
import CategoryTabs from '../../components/CategoryTabs';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import { getProducts } from '../../services/api';
import { Product, ProductFilters } from '../../types';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
`;

const ProductsSection = styled.section`
  padding: 4rem 0;
  background: transparent;
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  
  span {
    color: #4CAF50;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin: 2rem 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #1a1a1a;
  }
  
  p {
    font-size: 1.1rem;
  }
`;

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

    const scrollToProducts = () => {
        document.getElementById('products-section')?.scrollIntoView({ 
            behavior: 'smooth' 
        });
    };

    return (
        <Container>
            <NavBar />
            
            <Hero
                title="Bem-vindo à <span>SAEComp</span> Lojinha"
                subtitle="Deliciosos doces, salgados e bebidas para sua pausa perfeita! Produtos frescos e saborosos esperando por você."
                onCTAClick={scrollToProducts}
            />
            
            <ProductsSection id="products-section">
                <SectionContainer>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <SectionTitle>
                            Nossos <span>Produtos</span>
                        </SectionTitle>
                        <SectionSubtitle>
                            Escolha entre nossa variedade de produtos frescos e deliciosos
                        </SectionSubtitle>
                    </motion.div>
                    
                    <CategoryTabs 
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                    
                    {loading && (
                        <Loading 
                            text="Carregando produtos deliciosos..."
                            size="large"
                        />
                    )}
                    
                    {error && (
                        <ErrorMessage>
                            {error}
                        </ErrorMessage>
                    )}
                    
                    {!loading && !error && products.length === 0 && (
                        <EmptyState>
                            <h3>Nenhum produto encontrado</h3>
                            <p>Não há produtos disponíveis nesta categoria no momento.</p>
                        </EmptyState>
                    )}
                    
                    {!loading && !error && products.length > 0 && (
                        <ProductsGrid>
                            {products.map((product, index) => (
                                <motion.div
                                    key={product._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </ProductsGrid>
                    )}
                </SectionContainer>
            </ProductsSection>
            
            <Footer />
        </Container>
    );
};

export default Home;