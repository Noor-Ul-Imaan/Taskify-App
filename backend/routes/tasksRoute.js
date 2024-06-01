import express from 'express';
import { Task } from '../models/taskModel.js';
import { User } from '../models/CreateUserModel.js';

import mongoose from 'mongoose';
import {requireAuth} from '../middleware/requireAuth.js';


const router =  express.Router();

// require auth for all workout routes
router.use(requireAuth)


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
  
  


//Route for Save a new task
router.post('/', async (request, response)=>{
    try {
        if (
            !request.body.title ||
            !request.body.assignedTo ||
            !request.body.assignedBy
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, assignedTo and assignedBy'
            });
        }
        const newTask = {
            title: request.body.title,
            description: request.body.description,
            deadline: request.body.deadline,
            assignedTo: request.body.assignedTo,
            assignedBy: request.body.assignedBy,
            user_id: request.user._id,
        };
        const task = await Task.create(newTask);
        return response.status(201).send(task);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//Route for getting one task
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
// router.get('/', async (request, response) => {
//     const user_id = request.user._id
//     try {
//         const tasks = await Task.find({ user_id });
//         return response.status(200).json({
//             count: tasks.length,
//             data: tasks
//         });
//     }
//     catch (error){ 
//         console.log(error.message);
//         response.status(500).send({message: error.message})
//     }
// });


//Route for getting a task by id
router.get('/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const task = await Task.findById(id);
        return response.status(200).json(task);
    }
    catch (error){ 
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});


//Route for updating a task
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.assignedTo ||
            !request.body.assignedBy
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, assignedTo and assignedBy'
            });
        }
        const {id} = request.params;
        const result = await Task.findByIdAndUpdate(id, request.body);

        if(!result) {
            return response.status(404).json({message: 'Task not found'});
        }
     
        return response.status(200).send({message: 'Task Updated succesfully'});
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//Route for deleting a book
router.delete('/:id', async (request, response) => {
    try {
        const {id } = request.params;
        const result = await Task.findByIdAndDelete(id);
        if(!result) {
            return response.status(404).json({message: 'Task not found'});
        }
        return response.status(200).send({message: 'Task deleted successfully'});
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

export default router;