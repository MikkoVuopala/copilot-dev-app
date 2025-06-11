import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import userRoutes from './routes/users';

console.log('🔄 Loading environment variables...');

// Load environment variables
const envResult = dotenv.config();
if (envResult.error) {
  console.error('❌ Error loading .env file:', envResult.error);
} else {
  console.log('✅ Environment variables loaded successfully');
}

console.log('🚀 Starting Copilot Dev App Server...');
console.log('📍 Current working directory:', process.cwd());
console.log('📝 Environment file loaded');
console.log('🔧 NODE_ENV:', process.env.NODE_ENV);
console.log('📡 PORT:', process.env.PORT);

const app = express();
const PORT = process.env.PORT || 5000;

// Handle MongoDB URI with password substitution
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/copilot-dev-app';
if (MONGODB_URI.includes('<db_password>') && process.env.DB_PASSWORD) {
  MONGODB_URI = MONGODB_URI.replace('<db_password>', process.env.DB_PASSWORD);
}

console.log('🔗 MongoDB URI configured:', MONGODB_URI.replace(/:[^:]*@/, ':****@'));

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Database connection and server startup
const startServer = async () => {
  console.log('Attempting to connect to MongoDB...');
  console.log('MongoDB URI:', MONGODB_URI.replace(/:[^:]*@/, ':****@')); // Hide password in logs
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('authentication failed')) {
        console.error('🔐 Authentication failed - check your MongoDB credentials');
      } else if (error.message.includes('network')) {
        console.error('🌐 Network error - check your internet connection');
      } else if (error.message.includes('timeout')) {
        console.error('⏰ Connection timeout - MongoDB Atlas might be unreachable');
      }
    }
    
    console.error('💡 Troubleshooting tips:');
    console.error('   1. Check your MongoDB Atlas password in .env file');
    console.error('   2. Ensure your IP is whitelisted in MongoDB Atlas');
    console.error('   3. Verify the connection string is correct');
    console.log('⚠️  Continuing without MongoDB - API calls will fail');
  }
  
  // Start the server regardless of MongoDB connection status
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📱 Frontend: http://localhost:3000`);
    console.log(`🔧 Backend: http://localhost:${PORT}`);
    console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
    console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
  });
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});

// MongoDB connection event handlers
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('📴 Mongoose disconnected');
});

startServer();
