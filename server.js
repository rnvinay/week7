// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/student_tasks', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define mongoose schema for Task
const taskSchema = new mongoose.Schema({
    courseId: String,
    taskName: String,
    dueDate: Date,
    additionalDetails: String,
});

// Define mongoose model for Task
const Task = mongoose.model('Task', taskSchema);

// Middleware to parse JSON requests
app.use(express.json());

// Route to handle task submission
app.post('/submit-task', async (req, res) => {
    try {
        const { courseId, taskName, dueDate, additionalDetails } = req.body;
        
        // Validate input (you may add more validation as needed)
        if (!courseId || !taskName || !dueDate) {
            return res.status(400).json({ error: 'Course ID, task name, and due date are required' });
        }

        // Create a new task object
        const newTask = new Task({
            courseId,
            taskName,
            dueDate,
            additionalDetails
        });

        // Save the task to the database
        await newTask.save();

        res.status(201).json({ message: 'Task submitted successfully' });
    } catch (error) {
        console.error('Error submitting task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

