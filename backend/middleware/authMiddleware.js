import jwt from 'jsonwebtoken';
import { Organization } from '../models/OrgDetails.js';

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.organization = await Organization.findById(decoded._id);
    next();
  } catch (error) {
    return res.status(400).send({ message: 'Invalid token' });
  }
};

export default authMiddleware;
