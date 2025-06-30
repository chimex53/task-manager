import express from 'express';
import Task from '../model/taskModel.js';
const router = express.Router();

// Create a task
router.post("/", async (req, res) => {
  try {
    const { name, completed } = req.body;
    const task = await Task.create({ name, completed });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all tasks 
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

export default router;