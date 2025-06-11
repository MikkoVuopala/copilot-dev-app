@echo off
echo 🚀 Copilot Dev App - MongoDB Atlas Setup
echo ========================================

echo.
echo 🔗 Using MongoDB Atlas Cloud Database
echo ✅ Connection configured for: copilotdev.obepnzv.mongodb.net
echo.
echo 📝 Make sure to:
echo    1. Add your database password to server\.env
echo    2. Replace ^<db_password^> with your actual password
echo.
echo 🌐 Starting the application...
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
echo Health Check: http://localhost:5000/api/health
echo.

:: Start the application
npm run dev
