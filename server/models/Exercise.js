// Exercise Model
class Exercise {
  constructor(id, name, category, sets, reps, weight, unit, notes) {
    this.id = id;
    this.name = name;
    this.category = category; // e.g., 'chest', 'back', 'legs', 'shoulders', 'arms'
    this.sets = sets;
    this.reps = reps;
    this.weight = weight;
    this.unit = unit; // 'kg' or 'lbs'
    this.notes = notes;
  }
}

module.exports = Exercise;
