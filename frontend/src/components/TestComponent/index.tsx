import { useEffect, useState } from 'react';
import { getProducts } from '../../services/api';
import { Product, ProductFilters } from '../../types';

const TestComponent = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'doces' | 'salgados' | 'bebidas'>('all');

    useEffect(() => {
        loadProducts();
    }, [selectedCategory]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            
            const filters: ProductFilters | undefined = selectedCategory !== 'all' 
                ? { category: selectedCategory }
                : undefined;
                
            console.log('Loading products with filters:', filters);
            const response = await getProducts(filters);
            console.log('API Response:', response);
            
            setProducts(response.data || []);
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Test Component</h2>
            
            <div style={{ marginBottom: '20px' }}>
                <button onClick={() => setSelectedCategory('all')}>Todos</button>
                <button onClick={() => setSelectedCategory('doces')}>Doces</button>
                <button onClick={() => setSelectedCategory('salgados')}>Salgados</button>
                <button onClick={() => setSelectedCategory('bebidas')}>Bebidas</button>
            </div>
            
            <p>Selected: {selectedCategory}</p>
            <p>Loading: {loading ? 'Yes' : 'No'}</p>
            <p>Products count: {products.length}</p>
            
            {loading && <p>Loading...</p>}
            
            {!loading && (
                <div>
                    <h3>Products:</h3>
                    {products.map(product => (
                        <div key={product._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                            <h4>{product.name}</h4>
                            <p>Category: {product.category}</p>
                            <p>Price: R$ {product.price}</p>
                            <p>Stock: {product.stock}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TestComponent;
