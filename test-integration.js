// Simple integration test to verify frontend-backend communication
const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';
const FRONTEND_URL = 'http://localhost:3006';

async function testIntegration() {
  console.log('🧪 Testing SAEComp Lojinha Integration...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing backend health...');
    const healthResponse = await axios.get('http://localhost:5000/health');
    console.log('✅ Backend is healthy:', healthResponse.data.message);

    // Test 2: Products API
    console.log('\n2. Testing products API...');
    const productsResponse = await axios.get(`${API_BASE_URL}/products`, {
      headers: { 'Origin': FRONTEND_URL }
    });
    console.log(`✅ Products loaded: ${productsResponse.data.data.length} items`);

    // Test 3: Product filtering
    console.log('\n3. Testing product filtering...');
    const filterResponse = await axios.get(`${API_BASE_URL}/products?category=doces`, {
      headers: { 'Origin': FRONTEND_URL }
    });
    console.log(`✅ Filter working: ${filterResponse.data.data.length} doces found`);

    // Test 4: Order creation
    console.log('\n4. Testing order creation...');
    const orderData = {
      items: [{ productId: '1', quantity: 1 }],
      customerInfo: { name: 'Test User', email: 'test@test.com', phone: '11999999999' }
    };
    const orderResponse = await axios.post(`${API_BASE_URL}/orders`, orderData, {
      headers: { 'Origin': FRONTEND_URL, 'Content-Type': 'application/json' }
    });
    console.log(`✅ Order created: ID ${orderResponse.data.data._id}, Total: R$ ${orderResponse.data.data.totalAmount}`);

    // Test 5: PIX payment
    console.log('\n5. Testing PIX payment...');
    const pixData = {
      orderId: orderResponse.data.data._id,
      amount: orderResponse.data.data.totalAmount,
      paymentMethod: 'pix'
    };
    const pixResponse = await axios.post(`${API_BASE_URL}/payments/pix/generate`, pixData, {
      headers: { 'Origin': FRONTEND_URL, 'Content-Type': 'application/json' }
    });
    console.log(`✅ PIX generated: Payment ID ${pixResponse.data.data.paymentId}`);

    console.log('\n🎉 All tests passed! Frontend and backend are working perfectly together.');
    console.log('\n📱 You can now access the application at: http://localhost:3006');
    console.log('🌐 Backend is running at: http://localhost:5000');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testIntegration();
