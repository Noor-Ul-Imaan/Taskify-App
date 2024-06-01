import { User } from '../models/CreateUserModel.js';
import { Organization } from '../models/OrgDetails.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import fs from 'fs';

// Function to read the email template file
const readEmailTemplate = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./email-template.html', 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

// Function to send email
const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'queries.taskify@gmail.com', // Your Gmail email address
      pass: 'daamuokevjmtxlxq' // Your Gmail password
    }
  });

  try {
    await transporter.sendMail({
      from: 'queries.taskify@gmail.com',
      to,
      subject,
      html
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};


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

    // const hashedPassword = await bcrypt.hash(password, 10); // Hash the generated password
    // const salt = await bcrypt.genSalt();
    // const  hashedPassword = await bcrypt.hash(password.trim(), salt);

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

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

    // Read email template file
    const emailTemplate = await readEmailTemplate();

    // Replace placeholders with actual values
    const emailHtml = emailTemplate.replace('{{username}}', username).replace('{{password}}', password);

    // Send email with generated username and password
    await sendEmail(email, 'Your Taskify Credentials', emailHtml);
    
    res.status(201).json({ message: 'User created successfully', username, plainPassword: password });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
