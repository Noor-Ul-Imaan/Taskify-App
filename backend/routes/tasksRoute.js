import express from 'express';
import { Task } from '../models/taskModel.js';

import {requireAuth} from '../middleware/requireAuth.js';


const router =  express.Router();

// require auth for all workout routes
router.use(requireAuth)


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
router.get('/', async (request, response) => {
    try {
        const tasks = await Task.find({});
        return response.status(200).json({
            count: tasks.length,
            data: tasks
        });
    }
    catch (error){ 
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});


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