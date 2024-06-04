import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getTotalUsers } from "../controllers/AdminPannelUsersController.js";

const router = express.Router();

// router.get("/count", getTotalUsers);
router.get("/users/count", authMiddleware, getTotalUsers);
export default router;
