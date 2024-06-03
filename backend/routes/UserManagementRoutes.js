// routes/UserManagementRoutes.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getUsersByOrganization } from "../controllers/UserManagementController.js";

const router = express.Router();

router.get("/users", authMiddleware, getUsersByOrganization);

export default router;
