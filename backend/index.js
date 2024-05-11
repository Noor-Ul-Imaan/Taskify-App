import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose';
import { Task } from './models/taskModel.js'
import { Organization } from './models/OrgDetails.js'
import tasksRoute from './routes/tasksRoute.js'
import cors from 'cors';
const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
//Allow all origins
// app.use(cors());
//Allow custon origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );


//for http requests
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to TASKIFY');
})

app.use('/tasks', tasksRoute);



//Route for updating a task
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



//Route for saving a new organization
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


