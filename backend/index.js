import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose';
import { Task } from './models/taskModel.js'
import { Organization } from './models/OrgDetails.js'

const app = express();

//Middleware for parsing request body
app.use(express.json());

//for http requests
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to TASKIFY');
})

//Route for Save a new task

app.post('/tasks', async (request, response)=>{
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
app.get('/tasks', async (request, response) => {
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
app.get('/tasks/:id', async (request, response) => {
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



app.get('/organizations', async (request, response) => {
    try {
        const organization = await Organization.find({});

        return response.status(200).json({
            count: organization.length,
            data: organization
        });

    }
    catch (error){ 
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});


app.post('/organizations', async (request, response) => {
    try {
        // Extract organization data from request body
        const { name, type, numberOfLevels, roles } = request.body;

        // Validate required fields
        if (!request.body.name || !request.body.type || !request.body.numberOfLevels || !request.body.roles) {
            return response.status(400).send({
                message: 'Send all required fields: name, type, numberOfLevels, and roles'
            });
        }

        // Create new organization object
        const newOrganization = new Organization({
            name: request.body.name,
            type: request.body.type,
            numberOfLevels: request.body.numberOfLevels,
            roles: request.body.roles
        });

        // Save organization to the database
        //await newOrganization.save();
        const organization = await Organization.create(newOrganization);

        return response.status(201).send(newOrganization);
    } catch (error) {
        console.error('Error saving organization:', error);
        return response.status(500).send({ message: 'Internal server error' });
    }
});


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