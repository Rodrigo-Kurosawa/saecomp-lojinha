import React, { useEffect, useState } from 'react';
import { Product } from '../types';

const TestProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('🔍 Iniciando requisição para produtos...');
        
        const response = await fetch('http://localhost:5000/api/products', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        console.log('📡 Response status:', response.status);
        console.log('📡 Response headers:', [...response.headers.entries()]);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('📦 Dados recebidos:', data);
        
        if (data.success && data.data) {
          setProducts(data.data);
          console.log('✅ Produtos carregados:', data.data.length);
        } else {
          throw new Error('Formato de resposta inválido');
        }
        
      } catch (err) {
        console.error('❌ Erro ao carregar produtos:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div style={{ padding: '20px', color: '#4CAF50' }}>Carregando produtos...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: '#f44336', background: '#ffebee', borderRadius: '8px', margin: '20px' }}>
        <h3>Erro ao carregar produtos:</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#4CAF50' }}>Produtos Carregados ({products.length})</h2>
      <div style={{ display: 'grid', gap: '10px' }}>
        {products.map((product) => (
          <div key={product._id} style={{ 
            border: '1px solid #ddd', 
            padding: '10px', 
            borderRadius: '8px',
            background: product.isAvailable ? '#e8f5e8' : '#fff3e0'
          }}>
            <h3>{product.name}</h3>
            <p>Preço: R$ {product.price}</p>
            <p>Categoria: {product.category}</p>
            <p>Estoque: {product.stock}</p>
            <p>Status: {product.isAvailable ? '✅ Disponível' : '❌ Indisponível'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestProducts;
