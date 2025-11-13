const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const PersonalRecord = require('../models/PersonalRecord');
const { protect } = require('../middleware/auth-simple');

// For backward compatibility during development
let inMemoryWorkouts = [
  {
    id: '1',
    name: 'Push Day',
    date: new Date().toISOString(),
    duration: 60,
    exercises: [
      { id: 'e1', name: 'Bench Press', category: 'chest', sets: 4, reps: 8, weight: 80, unit: 'kg' },
      { id: 'e2', name: 'Shoulder Press', category: 'shoulders', sets: 3, reps: 10, weight: 30, unit: 'kg' }
    ],
    notes: 'Great session!'
  }
];

// In-memory personal records
let inMemoryRecords = [];

// Helper function to update personal records (in-memory)
const updatePersonalRecords = (userId, exercises) => {
  for (const exercise of exercises) {
    if (!exercise.weight || !exercise.name) continue;

    const existingRecord = inMemoryRecords.find(r => 
      r.user === userId && r.exerciseName === exercise.name
    );

    if (!existingRecord) {
      inMemoryRecords.push({
        user: userId,
        exerciseName: exercise.name,
        category: exercise.category,
        maxWeight: exercise.weight,
        maxReps: exercise.reps,
        unit: exercise.unit,
        achievedDate: new Date()
      });
    } else if (exercise.weight > existingRecord.maxWeight) {
      existingRecord.maxWeight = exercise.weight;
      existingRecord.maxReps = exercise.reps;
      existingRecord.achievedDate = new Date();
    }
  }
};

// GET all workouts (try DB first, fallback to in-memory)
router.get('/', protect, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id }).sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    // Fallback to in-memory for development
    res.json(inMemoryWorkouts);
  }
});

// GET single workout
router.get('/:id', protect, async (req, res) => {
  try {
    const workout = await Workout.findOne({ _id: req.params.id, user: req.user._id });
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    const workout = inMemoryWorkouts.find(w => w.id === req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);
  }
});

// POST new workout
router.post('/', protect, async (req, res) => {
  try {
    const newWorkout = await Workout.create({
      user: req.user._id,
      ...req.body
    });

    // Update personal records
    if (req.body.exercises) {
      await updatePersonalRecords(req.user._id, req.body.exercises);
    }

    res.status(201).json(newWorkout);
  } catch (error) {
    // Fallback for development
    const newWorkout = {
      id: Date.now().toString(),
      ...req.body,
      date: req.body.date || new Date().toISOString()
    };
    inMemoryWorkouts.push(newWorkout);
    
    // Update personal records (in-memory)
    if (req.body.exercises) {
      updatePersonalRecords(req.user._id, req.body.exercises);
    }
    
    res.status(201).json(newWorkout);
  }
});

// PUT update workout
router.put('/:id', protect, async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.json(workout);
  } catch (error) {
    const index = inMemoryWorkouts.findIndex(w => w.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    inMemoryWorkouts[index] = { ...inMemoryWorkouts[index], ...req.body };
    res.json(inMemoryWorkouts[index]);
  }
});

// DELETE workout
router.delete('/:id', protect, async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    const index = inMemoryWorkouts.findIndex(w => w.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    inMemoryWorkouts.splice(index, 1);
    res.json({ message: 'Workout deleted successfully' });
  }
});

module.exports = router;
module.exports.inMemoryRecords = inMemoryRecords;
