const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { 
    getInstructorClasses, 
    getInstructorStudents, 
    markAttendance,
    uploadMaterial,
    updateStudentProgress
} = require('../controllers/instructorController');

// Ensure requester is logged in and is either an instructor or admin
router.use(protect);
router.use(authorizeRoles('instructor', 'admin'));

router.get('/classes', getInstructorClasses);
router.get('/students', getInstructorStudents);
router.post('/attendance', markAttendance);
router.post('/videos', uploadMaterial);
router.put('/students/:id/progress', updateStudentProgress);

module.exports = router;
