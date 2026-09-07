require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected for Seed Script...');

        const targetEmail = 'janubhardwaj522001@gmail.com';
        
        const user = await User.findOne({ email: targetEmail });
        
        if (!user) {
            console.log(`User with email ${targetEmail} not found!`);
        } else {
            user.role = 'admin';
            await user.save();
            console.log(`SUCCESS: User ${targetEmail} has been permanently elevated to ADMIN.`);
        }
        
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        mongoose.disconnect();
        process.exit();
    }
};

seedAdmin();
