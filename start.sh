#!/bin/bash

# MongoDB Setup and Start Script for Copilot Dev App

echo "🚀 Copilot Dev App - MongoDB Setup"
echo "=================================="

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "❌ MongoDB is not installed!"
    echo ""
    echo "📥 Install MongoDB:"
    echo "Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/"
    echo "macOS: brew install mongodb/brew/mongodb-community"
    echo "Linux: https://docs.mongodb.com/manual/administration/install-on-linux/"
    echo ""
    echo "🔗 Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas"
    echo "   Update MONGODB_URI in server/.env with your Atlas connection string"
    exit 1
fi

# Check if MongoDB is running
if pgrep mongod > /dev/null; then
    echo "✅ MongoDB is already running!"
else
    echo "🔄 Starting MongoDB..."
    # Try to start MongoDB (this varies by system)
    if command -v brew &> /dev/null; then
        # macOS with Homebrew
        brew services start mongodb/brew/mongodb-community
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo systemctl start mongod
    else
        echo "⚠️  Please start MongoDB manually or use MongoDB Atlas"
        echo "   Local: mongod --dbpath /path/to/data/directory"
        echo "   Atlas: Update MONGODB_URI in server/.env"
    fi
fi

echo ""
echo "🌐 Starting the application..."
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:5000"
echo "Health Check: http://localhost:5000/api/health"
echo ""

# Start the application
npm run dev
