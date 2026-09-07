const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' }, // Optional, video can belong to a class
  category: { type: String, enum: ['Full Class', 'Choreography', 'Tutorial', 'Performance'], default: 'Full Class' },
  duration: { type: Number }, // Duration in minutes
  views: { type: Number, default: 0 },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Admin or Instructor
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
