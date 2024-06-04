import express from "express"; // Import express using destructuring
import { deleteUser } from "../controllers/DeleteUserController.js"; // Import deleteUser function

const router = express.Router();

router.delete("/users/:id", deleteUser);

export default router; // Use export default for single export
