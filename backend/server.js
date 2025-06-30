import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import taskRoute from './route/taskRoute.js';


dotenv.config();

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to the database
connectDB();

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page...");
});

// Use task routes (prefix with /api/tasks for RESTful convention)
app.use('/api/tasks', taskRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});