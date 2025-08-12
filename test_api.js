// Quick test to verify API integration
const axios = require('axios');

const testAPI = async () => {
    try {
        console.log('Testing book search API...');
        
        const response = await axios.get('http://127.0.0.1:8000/api/books/search/', {
            params: { q: 'gatsby' },
            timeout: 5000
        });
        
        console.log('✅ API Response:', response.data);
        console.log('✅ Found', response.data.total_count, 'results');
        
        if (response.data.local_books && response.data.local_books.length > 0) {
            console.log('✅ Sample book:', response.data.local_books[0]);
        }
        
        if (response.data.external_books && response.data.external_books.length > 0) {
            console.log('✅ External books found:', response.data.external_books.length);
        }
        
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.log('❌ Django server is not running on port 8000');
            console.log('Please start the server with: python3 manage.py runserver 127.0.0.1:8000');
        } else {
            console.log('❌ API Test failed:', error.message);
            if (error.response) {
                console.log('Status:', error.response.status);
                console.log('Data:', error.response.data);
            }
        }
    }
};

testAPI();