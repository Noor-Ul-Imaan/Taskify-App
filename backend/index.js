import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose';
import { Task } from './models/taskModel.js'
import { Organization } from './models/OrgDetails.js'
import tasksRoute from './routes/tasksRoute.js'
import OrgDetailsRoute from './routes/OrgDetailsRoute.js'
import userRoute from './routes/userRoute.js'

import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';


import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

//Middleware for parsing request body
app.use(express.json());


app.use(cookieParser());

//Middleware for handling CORS POLICY. Allow all origins
const corsOptions = {
    origin: 'http://localhost:3000', // your frontend's origin
    credentials: true // this allows cookies to be sent from the frontend
  };
  
  app.use(cors(corsOptions));
// app.use(cors());

//for http requests
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to TASKIFY');
})

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

app.use('/tasks', tasksRoute);
app.use('/organizations', OrgDetailsRoute);
app.use('/user', userRoute);
app.use('/auth', authRoute);

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

console.log('Routes registered: /tasks, /organizations, /user');

