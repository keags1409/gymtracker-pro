const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to PostgreSQL (falls back to in-memory if no DATABASE_URL)
if (process.env.DATABASE_URL) {
  connectDB();
} else {
  console.log('⚠️  Running without PostgreSQL - using in-memory storage');
}

// Middleware - Allow all origins for now
app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes - use PostgreSQL-enabled routes
app.use('/api/auth', require('./routes/auth-postgres'));
app.use('/api/workouts', require('./routes/workouts'));
app.use('/api/exercises', require('./routes/exercises'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/records', require('./routes/records-simple'));

// Health checks
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'GymTracker Pro API is running' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'GymTracker Pro API is running' });
});

// 404 handler
app.use((req, res) => {
  console.log('404:', req.method, req.url);
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
