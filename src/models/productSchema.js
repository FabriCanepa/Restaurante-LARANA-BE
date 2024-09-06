import mongoose from 'mongoose';

const Product = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
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

export default mongoose.model('Products', Product);
