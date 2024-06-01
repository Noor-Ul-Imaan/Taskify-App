import express from 'express';
import { User } from '../models/CreateUserModel.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

// Middleware to ensure the user is authenticated
router.use(requireAuth);

// Route to get all users from the same organization as the logged-in user
router.get('/organization-users', async (req, res) => {
    try {
        const organizationName = req.user.organizationName;
        const users = await User.find({ organizationName }).select('username firstname lastname email');
        
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching organization users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});


router.get('/lower-level-users', async (req, res) => {
    const { level, organizationName } = req.user;
    try {
      const users = await User.find({
        'role.level': { $gte: level },
        organizationName
      }).select('username firstname lastname role.level');
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  });

export default router;
