# GymTracker Pro - Deployment Guide

## Quick Deploy Options

### Option 1: Deploy to Render (Recommended - Free Tier Available)

**Backend Deployment:**
1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository (or upload code)
4. Configure:
   - Name: `gymtracker-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add Environment Variables:
     - `PORT` = `10000` (Render default)
     - `NODE_ENV` = `production`
     - `JWT_SECRET` = (generate a strong random string)
     - `FRONTEND_URL` = (will be your frontend URL)
5. Click "Create Web Service"
6. Copy your backend URL (e.g., https://gymtracker-backend.onrender.com)

**Frontend Deployment:**
1. Update `client/package.json` proxy to your backend URL
2. Go to https://vercel.com or https://netlify.com
3. Click "New Project" → Import your repository
4. Configure:
   - Framework: `Create React App`
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Add Environment Variable:
     - `REACT_APP_API_URL` = your backend URL
5. Deploy!

### Option 2: Deploy to Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect and deploy both frontend and backend
6. Add environment variables in the Railway dashboard

### Option 3: Deploy to Vercel (Full Stack)

1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts
4. Configure API routes as serverless functions

## Important: Update Frontend API URLs

Before deploying, you need to update all API URLs in your frontend:

### Files to Update:
- `client/src/components/WorkoutList.js`
- `client/src/components/WorkoutForm.js`
- `client/src/components/ExerciseLibrary.js`
- `client/src/components/ProgressDashboard.js`
- `client/src/components/PersonalRecords.js`
- `client/src/components/Login.js`
- `client/src/components/Register.js`
- `client/src/context/AuthContext.js`

Change `http://localhost:5000` to your deployed backend URL.

## Note: In-Memory Storage Limitation

⚠️ Your app currently uses in-memory storage, which means:
- Data is lost when the server restarts
- Not suitable for production use

**For production, you should:**
1. Set up MongoDB Atlas (free tier): https://www.mongodb.com/cloud/atlas
2. Get your connection string
3. Add it to your environment variables as `MONGODB_URI`
4. Uncomment the MongoDB connection in `server/index.js`

## Testing Locally Before Deploy

1. Build frontend: `cd client && npm run build`
2. Test production backend: `NODE_ENV=production npm start`
3. Serve built frontend: `npx serve -s client/build`

## After Deployment

1. Test all features on the live site
2. Register a new account
3. Test workout creation, exercise library, personal records
4. Check browser console for any CORS or API errors

Good luck with your deployment! 🚀
