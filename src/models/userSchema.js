import mongoose from 'mongoose';

const User = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: Boolean,
  isAdmin: Boolean,
});

export default mongoose.model('Users', User);
