
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

app.post('/tasks', async (request, response) => {
    try {
        if (
            !request.body.title ||
            // !request.body.description ||
            // !request.body.deadline ||
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

// Function to generate roles for an organization
function generateRoles(numberOfLevels) {
    const roles = [];
    for (let i = 1; i <= numberOfLevels; i++) {
        roles.push({ name: `Role ${i}`, description: `Description for Role ${i}` });
    }
    return roles;
}

// Create a new organization
const newOrganization = new Organization({
    name: 'Primark',
    type: 'Service Industry',
    numberOfLevels: 2,
    roles: generateRoles(numberOfLevels) // Generate roles based on the number of levels
});

// Save the organization to the database
newOrganization.save().then(() => {
    console.log('Organization saved successfully');
}).catch(err => {
    console.error('Error saving organization:', err);
});

// Query organizations from the database
Organization.find().then(organizations => {
    console.log('Organizations:', organizations);
}).catch(err => {
    console.error('Error querying organizations:', err);
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