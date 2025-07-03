import Task from "../models/taskModel.js";

// This function creates a new task
const createTask = async (req, res) => {
  try {
    const { name, completed } = req.body;
    const task = await Task.create({ name, completed });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// This function retrieves all tasks from the database

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// This function retrieves a single task by its ID
const getTask =async (req,res) => {

    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        } 
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// delete a task by its ID
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: `No task with ${id}` });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// update a task by its ID
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createTask, getTasks, getTask,  deleteTask, updateTask };