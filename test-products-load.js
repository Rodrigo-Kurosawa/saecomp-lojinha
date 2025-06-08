// Teste específico para verificar o carregamento de produtos
const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';
const FRONTEND_URL = 'http://localhost:3006';

async function testProductsLoad() {
  console.log('🔍 Testando carregamento de produtos...\n');

  try {
    // Simular exatamente o que o frontend faz
    console.log('1. Testando requisição GET /products...');
    const response = await axios.get(`${API_BASE_URL}/products`, {
      headers: { 
        'Origin': FRONTEND_URL,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      params: {
        _t: Date.now()
      }
    });

    console.log('✅ Status:', response.status);
    console.log('✅ Headers recebidos:', Object.keys(response.headers));
    console.log('✅ Tipo de conteúdo:', response.headers['content-type']);
    console.log('✅ Dados recebidos:', {
      success: response.data.success,
      totalProducts: response.data.data?.length || 0,
      pagination: response.data.pagination
    });

    // Verificar estrutura dos dados
    if (response.data.success && response.data.data && response.data.data.length > 0) {
      console.log('\n📦 Primeiro produto:');
      const firstProduct = response.data.data[0];
      console.log('- ID:', firstProduct._id);
      console.log('- Nome:', firstProduct.name);
      console.log('- Preço:', firstProduct.price);
      console.log('- Categoria:', firstProduct.category);
      console.log('- Estoque:', firstProduct.stock);
      console.log('- Disponível:', firstProduct.isAvailable);
    }

    // Testar filtro por categoria
    console.log('\n2. Testando filtro por categoria "doces"...');
    const filterResponse = await axios.get(`${API_BASE_URL}/products`, {
      headers: { 
        'Origin': FRONTEND_URL,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      params: {
        category: 'doces',
        _t: Date.now()
      }
    });

    console.log('✅ Produtos filtrados:', filterResponse.data.data?.length || 0);

    console.log('\n🎉 Teste concluído com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao testar:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });
  }
}

testProductsLoad();
