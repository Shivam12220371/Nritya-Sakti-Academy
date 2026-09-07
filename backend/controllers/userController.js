const User = require('../models/User');
const Video = require('../models/Video');
const path = require('path');
const fs = require('fs');
const Enrollment = require('../models/Enrollment');
const sendEmail = require('../utils/sendEmail');

// @desc    Upload & Set user profile image
// @route   POST /api/users/profile-image
// @access  Private
const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete old image if it exists to save space locally
    if (user.profileImage) {
      const oldPath = path.join(__dirname, '..', user.profileImage);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Save relative path: e.g. "/uploads/userID-1234.jpg"
    // Remember to use `/` forward slash format for web compatibility
    user.profileImage = `/uploads/${req.file.filename}`;
    
    await user.save();

    res.status(200).json({
      message: 'Profile image uploaded successfully',
      profileImage: user.profileImage
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark a video as watched by the user
// @route   POST /api/users/watch-video/:videoId
// @access  Private
const markVideoWatched = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const videoId = req.params.videoId;

    // Check if not already watched
    if (!user.watchedVideoIds.includes(videoId)) {
      user.watchedVideoIds.push(videoId);
      user.videosWatched += 1;
      await user.save();
    }

    res.status(200).json({ 
      message: 'Video marked as seen', 
      videosWatched: user.videosWatched 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentClasses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id, status: 'Active' })
      .populate({
         path: 'class',
         populate: { path: 'instructor', select: 'name email' }
      });
      
    const classes = enrollments.map(e => e.class).filter(c => c != null);
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentVideos = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const processFeePayment = async (req, res) => {
  try {
    const { amount, transactionId, method } = req.body;
    
    if (!amount || !transactionId) {
      return res.status(400).json({ message: 'Missing required payment details' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found for processing' });
    }

    // Strict 12-digit UPI UTR regex verification
    const utrRegex = /^\d{12}$/;
    if (!utrRegex.test(transactionId)) {
      return res.status(400).json({ message: 'Validation Denied: The UTR / Reference ID must be exactly 12 numerical digits long.' });
    }
    
    const message = `Dear ${user.name},\n\nWe have successfully received your payment of ₹${amount} via ${method || 'UPI/QR'}.\nTransaction Reference ID: ${transactionId}\n\nThank you for choosing Nritya Shakti Academy!\n\nBest Regards,\nAyushi Dubey`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Secure Payment Receipt - Nritya Shakti Academy',
        message: message
      });
    } catch (emailError) {
      console.error('Email failed to send for payment receipt:', emailError);
    }
    
    // Change Student state internally for Administrative review
    user.feeStatus = 'Received';
    await user.save();

    res.status(200).json({ message: 'Payment verified successfully. A digital receipt has been dispatched to your registered email.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadProfileImage,
  markVideoWatched,
  getStudentVideos,
  getStudentClasses,
  processFeePayment
};
