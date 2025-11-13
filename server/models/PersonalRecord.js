const mongoose = require('mongoose');

const personalRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exerciseName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  maxWeight: {
    type: Number,
    default: 0
  },
  maxReps: {
    type: Number,
    default: 0
  },
  unit: {
    type: String,
    default: 'kg'
  },
  achievedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PersonalRecord', personalRecordSchema);
