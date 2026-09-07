const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  style: { type: String, enum: ['Bollywood', 'Hip Hop', 'Contemporary', 'Jazz', 'Freestyle', 'Kids', 'Classical'], required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  schedule: [{
    day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    startTime: { type: String }, // e.g. "18:00"
    endTime: { type: String }    // e.g. "19:00"
  }],
  capacity: { type: Number, default: 20 },
  enrolledCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
