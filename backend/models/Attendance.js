const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent', 'Late'], default: 'Present' },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Instructor who marked it
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
