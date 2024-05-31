import express from "express";
import { createUser } from "../controllers/CreateUserController.js";

const router = express.Router();

router.post("/create-user", createUser);

export default router;
