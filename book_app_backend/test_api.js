#!/usr/bin/env node

/**
 * API Test Script for Wrylo Book App Backend
 * Tests all the search and book-related endpoints
 */

const https = require('http');

const API_BASE_URL = 'http://127.0.0.1:8000';

// Helper function to make HTTP requests
function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, API_BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Wrylo-API-Test/1.0'
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: parsed
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: responseData
          });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Test functions
async function testEndpoint(name, path, expectedStatus = 200) {
  try {
    console.log(`\n🧪 Testing ${name}...`);
    console.log(`   📡 ${path}`);
    
    const response = await makeRequest(path);
    
    if (response.status === expectedStatus) {
      console.log(`   ✅ SUCCESS (${response.status})`);
      
      // Show some sample data
      if (response.data && typeof response.data === 'object') {
        if (response.data.results) {
          console.log(`   📊 Results: ${response.data.results.length} items`);
        } else if (response.data.total_count !== undefined) {
          console.log(`   📊 Total: ${response.data.total_count} items`);
          console.log(`   📚 Local books: ${response.data.local_books?.length || 0}`);
          console.log(`   🌐 External books: ${response.data.external_books?.length || 0}`);
        } else if (response.data.suggestions) {
          console.log(`   💡 Suggestions: ${response.data.suggestions.length}`);
        } else if (Array.isArray(response.data)) {
          console.log(`   📊 Results: ${response.data.length} items`);
        }
      }
      
      return true;
    } else {
      console.log(`   ❌ FAILED (${response.status})`);
      console.log(`   📄 Response:`, JSON.stringify(response.data, null, 2).substring(0, 200));
      return false;
    }
  } catch (error) {
    console.log(`   💥 ERROR: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting Wrylo Book App API Tests');
  console.log('=====================================');
  
  const tests = [
    // Basic search tests
    { name: 'Book Search - "gatsby"', path: '/api/books/search/?q=gatsby' },
    { name: 'Book Search - "tolkien"', path: '/api/books/search/?q=tolkien' },
    { name: 'Book Search - "fantasy"', path: '/api/books/search/?q=fantasy' },
    { name: 'Book Search - "1984"', path: '/api/books/search/?q=1984' },
    
    // Search with filters
    { name: 'Search by Genre - Fantasy', path: '/api/books/search/?q=fantasy&genre=Fantasy' },
    { name: 'Search with Rating Filter', path: '/api/books/search/?q=book&rating=4.0' },
    { name: 'Search with Year Range', path: '/api/books/search/?q=classic&year_from=1920&year_to=1960' },
    
    // Suggestions
    { name: 'Suggestions - "har"', path: '/api/books/suggestions/?q=har' },
    { name: 'Suggestions - "sci"', path: '/api/books/suggestions/?q=sci' },
    { name: 'Suggestions - "rom"', path: '/api/books/suggestions/?q=rom' },
    
    // Popular books
    { name: 'Popular Books (limit 5)', path: '/api/books/popular/?limit=5' },
    { name: 'Popular Books (limit 10)', path: '/api/books/popular/?limit=10' },
    
    // Browse by genre
    { name: 'Books by Genre - Fantasy', path: '/api/books/genre/Fantasy/' },
    { name: 'Books by Genre - Fiction', path: '/api/books/genre/Fiction/' },
    { name: 'Books by Genre - Classic Literature', path: '/api/books/genre/Classic%20Literature/' },
    
    // Admin and info endpoints
    { name: 'API Health Check', path: '/api/books/' },
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    const success = await testEndpoint(test.name, test.path, test.expectedStatus);
    if (success) {
      passed++;
    } else {
      failed++;
    }
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n📊 Test Results');
  console.log('================');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📝 Total:  ${passed + failed}`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! Your API is working perfectly.');
    console.log('\n💡 The frontend search functionality will now use the real API');
    console.log('   and fall back to mock data only if the server is offline.');
  } else {
    console.log('\n⚠️  Some tests failed. Check the Django server logs for details.');
  }
  
  console.log('\n🔗 API Documentation:');
  console.log('   Search: GET /api/books/search/?q=<query>&genre=<genre>&rating=<min_rating>');
  console.log('   Suggestions: GET /api/books/suggestions/?q=<query>');
  console.log('   Popular: GET /api/books/popular/?limit=<limit>');
  console.log('   By Genre: GET /api/books/genre/<genre>/');
}

// Additional functionality tests
async function testComplexScenarios() {
  console.log('\n🔬 Advanced Test Scenarios');
  console.log('==========================');
  
  // Test Unicode search
  await testEndpoint('Unicode Search', '/api/books/search/?q=café');
  
  // Test empty query
  await testEndpoint('Empty Query', '/api/books/search/?q=', 200);
  
  // Test very long query
  await testEndpoint('Long Query', '/api/books/search/?q=' + 'a'.repeat(100));
  
  // Test special characters
  await testEndpoint('Special Characters', '/api/books/search/?q=C%2B%2B');
  
  // Test multiple filters
  await testEndpoint(
    'Multiple Filters', 
    '/api/books/search/?q=book&genre=Fantasy&rating=4.0&year_from=1950'
  );
  
  console.log('\n✨ Advanced tests completed!');
}

// Run all tests
async function main() {
  try {
    await runTests();
    await testComplexScenarios();
    
    console.log('\n🏁 Testing completed!');
    process.exit(0);
  } catch (error) {
    console.error('\n💥 Test runner failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { makeRequest, testEndpoint };