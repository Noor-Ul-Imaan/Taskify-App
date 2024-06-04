// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { PORT, mongoDBURL } from "./config.js";
import tasksRoute from "./routes/tasksRoute.js";
import OrgDetailsRoute from "./routes/OrgDetailsRoute.js";
import path from 'path';

import { fileURLToPath } from 'url';
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import CreateUserRoute from "./routes/CreateUserRoute.js";
import authMiddleware from "./middleware/authMiddleware.js";
import loginRoute from "./routes/loginRoute.js";
import UserManagementRoute from "./routes/UserManagementRoutes.js";
import DeleteUserRoutes from "./routes/DeleteUserRoute.js";
import userRoutes from './routes/userRoutes.js';

import TaskDetailsRoutes from "./routes/TaskDetailsRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

//Middleware for handling CORS POLICY. Allow all origins
// const corsOptions = {
//   origin: 'http://localhost:3000', // your frontend's origin
//   credentials: true // this allows cookies to be sent from the frontend
// };

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use('./uploads', express.static("files"))

app.use("/tasks", tasksRoute);
app.use("/organizations", OrgDetailsRoute);
// app.use("/user", userRoute);
app.use("/auth", authRoute);
// app.use("/create", CreateUserRoute);

app.use("/users", userRoute);
app.use("/api", UserManagementRoute);

app.use("/api/user/login", loginRoute);

app.use("/api/user", CreateUserRoute);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api", DeleteUserRoutes);

app.use('/settings', userRoutes);


app.use("/api/tasks", TaskDetailsRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to TASKIFY");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to DATABASE");
    app.listen(PORT, () => {
      console.log(`Now listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

console.log(
  "Routes registered: /tasks, /organizations, /user, /auth, /api/user"
);
