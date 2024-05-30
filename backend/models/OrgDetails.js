import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  }
});

const organizationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  
  name: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  numberOfLevels: {
    type: Number,
    required: true
  },

  roles: [roleSchema]

}, {
  timestamps: true
});

organizationSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: '3d'
  });
  return token;
};

organizationSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export const Organization = mongoose.model('Organization', organizationSchema);
