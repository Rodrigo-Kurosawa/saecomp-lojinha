import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';

// Componente Home simples e funcional
const Home = () => {
    return (
        <div className="home-container" style={{ padding: '20px' }}>
            <h1>SAEComp Lojinha</h1>
            <p>Bem-vindo à lojinha virtual da SAEComp!</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
                <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
                    <h3>Brigadeiro</h3>
                    <p style={{ color: '#666', margin: '10px 0' }}>Delicioso brigadeiro tradicional</p>
                    <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#2c5aa0' }}>R$ 2,50</p>
                    <button style={{ 
                        backgroundColor: '#2c5aa0', 
                        color: 'white', 
                        border: 'none', 
                        padding: '8px 16px', 
                        borderRadius: '4px', 
                        cursor: 'pointer' 
                    }}>
                        Adicionar ao Carrinho
                    </button>
                </div>
                <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
                    <h3>Coxinha</h3>
                    <p style={{ color: '#666', margin: '10px 0' }}>Coxinha de frango crocante</p>
                    <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#2c5aa0' }}>R$ 4,00</p>
                    <button style={{ 
                        backgroundColor: '#2c5aa0', 
                        color: 'white', 
                        border: 'none', 
                        padding: '8px 16px', 
                        borderRadius: '4px', 
                        cursor: 'pointer' 
                    }}>
                        Adicionar ao Carrinho
                    </button>
                </div>
                <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
                    <h3>Refrigerante</h3>
                    <p style={{ color: '#666', margin: '10px 0' }}>Refrigerante gelado 350ml</p>
                    <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#2c5aa0' }}>R$ 3,50</p>
                    <button style={{ 
                        backgroundColor: '#2c5aa0', 
                        color: 'white', 
                        border: 'none', 
                        padding: '8px 16px', 
                        borderRadius: '4px', 
                        cursor: 'pointer' 
                    }}>
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <a href="/checkout" style={{ 
                    backgroundColor: '#28a745', 
                    color: 'white', 
                    padding: '12px 24px', 
                    textDecoration: 'none', 
                    borderRadius: '6px',
                    fontSize: '1.1em'
                }}>
                    Ir para Checkout
                </a>
            </div>
        </div>
    );
};

// Componente Checkout simples
const Checkout = () => {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Checkout - Pagamento PIX</h1>
            <div style={{ maxWidth: '400px', margin: '30px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h2>Total: R$ 10,00</h2>
                <p style={{ margin: '20px 0' }}>Escaneie o QR Code abaixo para pagar:</p>
                <div style={{ 
                    width: '200px', 
                    height: '200px', 
                    backgroundColor: '#f0f0f0', 
                    margin: '20px auto', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '2px dashed #ccc'
                }}>
                    QR CODE PIX
                </div>
                <a href="/order-success/12345" style={{ 
                    backgroundColor: '#28a745', 
                    color: 'white', 
                    padding: '10px 20px', 
                    textDecoration: 'none', 
                    borderRadius: '4px'
                }}>
                    Simular Pagamento Concluído
                </a>
            </div>
        </div>
    );
};

// Componente OrderSuccess simples
const OrderSuccess = () => {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ maxWidth: '500px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '12px' }}>
                <div style={{ fontSize: '3em', color: '#28a745', marginBottom: '20px' }}>✓</div>
                <h1 style={{ color: '#28a745', marginBottom: '20px' }}>Pedido Realizado com Sucesso!</h1>
                <p style={{ marginBottom: '20px' }}>Seu pedido foi processado e está sendo preparado.</p>
                <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '6px', marginBottom: '20px' }}>
                    <p><strong>Número do Pedido:</strong> #12345</p>
                    <p><strong>Status:</strong> Confirmado</p>
                    <p><strong>Total:</strong> R$ 10,00</p>
                </div>
                <a href="/" style={{ 
                    backgroundColor: '#2c5aa0', 
                    color: 'white', 
                    padding: '10px 20px', 
                    textDecoration: 'none', 
                    borderRadius: '4px'
                }}>
                    Fazer Novo Pedido
                </a>
            </div>
        </div>
    );
};

const App: React.FC = () => {
  console.log('Functional App is rendering');
  
  return (
    <Router>
      <div className="app">
        <header style={{ backgroundColor: '#2c5aa0', color: 'white', padding: '15px 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1><a href="/" style={{ color: 'white', textDecoration: 'none' }}>SAEComp Lojinha</a></h1>
            <nav>
              <a href="/" style={{ color: 'white', marginLeft: '20px', textDecoration: 'none' }}>Home</a>
              <a href="/" style={{ color: 'white', marginLeft: '20px', textDecoration: 'none' }}>Produtos</a>
              <a href="/checkout" style={{ color: 'white', marginLeft: '20px', textDecoration: 'none' }}>Carrinho (0)</a>
            </nav>
          </div>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success/:orderId" element={<OrderSuccess />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
