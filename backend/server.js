 import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import taskRoute from './route/taskRoute.js';

dotenv.config();

const app = express();

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

/* import mongoose from 'mongoose';
 import dotenv from 'dotenv';

console.log('Connecting to MongoDB...');

dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  console.log('MongoDB__URI:', uri);  // Debug log

  if (!uri) {
    throw new Error('MongoDB URI is not defined in environment variables');
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
connectDB();
 */