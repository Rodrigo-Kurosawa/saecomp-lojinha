import React from 'react';

const App: React.FC = () => {
  console.log('Simple App is rendering');
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>SAEComp Lojinha - Teste</h1>
      <p>Se você está vendo essa mensagem, o React está funcionando!</p>
      <div style={{ marginTop: '20px' }}>
        <h2>Produtos Disponíveis:</h2>
        <ul>
          <li>Brigadeiro - R$ 2,50</li>
          <li>Coxinha - R$ 4,00</li>
          <li>Refrigerante - R$ 3,50</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
