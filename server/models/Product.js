const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String },
  color: { type: String },
  features: { type: [String] },
  rating: { type: Number },
  numReviews: { type: Number },
  price: { type: Number },
  availability: { type: String },
  images: { type: [String] }
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;
