import { User } from '../models/CreateUserModel.js';
import { Organization } from '../models/OrgDetails.js';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, roleId, password } = req.body; // Include password in the request body
    const organization = req.organization;

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    const role = organization.roles.id(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    const username = `${firstname}${lastname}${Math.floor(Math.random() * 1000)}`;

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the generated password

    const newUser = new User({
      firstname,
      lastname,
      email,
      organizationName: organization.name,
      role: { name: role.name, level: role.level },
      username,
      password: hashedPassword, // Save the hashed password to the database
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', username, plainPassword: password });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
