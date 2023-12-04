import mongoose from 'mongoose';

const Cart = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  isAvailable: Boolean,
  isActive: Boolean,
});

export default mongoose.model('cart', Cart);
