import express from 'express';
import { saveCourse, getCourses } from '../models/courseModel.js';
const router = express.Router();

router.post('/save', async (req, res) => {
  const { userId, content } = req.body;
  const saved = await saveCourse(userId, content);
  res.json(saved);
});

router.get('/:userId', async (req, res) => {
  const data = await getCourses(req.params.userId);
  res.json(data);
});

export default router;
