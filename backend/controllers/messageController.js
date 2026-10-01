const Message = require('../models/Message');

// @desc    Get all active messages
// @route   GET /api/messages
// @access  Public (Enrolled students/instructors/admins)
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('sender', 'name profileImage role').sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new message
// @route   POST /api/messages
// @access  Private (Admin or Instructor)
const createMessage = async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Message content is required' });
    }

    const message = await Message.create({
      content,
      sender: req.user._id,
      role: req.user.role
    });

    const populatedMessage = await Message.findById(message._id).populate('sender', 'name profileImage role');

    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private (Admin or Instructor)
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (req.user.role !== 'admin' && message.sender.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this message' });
    }

    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Message deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMessages,
  createMessage,
  deleteMessage
};
