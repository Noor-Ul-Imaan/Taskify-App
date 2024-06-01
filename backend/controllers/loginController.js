import { User } from '../models/CreateUserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    console.log('Login Request:', req.body);
  
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
      console.log('User Found:', user);
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid username' });
      }
  
    //   const isMatch = await bcrypt.compare(password, user.password);
    //   console.log('Password Match:', isMatch);
    if(password == user.password) {
      console.log('pwd matched:', password);

    }

    else {
      console.log('Not matched')
    }
    const pwd = await User.findOne({ password });
    console.log('pwd Found:', password);
  
    //   if (!isMatch) {
    //     return res.status(401).json({ message: 'Invalid password' });
    //   }
  
      const token = jwt.sign({ _id: user._id, username: user.username  }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
      res.status(200).json({ message: 'Login successful', token, user: { username: user.username, firstname: user.firstname, lastname: user.lastname, email: user.email, level:user.role.level, role:user.role.name} });
      console.log(user.username)
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  };
  
