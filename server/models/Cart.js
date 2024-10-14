const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    cartItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    bill: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Cart = mongoose.model('Carts', CartSchema);
module.exports = Cart;