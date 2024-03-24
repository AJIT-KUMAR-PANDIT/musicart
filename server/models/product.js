const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  reviewCount: {
    type: Number,
    required: true,
  },
  about: {
    type: Array,
    required: true,
  },
  available: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  headphoneType: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: false,
  },
  featured: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
