# Copilot Dev App

A full-stack web application built with React, TypeScript, Node.js, and Mongoose.

## Tech Stack

### Frontend
- **React** - User interface library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Mongoose** - MongoDB object modeling

### Database
- **MongoDB** - NoSQL database

## Project Structure

```
copilot-dev-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.tsx        # Main React component
│   │   ├── main.tsx       # Entry point
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── index.ts       # Server entry point
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # Express routes
│   │   ├── controllers/   # Route controllers
│   │   └── ...
│   ├── package.json
│   └── tsconfig.json
└── package.json           # Root package.json
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd copilot-dev-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cd server
   cp .env.example .env
   ```
   
   **For MongoDB Atlas (Recommended):**
   - Edit the `.env` file and replace `<db_password>` with your actual MongoDB Atlas password
   - Set `DB_PASSWORD=your_actual_password_here`
   - The connection string is already configured for MongoDB Atlas
   
   **For Local MongoDB:**
   - Change `MONGODB_URI` to `mongodb://localhost:27017/copilot-dev-app`
   - Make sure MongoDB is running locally

4. **Database Setup**
   
   **Option A: MongoDB Atlas (Cloud - Recommended)**
   - ✅ Already configured in the project
   - Just add your password to the `.env` file
   - No additional setup required
   
   **Option B: Local MongoDB**
   - Install MongoDB locally
   - Start MongoDB service
   - Update the connection string in `.env`

5. **Run the application**
   ```bash
   # From the root directory
   npm run dev
   ```

   This will start both the frontend (http://localhost:3000) and backend (http://localhost:5000) concurrently.

## Available Scripts

### Root Scripts
- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build both client and server for production
- `npm run start` - Start the production server

### Client Scripts
- `npm run dev:client` - Start only the React development server
- `npm run build` - Build the React app for production

### Server Scripts
- `npm run dev:server` - Start only the Node.js development server
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start the production server

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user by ID
- `DELETE /api/users/:id` - Delete user by ID

### Health Check
- `GET /api/health` - Server health check

## Features

- ✅ Full-stack TypeScript setup
- ✅ React frontend with modern hooks
- ✅ Express.js REST API
- ✅ MongoDB with Mongoose ODM
- ✅ User management system
- ✅ Error handling and validation
- ✅ Development and production builds
- ✅ CORS and security middleware
- ✅ Beautiful, responsive UI
- 🎮 RuneScape Player Stats System (WiseOldMan API Integration)
  - Player Search: Search for any Old School RuneScape player by username
  - Skills Viewer: View all 23 skills with levels, experience, and rankings
  - Boss Kills: View boss kill counts and rankings for 55+ OSRS bosses
  - Real-time Data: Live data fetched from WiseOldMan API
  - Beautiful UI: Glassmorphism-styled interface with skill icons and responsive design
  - Navigation: Updated navbar with routing between Users and Player Stats pages

## Using the Player Stats Feature

### 1. Search for Players
1. Navigate to http://localhost:3000
2. Click "Player Stats" in the navigation bar
3. Enter any Old School RuneScape username (e.g., "zezima", "woox", "lynx titan")
4. Press Enter or click "Search Player"

### 2. View Player Statistics
- **Skills Overview**: See all skills in a grid layout with levels, experience, and ranks
- **Individual Skills**: Select any skill from the dropdown to see detailed stats
- **Player Info**: View player type (regular, ironman, etc.) and combat level

### 3. API Information
The application uses the WiseOldMan API:
- Rate limit: 20 requests per 60 seconds (unauthenticated)
- Data source: Official Old School RuneScape hiscores
- Real-time player statistics
```

### 2. Use the Web Interface
1. Navigate to http://localhost:3000
2. Click "Player Stats" in the navigation bar
3. Enter a RuneScape username to search
4. Toggle between Skills and Boss Kills views
5. Click on skills or bosses to see detailed statistics

## Architecture

### Frontend (Client)
- **React + TypeScript**: Modern component-based UI
- **Glassmorphism Design**: Beautiful translucent effects with backdrop blur
- **Responsive Layout**: Works on desktop and mobile devices
- **State Management**: React hooks for managing component state
- **Routing**: Simple page switching using React state

### Backend (Server)
- **Node.js + Express**: RESTful API server
- **TypeScript**: Type-safe server-side development
- **Mongoose**: MongoDB object modeling with validation
- **Security**: Helmet, CORS, and input validation
- **Error Handling**: Comprehensive error responses

### Database (MongoDB Atlas)
- **Cloud Database**: Hosted on MongoDB Atlas
- **Indexes**: Optimized queries for scores and games
- **Validation**: Schema validation for data integrity
- **Aggregation**: Complex queries for top scores

## License

MIT
