import express from "express";
import { getTasksByUser } from "../controllers/TaskDetailsController.js"; // Import the controller function

const router = express.Router();

router.get("/user/:username", getTasksByUser); // Define route to get tasks for a user

export default router; // Export the router
