const express = require('express');
const router = express.Router();
const {
  generateCertificate,
  verifyCertificate,
  getStudentCertificates,
  deleteCertificate
} = require('../controllers/certificateController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Public route for verifying certificates
router.get('/verify/:certificateId', verifyCertificate);

// Protected routes for students
router.get('/my-certificates', protect, getStudentCertificates);

// Admin route to generate certificate
router.post('/generate/:enrollmentId', protect, authorizeRoles('admin', 'system_admin'), generateCertificate);

// Admin route to delete a generated certificate
router.delete('/:enrollmentId', protect, authorizeRoles('admin', 'system_admin'), deleteCertificate);

module.exports = router;
