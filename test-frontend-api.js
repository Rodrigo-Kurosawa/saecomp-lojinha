const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testFrontendAPI() {
  try {
    console.log('🧪 Testing frontend API calls...\n');

    // Test the exact same call that frontend makes
    const api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    // Test 1: All products (no filter)
    console.log('1. Testing "all" category (no filter)...');
    const allResponse = await api.get('/products');
    console.log(`✅ All products: ${allResponse.data.data.length} items`);

    // Test 2: Doces with filter
    console.log('\n2. Testing "doces" category with filter...');
    const params1 = new URLSearchParams();
    params1.append('category', 'doces');
    const docesResponse = await api.get(`/products?${params1.toString()}`);
    console.log(`✅ Doces: ${docesResponse.data.data.length} items`);

    // Test 3: Salgados with filter
    console.log('\n3. Testing "salgados" category with filter...');
    const params2 = new URLSearchParams();
    params2.append('category', 'salgados');
    const salgadosResponse = await api.get(`/products?${params2.toString()}`);
    console.log(`✅ Salgados: ${salgadosResponse.data.data.length} items`);

    // Test 4: Bebidas with filter
    console.log('\n4. Testing "bebidas" category with filter...');
    const params3 = new URLSearchParams();
    params3.append('category', 'bebidas');
    const bebidasResponse = await api.get(`/products?${params3.toString()}`);
    console.log(`✅ Bebidas: ${bebidasResponse.data.data.length} items`);

    console.log('\n🎉 All frontend-style API tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testFrontendAPI();
