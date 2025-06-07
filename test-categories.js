// Test script to debug the category filtering issue
const API_BASE_URL = 'http://localhost:5000/api';

async function testCategoryFiltering() {
  try {
    console.log('🧪 Testing category filtering...\n');

    // Test 1: Get all products
    console.log('1. Testing all products...');
    const allResponse = await fetch(`${API_BASE_URL}/products`);
    const allData = await allResponse.json();
    console.log(`   ✅ All products: ${allData.data.length} items`);
    console.log(`   📦 Categories found: ${[...new Set(allData.data.map(p => p.category))]}`);

    // Test 2: Get products by category - doces
    console.log('\n2. Testing doces category...');
    const docesResponse = await fetch(`${API_BASE_URL}/products?category=doces`);
    const docesData = await docesResponse.json();
    console.log(`   ✅ Doces: ${docesData.data.length} items`);
    docesData.data.forEach(p => console.log(`      - ${p.name} (${p.category})`));

    // Test 3: Get products by category - salgados
    console.log('\n3. Testing salgados category...');
    const salgadosResponse = await fetch(`${API_BASE_URL}/products?category=salgados`);
    const salgadosData = await salgadosResponse.json();
    console.log(`   ✅ Salgados: ${salgadosData.data.length} items`);
    salgadosData.data.forEach(p => console.log(`      - ${p.name} (${p.category})`));

    // Test 4: Get products by category - bebidas
    console.log('\n4. Testing bebidas category...');
    const bebidasResponse = await fetch(`${API_BASE_URL}/products?category=bebidas`);
    const bebidasData = await bebidasResponse.json();
    console.log(`   ✅ Bebidas: ${bebidasData.data.length} items`);
    bebidasData.data.forEach(p => console.log(`      - ${p.name} (${p.category})`));

    console.log('\n🎉 All category tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testCategoryFiltering();
