const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Class = require('./models/Class');
const Enrollment = require('./models/Enrollment');
const connect = async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nritya-shakti');
    const classes = await Class.find().populate('schedule');
    console.log(JSON.stringify(classes, null, 2));
    const enrollments = await Enrollment.find();
    console.log("enrolls", enrollments);
    process.exit(0);
}
connect();
