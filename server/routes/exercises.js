const express = require('express');
const router = express.Router();

// Exercise library/database
const exerciseLibrary = [
  // Chest Exercises
  { id: '1', name: 'Bench Press', category: 'chest', description: 'Barbell chest press on flat bench' },
  { id: '2', name: 'Incline Bench Press', category: 'chest', description: 'Upper chest focused press' },
  { id: '3', name: 'Decline Bench Press', category: 'chest', description: 'Lower chest focused press' },
  { id: '4', name: 'Dumbbell Flyes', category: 'chest', description: 'Chest isolation stretch exercise' },
  { id: '5', name: 'Cable Crossover', category: 'chest', description: 'Cable chest fly variation' },
  { id: '6', name: 'Push-ups', category: 'chest', description: 'Bodyweight chest exercise' },
  { id: '7', name: 'Dips (Chest)', category: 'chest', description: 'Chest-focused dip variation' },
  { id: '8', name: 'Pec Deck Machine', category: 'chest', description: 'Machine chest fly' },
  
  // Back Exercises
  { id: '9', name: 'Deadlift', category: 'back', description: 'Full body compound pulling exercise' },
  { id: '10', name: 'Barbell Row', category: 'back', description: 'Horizontal pulling movement' },
  { id: '11', name: 'Pull-ups', category: 'back', description: 'Vertical bodyweight pull' },
  { id: '12', name: 'Lat Pulldown', category: 'back', description: 'Machine vertical pull' },
  { id: '13', name: 'T-Bar Row', category: 'back', description: 'Thick grip rowing exercise' },
  { id: '14', name: 'Seated Cable Row', category: 'back', description: 'Horizontal cable pull' },
  { id: '15', name: 'One-Arm Dumbbell Row', category: 'back', description: 'Unilateral back exercise' },
  { id: '16', name: 'Face Pulls', category: 'back', description: 'Upper back and rear delt exercise' },
  { id: '17', name: 'Chin-ups', category: 'back', description: 'Underhand grip pull-up' },
  
  // Leg Exercises
  { id: '18', name: 'Squat', category: 'legs', description: 'King of leg exercises' },
  { id: '19', name: 'Front Squat', category: 'legs', description: 'Quad-focused squat variation' },
  { id: '20', name: 'Leg Press', category: 'legs', description: 'Machine quad exercise' },
  { id: '21', name: 'Romanian Deadlift', category: 'legs', description: 'Hamstring focused hinge' },
  { id: '22', name: 'Leg Curl', category: 'legs', description: 'Hamstring isolation' },
  { id: '23', name: 'Leg Extension', category: 'legs', description: 'Quad isolation exercise' },
  { id: '24', name: 'Lunges', category: 'legs', description: 'Unilateral leg exercise' },
  { id: '25', name: 'Bulgarian Split Squat', category: 'legs', description: 'Single leg squat variation' },
  { id: '26', name: 'Calf Raises', category: 'legs', description: 'Calf muscle isolation' },
  { id: '27', name: 'Hack Squat', category: 'legs', description: 'Machine squat variation' },
  
  // Shoulder Exercises
  { id: '28', name: 'Overhead Press', category: 'shoulders', description: 'Standing barbell press' },
  { id: '29', name: 'Dumbbell Shoulder Press', category: 'shoulders', description: 'Seated dumbbell press' },
  { id: '30', name: 'Lateral Raises', category: 'shoulders', description: 'Side delt isolation' },
  { id: '31', name: 'Front Raises', category: 'shoulders', description: 'Front delt isolation' },
  { id: '32', name: 'Rear Delt Flyes', category: 'shoulders', description: 'Rear shoulder isolation' },
  { id: '33', name: 'Arnold Press', category: 'shoulders', description: 'Rotating dumbbell press' },
  { id: '34', name: 'Upright Row', category: 'shoulders', description: 'Trap and delt exercise' },
  { id: '35', name: 'Military Press', category: 'shoulders', description: 'Strict overhead press' },
  
  // Arm Exercises
  { id: '36', name: 'Barbell Curl', category: 'arms', description: 'Classic bicep exercise' },
  { id: '37', name: 'Dumbbell Curl', category: 'arms', description: 'Unilateral bicep curl' },
  { id: '38', name: 'Hammer Curl', category: 'arms', description: 'Neutral grip bicep curl' },
  { id: '39', name: 'Preacher Curl', category: 'arms', description: 'Isolated bicep curl' },
  { id: '40', name: 'Tricep Dips', category: 'arms', description: 'Compound tricep exercise' },
  { id: '41', name: 'Close-Grip Bench Press', category: 'arms', description: 'Tricep focused press' },
  { id: '42', name: 'Tricep Pushdown', category: 'arms', description: 'Cable tricep extension' },
  { id: '43', name: 'Overhead Tricep Extension', category: 'arms', description: 'Long head tricep focus' },
  { id: '44', name: 'Skull Crushers', category: 'arms', description: 'Lying tricep extension' },
  { id: '45', name: 'Concentration Curl', category: 'arms', description: 'Seated isolated bicep curl' },
  
  // Core Exercises
  { id: '46', name: 'Plank', category: 'core', description: 'Isometric core hold' },
  { id: '47', name: 'Crunches', category: 'core', description: 'Basic ab exercise' },
  { id: '48', name: 'Russian Twists', category: 'core', description: 'Oblique rotation exercise' },
  { id: '49', name: 'Leg Raises', category: 'core', description: 'Lower ab focus' },
  { id: '50', name: 'Ab Wheel Rollout', category: 'core', description: 'Advanced ab exercise' },
  { id: '51', name: 'Cable Woodchoppers', category: 'core', description: 'Rotational ab exercise' },
  { id: '52', name: 'Mountain Climbers', category: 'core', description: 'Dynamic ab exercise' },
  { id: '53', name: 'Bicycle Crunches', category: 'core', description: 'Oblique-focused crunch' },
  { id: '54', name: 'Dead Bug', category: 'core', description: 'Core stability exercise' },
  { id: '55', name: 'Hanging Knee Raises', category: 'core', description: 'Hanging ab exercise' }
];

// GET all exercises
router.get('/', (req, res) => {
  const { category } = req.query;
  if (category) {
    const filtered = exerciseLibrary.filter(e => e.category === category);
    return res.json(filtered);
  }
  res.json(exerciseLibrary);
});

// GET single exercise
router.get('/:id', (req, res) => {
  const exercise = exerciseLibrary.find(e => e.id === req.params.id);
  if (!exercise) {
    return res.status(404).json({ message: 'Exercise not found' });
  }
  res.json(exercise);
});

module.exports = router;
