#!/usr/bin/env node

const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testCategoryFiltering() {
    console.log('🔍 Testing Category Filtering Debug\n');
    
    try {
        // Test 1: Get all products
        console.log('1️⃣ Testing: GET /api/products (all products)');
        const allProductsResponse = await axios.get(`${API_BASE_URL}/products`);
        const allProducts = allProductsResponse.data?.data || [];
        console.log(`✅ All products count: ${allProducts.length}`);
        
        if (allProducts.length > 0) {
            console.log('📋 Available categories in products:');
            const categories = [...new Set(allProducts.map(p => p.category))];
            categories.forEach(cat => {
                const count = allProducts.filter(p => p.category === cat).length;
                console.log(`   - ${cat}: ${count} products`);
            });
        }
        console.log('');
        
        // Test 2: Test each category
        const categoriesToTest = ['doces', 'salgados', 'bebidas'];
        
        for (const category of categoriesToTest) {
            console.log(`2️⃣ Testing: GET /api/products?category=${category}`);
            
            try {
                const response = await axios.get(`${API_BASE_URL}/products?category=${category}`);
                const products = response.data?.data || [];
                
                console.log(`✅ Category "${category}" returned ${products.length} products`);
                
                if (products.length > 0) {
                    console.log('   Products:');
                    products.forEach(p => {
                        console.log(`   - ${p.name} (${p.category})`);
                    });
                } else {
                    console.log(`   ⚠️  No products found for category "${category}"`);
                    
                    // Check if products with this category exist in all products
                    const expectedProducts = allProducts.filter(p => p.category === category);
                    if (expectedProducts.length > 0) {
                        console.log(`   🚨 ERROR: Expected ${expectedProducts.length} products but got 0`);
                        console.log('   Expected products:');
                        expectedProducts.forEach(p => {
                            console.log(`   - ${p.name} (${p.category})`);
                        });
                    }
                }
                console.log('');
            } catch (error) {
                console.log(`❌ Error testing category "${category}":`, error.response?.data || error.message);
                console.log('');
            }
        }
        
        // Test 3: Test with cache-busting parameter (like frontend does)
        for (const category of categoriesToTest) {
            console.log(`3️⃣ Testing: GET /api/products?category=${category}&_t=${Date.now()}`);
            
            try {
                const response = await axios.get(`${API_BASE_URL}/products?category=${category}&_t=${Date.now()}`);
                const products = response.data?.data || [];
                
                console.log(`✅ Category "${category}" with cache-busting returned ${products.length} products`);
                console.log('');
            } catch (error) {
                console.log(`❌ Error testing category "${category}" with cache-busting:`, error.response?.data || error.message);
                console.log('');
            }
        }
        
        // Test 4: Test what frontend exactly sends
        console.log('4️⃣ Testing: Simulate exact frontend request pattern');
        
        const filters = { category: 'doces' };
        const params = new URLSearchParams();
        
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(key, value.toString());
            }
        });
        
        params.append('_t', Date.now().toString());
        
        const testUrl = `${API_BASE_URL}/products?${params.toString()}`;
        console.log(`URL: ${testUrl}`);
        
        try {
            const response = await axios.get(testUrl);
            const products = response.data?.data || [];
            console.log(`✅ Exact frontend simulation returned ${products.length} products`);
            
            if (products.length > 0) {
                console.log('   Products:');
                products.forEach(p => {
                    console.log(`   - ${p.name} (${p.category})`);
                });
            }
        } catch (error) {
            console.log(`❌ Error with exact frontend simulation:`, error.response?.data || error.message);
        }
        
    } catch (error) {
        console.log('❌ Fatal error during testing:', error.message);
    }
}

testCategoryFiltering();
