// Teste direto usando fetch para verificar conectividade
console.log('🧪 Iniciando teste de conectividade frontend->backend...');

// Teste 1: Verificar se conseguimos fazer uma requisição básica
fetch('http://localhost:5000/health')
  .then(response => {
    console.log('✅ Health check status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('✅ Health check data:', data);
    
    // Teste 2: Tentar requisição de produtos
    return fetch('http://localhost:5000/api/products');
  })
  .then(response => {
    console.log('✅ Products API status:', response.status);
    console.log('✅ Products API headers:', [...response.headers.entries()]);
    return response.json();
  })
  .then(data => {
    console.log('✅ Products data:', data);
    console.log('✅ Number of products:', data.data?.length || 0);
  })
  .catch(error => {
    console.error('❌ Erro no teste:', error);
    console.error('❌ Tipo do erro:', typeof error);
    console.error('❌ Stack trace:', error.stack);
  });

console.log('🏁 Teste iniciado - aguarde os resultados...');
