const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB disabled - using in-memory storage
console.log('⚠️  Running without MongoDB - using in-memory storage');

// Middleware - Allow all origins for now
app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes - use simple in-memory auth
app.use('/api/auth', require('./routes/auth-simple'));
app.use('/api/workouts', require('./routes/workouts'));
app.use('/api/exercises', require('./routes/exercises'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/records', require('./routes/records-simple'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'GymTracker Pro API is running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
