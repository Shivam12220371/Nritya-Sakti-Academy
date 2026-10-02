const mongoose = require('mongoose');

const liveMeetingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    meetingRoomId: { type: String, required: true, unique: true },
    targetClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
    status: { type: String, enum: ['Active', 'Ended'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('LiveMeeting', liveMeetingSchema);
