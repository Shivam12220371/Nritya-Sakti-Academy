const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, forgotPassword, resetPassword, googleLogin } = require('../controllers/authController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);
router.get('/profile', protect, getUserProfile);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Example of an admin-only route for testing RBAC
router.get('/admin-dashboard', protect, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard' });
});

module.exports = router;
