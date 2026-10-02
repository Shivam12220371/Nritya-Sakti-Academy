const express = require('express');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const LiveMeeting = require('../models/LiveMeeting');
const Class = require('../models/Class');
const Enrollment = require('../models/Enrollment');

const router = express.Router();

const adminOrInstructor = authorizeRoles('admin', 'instructor');

// @desc    Create a new Live Meeting (Host only)
// @route   POST /api/meetings/start
// @access  Private (Admin/Instructor)
router.post('/start', protect, adminOrInstructor, async (req, res) => {
    try {
        const { title, targetClasses } = req.body;
        
        const meetingRoomId = `nrityashakti-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`;

        const meeting = await LiveMeeting.create({
            title,
            host: req.user._id,
            meetingRoomId,
            targetClasses: targetClasses || [],
            status: 'Active'
        });

        res.status(201).json(meeting);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create meeting', error: error.message });
    }
});

// @desc    Get active meetings for a specifically targeted student
// @route   GET /api/meetings/active
// @access  Private
router.get('/active', protect, async (req, res) => {
    try {
        if (req.user.role === 'admin' || req.user.role === 'instructor') {
            const meetings = await LiveMeeting.find({ host: req.user._id, status: 'Active' }).populate('targetClasses', 'title').sort({createdAt: -1});
            return res.json(meetings);
        }

        // Find which classes the student is enrolled in
        const enrollments = await Enrollment.find({ student: req.user._id, status: 'Active' });
        const enrolledClassIds = enrollments.map(e => e.class);

        const meetings = await LiveMeeting.find({
            status: 'Active',
            targetClasses: { $in: enrolledClassIds }
        }).populate('host', 'name').sort({createdAt: -1});

        res.json(meetings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch active meetings', error: error.message });
    }
});

// @desc    End a specific live meeting
// @route   POST /api/meetings/end/:id
// @access  Private (Admin/Instructor)
router.post('/end/:id', protect, adminOrInstructor, async (req, res) => {
    try {
        const meeting = await LiveMeeting.findById(req.params.id);
        
        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found' });
        }
        
        // Ensure only the host or an Admin can end it
        if (meeting.host.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to end this meeting.' });
        }

        meeting.status = 'Ended';
        await meeting.save();

        res.json({ message: 'Meeting ended successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to end meeting', error: error.message });
    }
});

// @desc    Validate access to a specific room for a student
// @route   GET /api/meetings/verify/:roomId
// @access  Private
router.get('/verify/:roomId', protect, async (req, res) => {
    try {
        const room = await LiveMeeting.findOne({ meetingRoomId: req.params.roomId });
        if (!room) {
            return res.status(404).json({ message: 'Meeting room not found or not active.' });
        }
        if (room.status === 'Ended') {
            return res.status(400).json({ message: 'This meeting has ended.' });
        }

        if (req.user.role === 'admin' || req.user.role === 'instructor') {
            // Admins can join, or the specifically authorized host instructor
            return res.json({ valid: true, role: 'host', title: room.title });
        }

        // Student validation
        const enrollments = await Enrollment.find({ student: req.user._id, status: 'Active' });
        const enrolledClassIds = enrollments.map(e => e.class.toString());
        
        const hasAccess = room.targetClasses.some(tc => enrolledClassIds.includes(tc.toString()));
        if (!hasAccess) {
            return res.status(403).json({ message: 'You are not authorized to join this specific meeting.' });
        }

        res.json({ valid: true, role: 'participant', title: room.title });
    } catch (error) {
         res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
