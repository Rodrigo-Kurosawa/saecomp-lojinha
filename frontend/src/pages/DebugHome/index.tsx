import { useEffect, useState } from 'react';
import { getProducts } from '../../services/api';
import { Product, ProductFilters } from '../../types';

const DebugHome = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'doces' | 'salgados' | 'bebidas'>('all');
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
        console.log(message);
    };

    useEffect(() => {
        addLog(`useEffect triggered, selectedCategory: ${selectedCategory}`);
        loadProducts();
    }, [selectedCategory]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            addLog('Starting loadProducts...');
            
            const filters: ProductFilters | undefined = selectedCategory !== 'all' 
                ? { category: selectedCategory }
                : undefined;
                
            addLog(`Using filters: ${JSON.stringify(filters)}`);
            
            const response = await getProducts(filters);
            
            addLog(`API Response received: ${response.data?.length || 0} products`);
            
            setProducts(response.data || []);
        } catch (err) {
            addLog(`Error: ${err}`);
        } finally {
            setLoading(false);
            addLog('Loading finished');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Debug Home Page</h1>
            
            <div style={{ marginBottom: '20px' }}>
                <h3>Category Selector:</h3>
                <button 
                    onClick={() => setSelectedCategory('all')}
                    style={{ margin: '5px', backgroundColor: selectedCategory === 'all' ? '#4CAF50' : '#f0f0f0' }}
                >
                    Todos
                </button>
                <button 
                    onClick={() => setSelectedCategory('doces')}
                    style={{ margin: '5px', backgroundColor: selectedCategory === 'doces' ? '#4CAF50' : '#f0f0f0' }}
                >
                    Doces
                </button>
                <button 
                    onClick={() => setSelectedCategory('salgados')}
                    style={{ margin: '5px', backgroundColor: selectedCategory === 'salgados' ? '#4CAF50' : '#f0f0f0' }}
                >
                    Salgados
                </button>
                <button 
                    onClick={() => setSelectedCategory('bebidas')}
                    style={{ margin: '5px', backgroundColor: selectedCategory === 'bebidas' ? '#4CAF50' : '#f0f0f0' }}
                >
                    Bebidas
                </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Status:</h3>
                <p>Selected Category: <strong>{selectedCategory}</strong></p>
                <p>Loading: <strong>{loading ? 'Yes' : 'No'}</strong></p>
                <p>Products Count: <strong>{products.length}</strong></p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Products:</h3>
                {loading && <p>Loading products...</p>}
                {!loading && products.length === 0 && <p>No products found</p>}
                {!loading && products.length > 0 && (
                    <div>
                        {products.map(product => (
                            <div key={product._id} style={{ border: '1px solid #ccc', margin: '5px', padding: '10px' }}>
                                <strong>{product.name}</strong> - {product.category} - R$ {product.price}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <h3>Debug Logs:</h3>
                <div style={{ backgroundColor: '#f9f9f9', padding: '10px', maxHeight: '300px', overflow: 'auto' }}>
                    {logs.map((log, index) => (
                        <div key={index} style={{ fontSize: '12px', margin: '2px 0' }}>
                            {log}
                        </div>
                    ))}
                </div>
                <button onClick={() => setLogs([])} style={{ marginTop: '10px' }}>
                    Clear Logs
                </button>
            </div>
        </div>
    );
};

export default DebugHome;
