import express from 'express';
import { connectToDatabase } from '../database/mongodb.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Missing required fields: name, email, and message are required' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }
    if (String(message).trim().length < 10) {
      return res.status(400).json({ success: false, error: 'Message must be at least 10 characters long' });
    }
    const { contacts } = await connectToDatabase();
    const now = new Date();
    const result = await contacts.insertOne({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      message: String(message).trim(),
      createdAt: now,
      updatedAt: now,
    });
    return res.status(201).json({ success: true, message: 'Contact form submitted successfully', id: result.insertedId });
  } catch (error) {
    return res.status(500).json({ success: false, error: `Failed to submit contact form: ${error instanceof Error ? error.message : 'An unknown error occurred'}` });
  }
});

export default router;
