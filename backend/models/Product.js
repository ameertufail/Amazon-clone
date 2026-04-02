const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: 0,
  },
  mrp: {
    type: Number,
    min: 0,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true,
  },
  rating: {
    rate: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  isPrime: {
    type: Boolean,
    default: false,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  brand: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
