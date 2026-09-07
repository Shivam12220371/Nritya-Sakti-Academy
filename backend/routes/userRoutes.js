const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');
const { uploadProfileImage, markVideoWatched, getStudentVideos, getStudentClasses, processFeePayment } = require('../controllers/userController');

// All standard user routes require basic auth
router.use(protect);

router.get('/classes', getStudentClasses);
router.get('/videos', getStudentVideos);
router.post('/profile-image', upload.single('image'), uploadProfileImage);
router.post('/watch-video/:videoId', markVideoWatched);
router.post('/pay-fee', processFeePayment);

module.exports = router;
