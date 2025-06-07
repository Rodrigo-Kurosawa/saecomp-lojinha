import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const SimplePage = ({ title }: { title: string }) => (
  <div style={{ padding: '20px' }}>
    <h1>{title}</h1>
    <p>Página funcionando!</p>
  </div>
);

const App: React.FC = () => {
  console.log('Router App is rendering');
  
  return (
    <Router>
      <div style={{ minHeight: '100vh' }}>
        <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
          <a href="/" style={{ marginRight: '10px' }}>Home</a>
          <a href="/checkout" style={{ marginRight: '10px' }}>Checkout</a>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<SimplePage title="Home - SAEComp Lojinha" />} />
            <Route path="/checkout" element={<SimplePage title="Checkout" />} />
            <Route path="/order-success/:orderId" element={<SimplePage title="Pedido Concluído" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
