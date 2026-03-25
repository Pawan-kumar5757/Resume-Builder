import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  personalInfo: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    dob: { type: String, required: true }
  },
  summary: { type: String },
  education: [{
    institution: String,
    degree: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  experience: [{
    company: String,
    position: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  skills: [String],
  projects: [{
    title: String,
    technologies: String,
    link: String,
    description: String
  }],
  whatsappNumber: { type: String },
}, { timestamps: true });

export default mongoose.model('Resume', resumeSchema);
