// CreateUserRoute.js
import express from 'express';
import { createUser } from '../controllers/CreateUserController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createUser);

export default router;
