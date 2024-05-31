import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  organizationName: { type: String, required: true },
  role: {
    name: { type: String, required: true },
    level: { type: String, required: true }
  },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = mongoose.model('User', userSchema);
