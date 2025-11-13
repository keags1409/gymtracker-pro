const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  exercises: [{
    id: String,
    name: String,
    category: String,
    sets: Number,
    reps: Number,
    weight: Number,
    unit: String,
    notes: String
  }],
  date: {
    type: Date,
    default: Date.now
  },
  duration: {
    type: Number,
    default: 0
  },
  notes: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Workout', workoutSchema);
