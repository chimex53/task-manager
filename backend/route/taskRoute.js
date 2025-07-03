import express from 'express';
const router = express.Router();
import { createTask, getTasks, getTask,deleteTask,updateTask} from '../controllers/taskController.js';

router.post("/", createTask );       //createTask function handles the creation of a new task
router.get("/", getTasks);          // Get all tasks from the database
router.get("/:id", getTask);        // Get a single task by ID
router.delete("/:id", deleteTask);  // deleteTask function handles the deletion of a task by its ID
router.put("/:id", (updateTask) )   // updateTask function handles the updating of a task by its ID

export default router;