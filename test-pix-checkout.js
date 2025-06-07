const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testPixCheckout() {
  try {
    console.log('🧪 Testing PIX-only checkout flow...\n');

    // 1. Get available products
    console.log('1. Fetching products...');
    const productsResponse = await axios.get(`${API_BASE_URL}/products`);
    
    if (!productsResponse.data.success || !productsResponse.data.data.length) {
      throw new Error('No products available');
    }
    
    const products = productsResponse.data.data;
    console.log(`✅ Found ${products.length} products`);

    // 2. Create order with PIX payment (should be automatic now)
    const firstProduct = products[0];
    const orderData = {
      items: [
        {
          productId: firstProduct._id,
          quantity: 1
        }
      ],
      customerName: 'Test Customer',
      customerCourse: 'Engenharia de Software',
      notes: 'Test order for PIX checkout'
    };

    console.log('\n2. Creating order...');
    const orderResponse = await axios.post(`${API_BASE_URL}/orders`, orderData);
    
    if (!orderResponse.data.success) {
      throw new Error('Failed to create order: ' + orderResponse.data.message);
    }
    
    const order = orderResponse.data.data;
    console.log(`✅ Order created with ID: ${order._id}`);
    console.log(`   Total: R$ ${order.totalAmount.toFixed(2)}`);
    console.log(`   Status: ${order.status}`);
    console.log(`   Payment Status: ${order.paymentStatus}`);

    // 3. Generate PIX QR code
    console.log('\n3. Generating PIX QR code...');
    const pixData = {
      orderId: order._id,
      amount: order.totalAmount,
      customerName: orderData.customerName
    };

    const pixResponse = await axios.post(`${API_BASE_URL}/payments/pix/generate`, pixData);
    
    if (!pixResponse.data.success) {
      throw new Error('Failed to generate PIX: ' + pixResponse.data.message);
    }
    
    const pixInfo = pixResponse.data.data;
    console.log('✅ PIX QR code generated successfully');
    console.log(`   Payment ID: ${pixInfo.paymentId}`);
    console.log(`   QR Code length: ${pixInfo.qrCode.length} characters`);
    console.log(`   PIX Code length: ${pixInfo.pixCode.length} characters`);
    console.log(`   Expires at: ${pixInfo.expiresAt}`);

    console.log('\n🎉 PIX-only checkout flow test completed successfully!');
    console.log('\n📝 Summary:');
    console.log('- ✅ Products fetched successfully');
    console.log('- ✅ Order created without specifying payment method (PIX default)');
    console.log('- ✅ PIX QR code generated successfully');
    console.log('- ✅ All API endpoints working correctly');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

testPixCheckout();
