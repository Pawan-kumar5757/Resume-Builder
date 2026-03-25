import express from 'express';
import Resume from '../models/Resume.js';

const router = express.Router();

// Create a new resume (Timer limit removed from this route)
router.post('/', async (req, res) => {
  try {
    const newResume = await Resume.create(req.body.resumeData);
    res.status(201).json({ success: true, data: newResume });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all resumes (Admin)
router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json({ success: true, data: resumes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single resume (Admin)
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: resume });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update single resume (Admin)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Resume.findByIdAndUpdate(req.params.id, req.body.resumeData, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete single resume (Admin)
router.delete('/:id', async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
