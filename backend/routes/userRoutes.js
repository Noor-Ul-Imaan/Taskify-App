// routes/userRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/CreateUserModel.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.use(requireAuth);

router.put('/users/:id', async (req, res) => {
  const { firstName, lastName, email, userName } = req.body;
  console.log('PUT /users/:id called with:', req.body, 'User ID:', req.params.id);

  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      firstname: firstName,
      lastname: lastName,
      email: email,
      username: userName,
    }, { new: true });

    if (user) {
      console.log('User updated:', user);
      res.status(200).json({ success: true, user });
    } else {
      console.log('User not found with ID:', req.params.id);
      res.status(404).json({ success: false, message: "User not found." });
    }
  } catch (error) {
    console.error("Error updating user info:", error);
    res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
  }
});

router.put('/users/:id/password', async (req, res) => {
  const { newPassword } = req.body;
  console.log('PUT /users/:id/password called with:', req.body, 'User ID:', req.params.id);

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findByIdAndUpdate(req.params.id, {
      password: hashedPassword,
    }, { new: true });

    if (user) {
      console.log('Password updated for user:', user);
      res.status(200).json({ success: true });
    } else {
      console.log('User not found with ID:', req.params.id);
      res.status(404).json({ success: false, message: "User not found." });
    }
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
  }
});

router.delete('/users/:id', async (req, res) => {
  console.log('DELETE /users/:id called with User ID:', req.params.id);
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      console.log('User deleted:', user);
      res.status(200).json({ success: true });
    } else {
      console.log('User not found with ID:', req.params.id);
      res.status(404).json({ success: false, message: "User not found." });
    }
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
  }
});

export default router;
