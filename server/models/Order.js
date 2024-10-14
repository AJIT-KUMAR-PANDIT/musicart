const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', // Reference to the User model
    required: true,
  },
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products', // Reference to the Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  productDetails: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
      },
      name: { type: String },
      image: { type: String }, // URL of the image
      color: { type: String },
    },
  ],
  deliveryAddress: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'UPI', 'Card'],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  deliveryFee: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Orders', orderSchema);

module.exports = Order;
