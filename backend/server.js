import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import Task from './model/TaskModel.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB();

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page...");
});

// Create a task
app.post("/api/tasks", async (req, res) => {
  try {
    const { name, completed } = req.body;
    const task = await Task.create({ name, completed });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all tasks 
app.get("/api/tasks",async(req,res)=>{
  try {
    const tasks= await Task.find();
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});