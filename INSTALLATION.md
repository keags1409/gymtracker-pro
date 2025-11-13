# GymTracker Pro - Installation Guide

## Prerequisites Installation

### Step 1: Install Node.js

Node.js is required to run this application. Follow these steps:

1. **Download Node.js**
   - Visit: https://nodejs.org/
   - Download the **LTS (Long Term Support)** version for Windows
   - Recommended: Version 18.x or higher

2. **Install Node.js**
   - Run the downloaded installer
   - Follow the installation wizard
   - **Important**: Make sure to check "Add to PATH" during installation
   - Restart your terminal/PowerShell after installation

3. **Verify Installation**
   Open a new PowerShell window and run:
   ```powershell
   node --version
   npm --version
   ```
   You should see version numbers (e.g., v18.17.0 and 9.6.7)

---

## GymTracker Pro Setup

Once Node.js is installed, follow these steps:

### Step 1: Install Dependencies

```powershell
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

**OR** use the automated script:
```powershell
npm run install-all
```

### Step 2: Create Environment File

```powershell
# Copy the example environment file
copy .env.example .env
```

The default settings in `.env` are fine for development.

### Step 3: Start the Application

**Option A: Run everything at once (Recommended)**
```powershell
npm run dev
```

**Option B: Run servers separately**

Terminal 1 (Backend):
```powershell
npm run server
```

Terminal 2 (Frontend):
```powershell
npm run client
```

### Step 4: Access the Application

- **Frontend (Main App)**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

---

## Quick Start Commands

```powershell
# Install all dependencies (first time only)
npm run install-all

# Start both frontend and backend
npm run dev

# Start only backend server
npm run server

# Start only frontend client
npm run client

# Build for production
npm run build
```

---

## Troubleshooting

### Issue: "npm is not recognized"
**Solution**: Node.js is not installed or not in PATH
- Install Node.js from https://nodejs.org/
- Restart your terminal after installation

### Issue: Port already in use
**Solution**: Change the port in `.env` file
```
PORT=5001
```

### Issue: Cannot find module
**Solution**: Reinstall dependencies
```powershell
rm -r node_modules
rm -r client/node_modules
npm run install-all
```

### Issue: React app won't start
**Solution**: Make sure you're in the correct directory and dependencies are installed
```powershell
cd client
npm install
npm start
```

---

## Next Steps After Installation

1. **Create Your First Workout**
   - Click "New Workout" tab
   - Add workout name and exercises
   - Save and view in "Workouts" tab

2. **Explore Exercise Library**
   - Browse pre-loaded exercises
   - Filter by muscle group
   - Use for workout planning

3. **Track Your Progress**
   - View statistics dashboard
   - See workout trends
   - Monitor your fitness journey

---

## Need Help?

- Check the main README.md for detailed documentation
- Review API endpoints in README.md
- Open an issue if you encounter problems

**Happy Training! 💪**
