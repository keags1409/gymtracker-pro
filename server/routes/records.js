const express = require('express');
const router = express.Router();
const PersonalRecord = require('../models/PersonalRecord');
const { protect } = require('../middleware/auth');

// GET all personal records for a user
router.get('/', protect, async (req, res) => {
  try {
    const records = await PersonalRecord.find({ user: req.user._id }).sort({ maxWeight: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET personal records by category
router.get('/category/:category', protect, async (req, res) => {
  try {
    const records = await PersonalRecord.find({
      user: req.user._id,
      category: req.params.category
    }).sort({ maxWeight: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET top 5 personal records
router.get('/top', protect, async (req, res) => {
  try {
    const records = await PersonalRecord.find({ user: req.user._id })
      .sort({ maxWeight: -1 })
      .limit(5);
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
