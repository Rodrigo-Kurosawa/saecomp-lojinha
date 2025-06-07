import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/api';
import { Product, ProductFilters } from '../../types';

const TestCategoryPage = () => {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'doces' | 'salgados' | 'bebidas'>('all');
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
        console.log(message);
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    };

    useEffect(() => {
        loadAllProducts();
    }, []);

    useEffect(() => {
        if (selectedCategory !== 'all') {
            loadFilteredProducts(selectedCategory);
        } else {
            setFilteredProducts(allProducts);
        }
    }, [selectedCategory, allProducts]);

    const loadAllProducts = async () => {
        try {
            setLoading(true);
            addLog('Loading all products...');
            
            const response = await getProducts();
            addLog(`All products loaded: ${response.data?.length || 0} items`);
            
            setAllProducts(response.data || []);
        } catch (error) {
            addLog(`Error loading all products: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const loadFilteredProducts = async (category: 'doces' | 'salgados' | 'bebidas') => {
        try {
            setLoading(true);
            addLog(`Loading products for category: ${category}`);
            
            const filters: ProductFilters = { category };
            const response = await getProducts(filters);
            
            addLog(`Filtered products loaded: ${response.data?.length || 0} items for category ${category}`);
            
            setFilteredProducts(response.data || []);
        } catch (error) {
            addLog(`Error loading filtered products: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = (category: 'all' | 'doces' | 'salgados' | 'bebidas') => {
        addLog(`Category clicked: ${category}`);
        setSelectedCategory(category);
    };

    const displayProducts = selectedCategory === 'all' ? allProducts : filteredProducts;

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Category Test Page</h1>
            
            <div style={{ marginBottom: '20px' }}>
                <h2>Category Buttons</h2>
                {['all', 'doces', 'salgados', 'bebidas'].map(category => (
                    <button
                        key={category}
                        onClick={() => handleCategoryClick(category as any)}
                        style={{
                            margin: '5px',
                            padding: '10px 15px',
                            backgroundColor: selectedCategory === category ? '#4CAF50' : '#f0f0f0',
                            color: selectedCategory === category ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h2>Current State</h2>
                <p><strong>Selected Category:</strong> {selectedCategory}</p>
                <p><strong>All Products Count:</strong> {allProducts.length}</p>
                <p><strong>Filtered Products Count:</strong> {filteredProducts.length}</p>
                <p><strong>Display Products Count:</strong> {displayProducts.length}</p>
                <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h2>Products Display</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                    {displayProducts.map(product => (
                        <div key={product._id} style={{ 
                            border: '1px solid #ddd', 
                            padding: '10px', 
                            borderRadius: '5px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <h3>{product.name}</h3>
                            <p><strong>Category:</strong> {product.category}</p>
                            <p><strong>Price:</strong> R$ {product.price.toFixed(2)}</p>
                            <p><strong>Stock:</strong> {product.stock}</p>
                        </div>
                    ))}
                </div>
                {displayProducts.length === 0 && !loading && (
                    <p style={{ color: 'red', fontWeight: 'bold' }}>No products to display!</p>
                )}
            </div>

            <div>
                <h2>Debug Logs</h2>
                <div style={{ 
                    backgroundColor: '#f0f0f0', 
                    padding: '10px', 
                    borderRadius: '5px', 
                    maxHeight: '300px', 
                    overflowY: 'auto',
                    fontFamily: 'monospace',
                    fontSize: '12px'
                }}>
                    {logs.map((log, index) => (
                        <div key={index}>{log}</div>
                    ))}
                </div>
                <button 
                    onClick={() => setLogs([])}
                    style={{ marginTop: '10px', padding: '5px 10px' }}
                >
                    Clear Logs
                </button>
            </div>
        </div>
    );
};

export default TestCategoryPage;
