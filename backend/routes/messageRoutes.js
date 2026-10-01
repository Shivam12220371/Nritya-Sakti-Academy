const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { getMessages, createMessage, deleteMessage } = require('../controllers/messageController');

// All endpoints require authentication
router.use(protect);

router.route('/')
  .get(getMessages)
  .post(authorizeRoles('admin', 'instructor'), createMessage);

router.route('/:id')
  .delete(authorizeRoles('admin', 'instructor'), deleteMessage);

module.exports = router;
