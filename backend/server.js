 import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import taskRoute from './route/taskRoute.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors());
// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/tasks', taskRoute); // This will handle all task-related routes

connectDB(); // Connect to the MongoDB database
// Home route
app.get("/", (req, res) => {
  res.send({message: "Welcome to the Task Manager API", success: true});
});
//server listening on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
}); 
