import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose';
import {Task} from './models/taskModel.js'

const app = express();

//Middleware for parsing request body
app.use(express.json());

//for http requests
app.get('/', (request, response)=> {
    console.log(request);
    return response.status(234).send('Welcome to TASKIFY');
})

//Route for Save a new task
app.post('/tasks', async (request, response)=>{
    try {
        if(
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
        response.status(500).send({message: error.message});
    }
});


//Route for get all tasks from databse
z

//Route for get all tasks from databse
app.get('/tasks', async (request, response) => {
    try {
        const tasks = await Task.find({});
        return response.status(200).json({
            count: tasks.length,
            data: tasks
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


//mongoose connection
mongoose 
.connect(mongoDBURL)
.then(() => {
    console.log('App connected to DATABASE');
    app.listen(PORT, () => {
        console.log(`Now listening on port ', ${PORT}`);
    });
})
.catch((error) => {
    console.log(error)
});


// "test": "echo \"Error: no test specified\" && exit 1",
// package.json
// // Route for retrieving all tasks
// app.get('/tasks', async (request, response) => {
//     try {
//       const tasks = await Task.find({}); // Find all tasks
//       return response.status(200).send(tasks);
//     } catch (error) {
//       console.log(error.message);
//       response.status(500).send({ message: 'Error fetching tasks' });
//     }
//   });