import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import resumeRoutes from './routes/resumeRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import whatsappRoutes from './routes/whatsappRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // React Vite default port
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resumedb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/resume', resumeRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/whatsapp', whatsappRoutes);

// Health check
app.get('/', (req, res) => res.json({ status: 'API is running' }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
