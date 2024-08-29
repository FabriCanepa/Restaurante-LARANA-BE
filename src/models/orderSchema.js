import mongoose from 'mongoose';

const Order = new mongoose.Schema({
  productsOrdered: [{
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    isAvailable: Boolean,
  }],
  userId: {
    type: String,
    required: true,
  },
  isActive: Boolean,
});

export default mongoose.model('Orders', Order);