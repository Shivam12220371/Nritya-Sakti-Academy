const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  class: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Class', 
    required: true 
  },
  dateIssued: { 
    type: Date, 
    default: Date.now 
  },
  pdfUrl: { 
    type: String, 
    required: true // Store the relative or absolute URL/path to the downloaded PDF
  },
  status: { 
    type: String, 
    enum: ['Valid', 'Revoked'], 
    default: 'Valid' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
