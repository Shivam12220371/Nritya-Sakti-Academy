const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { getAllUsers, deleteUser, updateUserRole, updateStudentData, getDashboardStats, getClasses, createClass, deleteClass, getVideos, addVideo, addCertificate, enrollStudent, unenrollStudent, getStudentEnrollments, updateStudentFee } = require('../controllers/adminController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Apply security layers: Must be logged in AND have 'admin' role
router.use(protect);
router.use(authorizeRoles('admin'));

// Admin User Management Routes
router.route('/users')
  .get(getAllUsers);

router.route('/users/:id')
  .delete(deleteUser);

router.route('/users/:id/role')
  .put(updateUserRole);

router.route('/users/:id/student-data')
  .put(updateStudentData);

router.route('/users/:id/fee')
  .put(updateStudentFee);

router.route('/users/:id/enroll')
  .post(enrollStudent);

router.route('/users/:id/enroll/:classId')
  .delete(unenrollStudent);

router.route('/users/:id/enrollments')
  .get(getStudentEnrollments);

// Statistics and Advanced Admin routes
router.route('/stats')
  .get(getDashboardStats);

router.route('/classes')
  .get(getClasses)
  .post(createClass);

router.route('/classes/:id')
  .delete(deleteClass);

router.route('/videos')
  .get(getVideos)
  .post(addVideo);

router.post('/users/:id/certificate', upload.single('document'), addCertificate);

module.exports = router;
