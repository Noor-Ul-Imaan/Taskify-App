import express from 'express';
import { Task } from '../models/taskModel.js';
import { User } from '../models/CreateUserModel.js';
import mongoose from 'mongoose';
import { requireAuth } from '../middleware/requireAuth.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Require auth for all task routes
router.use(requireAuth);

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

router.get('/organization-users', async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const users = await User.find({
            organizationName: user.organizationName,
            'role.level': { $gte: user.role.level }
        }).select('firstname lastname username');

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Route for updating a task's submission status
router.put('/:id/submit', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Ensure only the assigned user can submit the task
        if (task.assignedTo !== req.user.username) {
            return res.status(403).json({ message: 'You are not authorized to submit this task' });
        }

        task.isSubmitted = true;
        await task.save();

        res.status(200).json({ message: 'Task submitted successfully' });
    } catch (error) {
        console.error('Error submitting task:', error);
        res.status(500).json({ message: 'Error submitting task' });
    }
});

// Route for submitting a task with file attachments and comments
router.post('/:id/submit', upload.single('file'), async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const file = req.file ? req.file.path : null;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Ensure only the assigned user can submit the task
        if (task.assignedTo !== req.user.username) {
            return res.status(403).json({ message: 'You are not authorized to submit this task' });
        }

        task.attachments = file;
        task.comment = comment;
        task.isSubmitted = true;
        await task.save();

        res.status(200).json({ message: 'Task submitted successfully' });
    } catch (error) {
        console.error('Error submitting task:', error);
        res.status(500).json({ message: 'Error submitting task', error });
    }
});

// Route for saving a new task
router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.assignedTo || !req.body.assignedBy) {
            return res.status(400).send({
                message: 'Send all required fields: title, assignedTo and assignedBy'
            });
        }
        const newTask = {
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline,
            assignedTo: req.body.assignedTo,
            assignedBy: req.body.assignedBy,
            user_id: req.user._id,
        };
        const task = await Task.create(newTask);
        return res.status(201).send(task);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for getting tasks assigned to the current user
router.get('/', async (req, res) => {
    const username = req.user.username;
    try {
        const tasks = await Task.find({ assignedTo: username });
        res.status(200).json({ count: tasks.length, data: tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

// Route for getting a task by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        return res.status(200).json(task);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for updating a task
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.assignedTo || !req.body.assignedBy) {
            return res.status(400).send({
                message: 'Send all required fields: title, assignedTo and assignedBy'
            });
        }
        const { id } = req.params;
        const result = await Task.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).send({ message: 'Task updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for deleting a task
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Task.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).send({ message: 'Task deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;
