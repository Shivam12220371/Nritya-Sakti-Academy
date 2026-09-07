const Class = require('../models/Class');
const Enrollment = require('../models/Enrollment');
const User = require('../models/User');
const Attendance = require('../models/Attendance');
const Video = require('../models/Video');

// @desc    Get classes assigned to instructor
// @route   GET /api/instructor/classes
// @access  Private/Instructor
const getInstructorClasses = async (req, res) => {
  try {
    const classes = await Class.find({ instructor: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get students enrolled in instructor's classes
// @route   GET /api/instructor/students
// @access  Private/Instructor
const getInstructorStudents = async (req, res) => {
  try {
    // 1. Get all classes for this instructor
    const classes = await Class.find({ instructor: req.user._id }).select('_id title');
    const classIds = classes.map(c => c._id);
    
    // 2. Find enrollments for these classes
    const enrollments = await Enrollment.find({ class: { $in: classIds } }).populate('student', '-password').populate('class', 'title level');
    
    // 3. Extract unique students with their class info
    const studentsMap = new Map();
    enrollments.forEach(enrollment => {
        if (enrollment.student) {
            const studentId = enrollment.student._id.toString();
            if (!studentsMap.has(studentId)) {
                studentsMap.set(studentId, {
                    ...enrollment.student.toObject(),
                    enrolledIn: [enrollment.class]
                });
            } else {
                studentsMap.get(studentId).enrolledIn.push(enrollment.class);
            }
        }
    });
    
    res.status(200).json(Array.from(studentsMap.values()));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark attendance for a class
// @route   POST /api/instructor/attendance
// @access  Private/Instructor
const markAttendance = async (req, res) => {
  try {
    const { classId, date, studentsData } = req.body;
    // studentsData should be: [{ student: id, status: 'Present'|'Absent' }]
    
    // Make sure instructor teaches this class
    const danceClass = await Class.findOne({ _id: classId, instructor: req.user._id });
    if (!danceClass) return res.status(403).json({ message: 'Not authorized for this class' });

    for (const record of studentsData) {
        // Find existing attendance for this student/date to prevent duplicates
        const existing = await Attendance.findOne({
            class: classId,
            student: record.student,
            date: new Date(date)
        });

        if (existing) {
            existing.status = record.status;
            existing.markedBy = req.user._id;
            await existing.save();
        } else {
            await Attendance.create({
                class: classId,
                student: record.student,
                date: new Date(date),
                status: record.status,
                markedBy: req.user._id
            });
        }
        
        // Recalculate attendance percent for the student (Simple version: count Present vs Total)
        const totalAttendanceRecords = await Attendance.countDocuments({ student: record.student });
        const presentRecords = await Attendance.countDocuments({ student: record.student, status: 'Present' });
        
        const newPercent = totalAttendanceRecords > 0 
           ? Math.round((presentRecords / totalAttendanceRecords) * 100) 
           : 0;
           
        await User.findByIdAndUpdate(record.student, { attendancePercent: newPercent });
    }

    res.status(200).json({ message: 'Attendance recorded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload video material
// @route   POST /api/instructor/videos
// @access  Private/Instructor
const uploadMaterial = async (req, res) => {
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

// @desc    Update student progress
// @route   PUT /api/instructor/students/:id/progress
// @access  Private/Instructor
const updateStudentProgress = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);
    if (!student || student.role !== 'student') {
        return res.status(404).json({ message: 'Student not found' });
    }

    const { overall, technique, flexibility, rhythm, expression } = req.body;

    if (student.progress) {
      student.progress.overall = overall !== undefined ? overall : student.progress.overall;
      student.progress.technique = technique !== undefined ? technique : student.progress.technique;
      student.progress.flexibility = flexibility !== undefined ? flexibility : student.progress.flexibility;
      student.progress.rhythm = rhythm !== undefined ? rhythm : student.progress.rhythm;
      student.progress.expression = expression !== undefined ? expression : student.progress.expression;
    }

    await student.save();
    res.status(200).json({ message: 'Progress updated successfully', progress: student.progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInstructorClasses,
  getInstructorStudents,
  markAttendance,
  uploadMaterial,
  updateStudentProgress
};
