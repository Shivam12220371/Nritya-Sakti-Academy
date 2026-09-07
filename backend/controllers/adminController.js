const User = require('../models/User');
const Class = require('../models/Class');
const Enrollment = require('../models/Enrollment');
const Video = require('../models/Video');

// @desc    Get all users (excluding passwords)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a specific user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      // Security measure to prevent admin deleting themselves
      if (user._id.toString() === req.user._id.toString()) {
        return res.status(400).json({ message: 'You cannot delete yourself' });
      }
      
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'User permanently deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a user's role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { role } = req.body;

    if (user) {
      if (user._id.toString() === req.user._id.toString()) {
        return res.status(400).json({ message: 'You cannot change your own admin role' });
      }

      user.role = role || user.role;
      const updatedUser = await user.save();
      
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        role: updatedUser.role,
        message: `User promoted to ${updatedUser.role}`
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update student progress matrices
// @route   PUT /api/admin/users/:id/student-data
// @access  Private/Admin
const updateStudentData = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Only allow updating student metrics on students
    if (user.role !== 'student') {
      return res.status(400).json({ message: 'Can only update student data for Student roles.' });
    }

    const { 
      currentLevel, subscriptionPlan, classesCompleted, attendancePercent,
      videosWatched, certificates,
      overall, technique, flexibility, rhythm, expression 
    } = req.body;

    user.currentLevel = currentLevel || user.currentLevel;
    user.subscriptionPlan = subscriptionPlan || user.subscriptionPlan;
    user.classesCompleted = classesCompleted !== undefined ? classesCompleted : user.classesCompleted;
    user.attendancePercent = attendancePercent !== undefined ? attendancePercent : user.attendancePercent;
    user.videosWatched = videosWatched !== undefined ? videosWatched : user.videosWatched;
    user.certificates = certificates !== undefined ? certificates : user.certificates;
    
    // Update nested progress object gracefully
    if (user.progress) {
      user.progress.overall = overall !== undefined ? overall : user.progress.overall;
      user.progress.technique = technique !== undefined ? technique : user.progress.technique;
      user.progress.flexibility = flexibility !== undefined ? flexibility : user.progress.flexibility;
      user.progress.rhythm = rhythm !== undefined ? rhythm : user.progress.rhythm;
      user.progress.expression = expression !== undefined ? expression : user.progress.expression;
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dynamic dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const activeInstructors = await User.countDocuments({ role: 'instructor' });
    const totalClasses = await Class.countDocuments({});
    
    // Revenue mock calculation (Assume a flat ₹800 pricing tier right now)
    const activeEnrollments = await Enrollment.countDocuments({ status: 'Active' });
    const revenue = activeEnrollments * 800; // Mock calculation based on enrollments

    res.status(200).json({
      totalStudents,
      activeInstructors,
      totalClasses,
      revenue: `₹${(revenue / 100000).toFixed(1)}L` // Format as Lakhs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all classes with instructor data
// @route   GET /api/admin/classes
// @access  Private/Admin
const getClasses = async (req, res) => {
  try {
    const classes = await Class.find({}).populate('instructor', 'name email').sort({ createdAt: -1 });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new class
// @route   POST /api/admin/classes
// @access  Private/Admin
const createClass = async (req, res) => {
  try {
    const { title, instructor, style, level, capacity, schedule } = req.body;
    
    const newClass = await Class.create({
      title,
      instructor,
      style,
      level,
      capacity,
      schedule: schedule || []
    });

    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Enroll student in class
// @route   POST /api/admin/users/:id/enroll
// @access  Private/Admin
const enrollStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);
    if (!student || student.role !== 'student') return res.status(404).json({ message: 'Student not found.' });

    const { classId } = req.body;
    const danceClass = await Class.findById(classId);
    if (!danceClass) return res.status(404).json({ message: 'Class not found' });

    const existing = await Enrollment.findOne({ student: student._id, class: classId });
    if (existing) return res.status(400).json({ message: 'Student already enrolled in this class' });

    const enrollment = await Enrollment.create({
      student: student._id,
      class: classId
    });

    danceClass.enrolledCount += 1;
    await danceClass.save();

    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Unenroll student
// @route   DELETE /api/admin/users/:id/enroll/:classId
// @access  Private/Admin
const unenrollStudent = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOneAndDelete({ student: req.params.id, class: req.params.classId });
    if (enrollment) {
       const danceClass = await Class.findById(req.params.classId);
       if (danceClass && danceClass.enrolledCount > 0) {
           danceClass.enrolledCount -= 1;
           await danceClass.save();
       }
    }
    res.status(200).json({ message: 'Removed from class' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get student enrollments
// @route   GET /api/admin/users/:id/enrollments
// @access  Private/Admin
const getStudentEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.params.id }).populate('class');
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a class
// @route   DELETE /api/admin/classes/:id
// @access  Private/Admin
const deleteClass = async (req, res) => {
  try {
    const danceClass = await Class.findById(req.params.id);
    if (!danceClass) return res.status(404).json({ message: 'Class not found' });
    
    await Class.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Class permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all videos
// @route   GET /api/admin/videos
// @access  Private/Admin
const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new video by URL
// @route   POST /api/admin/videos
// @access  Private/Admin
const addVideo = async (req, res) => {
  try {
    const { title, description, url, category, duration } = req.body;
    const video = await Video.create({
      title,
      description,
      url,
      category,
      duration,
      uploadedBy: req.user._id
    });
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Issue actual Certificate to a student
// @route   POST /api/admin/users/:id/certificate
// @access  Private/Admin
const addCertificate = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    if (!req.file) {
      return res.status(400).json({ message: 'No certificate file attached.' });
    }

    const { title } = req.body;

    user.certificateFiles.push({
      title: title || 'Official Certificate',
      fileUrl: `/uploads/${req.file.filename}`
    });

    user.certificates += 1;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update student fee specifics
// @route   PUT /api/admin/users/:id/fee
// @access  Private/Admin
const updateStudentFee = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'student') {
        return res.status(404).json({ message: 'Student not found.' });
    }
    
    const { monthlyFee, feeStatus } = req.body;
    if (monthlyFee !== undefined) user.monthlyFee = monthlyFee;
    if (feeStatus) user.feeStatus = feeStatus;
    
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  updateUserRole,
  updateStudentData,
  getDashboardStats,
  getClasses,
  createClass,
  deleteClass,
  getVideos,
  addVideo,
  addCertificate,
  enrollStudent,
  unenrollStudent,
  getStudentEnrollments,
  updateStudentFee
};
