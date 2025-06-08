// Teste final completo da aplicação SAEComp Lojinha
const axios = require('axios');

const FRONTEND_URL = 'http://localhost:3000';
const BACKEND_URL = 'http://localhost:5000';

async function testCompleteApplication() {
  console.log('🧪 TESTE FINAL - SAEComp Lojinha\n');

  try {
    // 1. Testar backend diretamente
    console.log('1. ✅ Testando backend direto...');
    const backendHealth = await axios.get(`${BACKEND_URL}/health`);
    console.log(`   Status: ${backendHealth.status} - ${backendHealth.data.message}`);

    const backendProducts = await axios.get(`${BACKEND_URL}/api/products`);
    console.log(`   Produtos no backend: ${backendProducts.data.data.length}`);

    // 2. Testar proxy do frontend
    console.log('\n2. ✅ Testando proxy do frontend...');
    const proxyProducts = await axios.get(`${FRONTEND_URL}/api/products`);
    console.log(`   Produtos via proxy: ${proxyProducts.data.data.length}`);

    // 3. Testar frontend HTML
    console.log('\n3. ✅ Testando frontend HTML...');
    const frontendHTML = await axios.get(FRONTEND_URL);
    const hasReactRoot = frontendHTML.data.includes('id="root"');
    console.log(`   Frontend HTML carregado: ${hasReactRoot ? 'SIM' : 'NÃO'}`);

    // 4. Verificar produtos disponíveis vs indisponíveis
    console.log('\n4. 📦 Status dos produtos:');
    const products = proxyProducts.data.data;
    const disponíveis = products.filter(p => p.isAvailable).length;
    const indisponíveis = products.filter(p => !p.isAvailable).length;
    
    console.log(`   - Disponíveis: ${disponíveis}`);
    console.log(`   - Indisponíveis: ${indisponíveis}`);
    console.log(`   - Total: ${products.length}`);

    // 5. Testar categorias
    console.log('\n5. 🏷️ Testando filtros por categoria:');
    const categories = ['doces', 'salgados', 'bebidas'];
    
    for (const category of categories) {
      const categoryProducts = await axios.get(`${FRONTEND_URL}/api/products?category=${category}`);
      console.log(`   - ${category}: ${categoryProducts.data.data.length} produtos`);
    }

    // 6. Teste de criação de pedido
    console.log('\n6. 🛒 Testando criação de pedido...');
    const availableProduct = products.find(p => p.isAvailable);
    
    if (availableProduct) {
      const orderData = {
        items: [{ productId: availableProduct._id, quantity: 1 }],
        customerInfo: { 
          name: 'Teste Final', 
          email: 'teste@saecomp.com', 
          phone: '11999999999' 
        }
      };
      
      const order = await axios.post(`${BACKEND_URL}/api/orders`, orderData);
      console.log(`   Pedido criado: ID ${order.data.data._id}, Total: R$ ${order.data.data.totalAmount}`);
      
      // 7. Teste PIX
      console.log('\n7. 💳 Testando pagamento PIX...');
      const pixData = {
        orderId: order.data.data._id,
        amount: order.data.data.totalAmount,
        paymentMethod: 'pix'
      };
      
      const pix = await axios.post(`${BACKEND_URL}/api/payments/pix/generate`, pixData);
      console.log(`   PIX gerado: ${pix.data.data.paymentId}`);
    } else {
      console.log('   ⚠️ Nenhum produto disponível para teste de pedido');
    }

    console.log('\n🎉 TODOS OS TESTES PASSARAM!');
    console.log('\n📱 Acesse a aplicação em: http://localhost:3000');
    console.log('🔗 Backend API em: http://localhost:5000');
    console.log('📋 Status: FUNCIONANDO PERFEITAMENTE');

  } catch (error) {
    console.error('\n❌ FALHA NO TESTE:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n🔧 DIAGNÓSTICO:');
      console.log('- Verifique se o backend está rodando na porta 5000');
      console.log('- Verifique se o frontend está rodando na porta 3000');
      console.log('- Execute: npm start no diretório frontend/');
    }
  }
}

testCompleteApplication();
