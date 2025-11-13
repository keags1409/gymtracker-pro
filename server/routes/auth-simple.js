const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// In-memory user storage (for demo without MongoDB)
let users = [];

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_this_in_production', {
    expiresIn: '30d'
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Check if user exists
    const userExists = users.find(u => u.email === email || u.username === username);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    users.push(user);

    // Return user data and token
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user.id),
      user: {
        _id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Return user data and token
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user.id),
      user: {
        _id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_this_in_production');
    const user = users.find(u => u.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      _id: user.id,
      username: user.username,
      email: user.email
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(401).json({ message: 'Not authorized' });
  }
});

module.exports = router;
