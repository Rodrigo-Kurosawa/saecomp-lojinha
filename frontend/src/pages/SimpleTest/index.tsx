import React, { useState } from 'react';
import { getProducts } from '../../services/api';
import { ProductFilters } from '../../types';

const SimpleTest = () => {
    const [results, setResults] = useState<any[]>([]);

    const testAPI = async (category?: string) => {
        try {
            console.log('Testing API call with category:', category);
            
            const filters: ProductFilters | undefined = category 
                ? { category: category as 'doces' | 'salgados' | 'bebidas' }
                : undefined;
            
            const response = await getProducts(filters);
            console.log('API Response:', response);
            
            const result = {
                category: category || 'all',
                count: response.data?.length || 0,
                products: response.data || [],
                timestamp: new Date().toLocaleTimeString()
            };
            
            setResults(prev => [result, ...prev]);
        } catch (error) {
            console.error('API Error:', error);
            setResults(prev => [{
                category: category || 'all',
                error: error.toString(),
                timestamp: new Date().toLocaleTimeString()
            }, ...prev]);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Simple API Test</h1>
            
            <div style={{ marginBottom: '20px' }}>
                <button onClick={() => testAPI()}>Test All Products</button>
                <button onClick={() => testAPI('doces')}>Test Doces</button>
                <button onClick={() => testAPI('salgados')}>Test Salgados</button>
                <button onClick={() => testAPI('bebidas')}>Test Bebidas</button>
            </div>

            <div>
                <h2>Results:</h2>
                {results.map((result, index) => (
                    <div key={index} style={{ 
                        border: '1px solid #ccc', 
                        margin: '10px 0', 
                        padding: '10px',
                        backgroundColor: result.error ? '#ffe6e6' : '#e6ffe6'
                    }}>
                        <strong>{result.timestamp} - Category: {result.category}</strong>
                        {result.error ? (
                            <p style={{ color: 'red' }}>Error: {result.error}</p>
                        ) : (
                            <>
                                <p>Count: {result.count}</p>
                                <details>
                                    <summary>Products</summary>
                                    <pre>{JSON.stringify(result.products, null, 2)}</pre>
                                </details>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimpleTest;
