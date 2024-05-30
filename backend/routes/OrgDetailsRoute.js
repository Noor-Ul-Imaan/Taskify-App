import express from 'express';
import { Organization } from '../models/OrgDetails.js';
import bcrypt from 'bcrypt';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', authMiddleware, async (req, res) => {
  res.status(200).send(req.organization);
});

router.get('/', async (request, response) => {
  try {
    const organizations = await Organization.find({});
    return response.status(200).json({
      count: organizations.length,
      data: organizations
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const organization = await Organization.findById(id);
    return response.status(200).json(organization);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const updatedOrganization = await Organization.findByIdAndUpdate(id, request.body, { new: true });

    if (!updatedOrganization) {
      return response.status(404).json({ message: 'Organization not found' });
    }

    return response.status(200).send({ message: 'Organization Updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const deletedOrganization = await Organization.findByIdAndDelete(id);

    if (!deletedOrganization) {
      return response.status(404).json({ message: 'Organization not found' });
    }

    return response.status(200).send({ message: 'Organization deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.post('/', async (request, response) => {
  try {
    const { email, password, name, type, roles } = request.body;

    if (!email || !password || !name || !type || !roles) {
      return response.status(400).send({
        message: 'Send all required fields: name, type, roles, email, and password'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newOrganization = new Organization({
      email,
      password: hashedPassword,
      name,
      type,
      roles
    });

    const savedOrganization = await newOrganization.save();
    return response.status(201).send(savedOrganization);
  } catch (error) {
    console.error('Error saving organization:', error.message);
    return response.status(500).send({ message: 'Internal server error' });
  }
});

export default router;
