const express = require('express');
const router = express.Router();

// In-memory progress tracking
let progressData = [];

// GET progress data
router.get('/', (req, res) => {
  const { exerciseName, startDate, endDate } = req.query;
  let filtered = progressData;

  if (exerciseName) {
    filtered = filtered.filter(p => p.exerciseName === exerciseName);
  }

  if (startDate) {
    filtered = filtered.filter(p => new Date(p.date) >= new Date(startDate));
  }

  if (endDate) {
    filtered = filtered.filter(p => new Date(p.date) <= new Date(endDate));
  }

  res.json(filtered);
});

// POST progress entry
router.post('/', (req, res) => {
  const newProgress = {
    id: Date.now().toString(),
    ...req.body,
    date: req.body.date || new Date().toISOString()
  };
  progressData.push(newProgress);
  res.status(201).json(newProgress);
});

// GET statistics
router.get('/stats', (req, res) => {
  const stats = {
    totalWorkouts: progressData.length,
    totalVolume: progressData.reduce((sum, p) => sum + (p.weight * p.reps * p.sets), 0),
    exerciseBreakdown: {}
  };

  progressData.forEach(p => {
    if (!stats.exerciseBreakdown[p.exerciseName]) {
      stats.exerciseBreakdown[p.exerciseName] = { count: 0, maxWeight: 0 };
    }
    stats.exerciseBreakdown[p.exerciseName].count++;
    stats.exerciseBreakdown[p.exerciseName].maxWeight = Math.max(
      stats.exerciseBreakdown[p.exerciseName].maxWeight,
      p.weight || 0
    );
  });

  res.json(stats);
});

module.exports = router;
