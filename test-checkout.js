const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testCheckout() {
  console.log('🧪 Testando fluxo completo de checkout...\n');

  try {
    // 1. Testar criação de pedido
    console.log('1️⃣ Testando criação de pedido...');
    const orderData = {
      customerName: "Teste Checkout",
      customerCourse: "Engenharia de Software",
      items: [
        {
          productId: "1",
          quantity: 1
        }
      ]
    };

    const orderResponse = await axios.post(`${API_BASE_URL}/orders`, orderData, {
      timeout: 30000
    });
    
    console.log('✅ Pedido criado:', orderResponse.data.data._id);
    const orderId = orderResponse.data.data._id;

    // 2. Testar geração de PIX
    console.log('\n2️⃣ Testando geração de PIX...');
    const pixData = {
      orderId: orderId,
      amount: orderResponse.data.data.totalAmount
    };

    const pixResponse = await axios.post(`${API_BASE_URL}/payments/pix/generate`, pixData, {
      timeout: 30000
    });
    
    console.log('✅ PIX gerado com sucesso');
    console.log('📱 QR Code length:', pixResponse.data.data?.qrCode?.length || 0);

    console.log('\n🎉 Teste de checkout concluído com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro no teste:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      code: error.code
    });
  }
}

testCheckout();
