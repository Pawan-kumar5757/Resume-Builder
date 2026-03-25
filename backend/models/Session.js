import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  startTime: { type: Date, required: true, default: Date.now }
});

export default mongoose.model('Session', sessionSchema);
