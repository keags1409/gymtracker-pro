const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth-simple');

// In-memory personal records (shared with workouts)
let inMemoryRecords = [];

// GET all personal records for current user
router.get('/', protect, async (req, res) => {
  try {
    const userRecords = inMemoryRecords.filter(r => r.user === req.user._id);
    res.json(userRecords.sort((a, b) => b.maxWeight - a.maxWeight));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET personal records by category
router.get('/category/:category', protect, async (req, res) => {
  try {
    const userRecords = inMemoryRecords.filter(r => 
      r.user === req.user._id && r.category === req.params.category
    );
    res.json(userRecords.sort((a, b) => b.maxWeight - a.maxWeight));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET top 5 personal records
router.get('/top', protect, async (req, res) => {
  try {
    const userRecords = inMemoryRecords.filter(r => r.user === req.user._id);
    const topRecords = userRecords
      .sort((a, b) => b.maxWeight - a.maxWeight)
      .slice(0, 5);
    res.json(topRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export records array so workouts can update it
module.exports = router;
module.exports.inMemoryRecords = inMemoryRecords;
