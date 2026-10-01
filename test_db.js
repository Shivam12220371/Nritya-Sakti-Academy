const mongoose = require('mongoose');
const Class = require('./backend/models/Class');
const Enrollment = require('./backend/models/Enrollment');
const connect = async () => {
    await mongoose.connect('mongodb://localhost:27017/nritya-shakti');
    const classes = await Class.find().populate('schedule');
    console.log(JSON.stringify(classes[0], null, 2));
    const enrollments = await Enrollment.find();
    console.log("enrolls", enrollments.length);
    process.exit(0);
}
connect();
