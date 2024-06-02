// OrgDetailsRoute.js
import express from 'express';
import { Organization } from '../models/OrgDetails.js';
import bcrypt from 'bcrypt';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/roles', authMiddleware, async (req, res) => {
  try {
    const organization = req.organization;
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.status(200).json({ roles: organization.roles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
router.put('/:id/change-password', async (request, response) => {
  try {
    const { id } = request.params;
    const { currentPassword, newPassword } = request.body;
    const organization = await Organization.findById(id);

    if (!organization) {
      return response.status(404).json({ message: 'Organization not found' });
    }

    const isPasswordMatch = await bcrypt.compare(currentPassword, organization.password);

    if (!isPasswordMatch) {
      return response.status(400).json({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    organization.password = hashedPassword;
    await organization.save();

    return response.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error.message);
    return response.status(500).json({ message: 'Internal server error' });
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
