const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

console.log('🚀 Basic test server starting...');
console.log('📍 Port:', PORT);
console.log('📝 MONGODB_URI exists:', !!process.env.MONGODB_URI);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Test server is running',
    timestamp: new Date().toISOString(),
    mongoUri: process.env.MONGODB_URI ? 'configured' : 'missing'
  });
});

app.listen(PORT, () => {
  console.log(`✅ Test server running on http://localhost:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});
