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
    cost: {
      type: Number,  
      required: true,
    },
    ingredients: {
      type: String,  
      required: true,
    },
    quantity: {
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
