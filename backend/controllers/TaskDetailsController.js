import { Task } from "../models/taskModel.js"; // Import the Task model

export const getTasksByUser = async (req, res) => {
  try {
    const username = req.params.username; // Get username from request parameter
    const userTasks = await Task.find({ assignedTo: username }); // Find tasks assigned to the user

    res.status(200).json({ success: true, data: userTasks }); // Send successful response with user tasks
  } catch (error) {
    console.error("Error fetching user tasks:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching user tasks" }); // Send error response
  }
};
