const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' },
  profileImage: { type: String, default: '' },
  
  // Student specific fields
  enrolledPrograms: [{ type: String }],
  subscriptionPlan: { type: String, enum: ['Free Trial', 'Basic', 'Pro', 'Premium'], default: 'Free Trial' },
  monthlyFee: { type: Number, default: 2000 },
  feeStatus: { type: String, enum: ['Pending', 'Submitted', 'Received'], default: 'Pending' },
  
  // Progress (Student)
  currentLevel: { type: String, default: 'Beginner' },
  progress: {
    overall: { type: Number, default: 0 },
    technique: { type: Number, default: 0 },
    flexibility: { type: Number, default: 0 },
    rhythm: { type: Number, default: 0 },
    expression: { type: Number, default: 0 },
  },
  classesCompleted: { type: Number, default: 0 },
  videosWatched: { type: Number, default: 0 },
  certificates: { type: Number, default: 0 },
  attendancePercent: { type: Number, default: 0 },
  
  certificateFiles: [{
     title: String,
     fileUrl: String,
     issuedAt: { type: Date, default: Date.now }
  }],
  watchedVideoIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],

  // Password Reset Feature
  resetPasswordOtp: { type: String },
  resetPasswordOtpExpiry: { type: Date },
}, { timestamps: true });

// Pre-save hook to hash password
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to verify password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
