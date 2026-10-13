const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const chatRoute = require('./routes/chatRoute');
const messageRoutes = require('./routes/messageRoutes');
const meetingsRoutes = require('./routes/meetings');
const path = require('path');

// Middleware
app.use(cors());
// Gzip compression — reduces JSON/HTML payload size by 60-80%
app.use(compression());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/instructor', instructorRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/chat', chatRoute);
app.use('/api/messages', messageRoutes);
app.use('/api/live-meetings', meetingsRoutes);

// Mount public uploads folder with long-lived cache headers
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '7d',            // Browser caches profile images for 7 days
  etag: true,
  lastModified: true,
}));

// Health check endpoint — used for keep-alive pings and frontend pre-warm
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', ts: Date.now() });
});

// Basic route
app.get('/', (req, res) => {
  res.send('Dance Academy API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
