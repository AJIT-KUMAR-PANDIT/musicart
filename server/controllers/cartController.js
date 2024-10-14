const express = require("express");

const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { productId, quantity } = req.body;
    
    if (!userId || !productId) {
      return res.status(400).send("User ID or product ID is missing");
    }

  
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, cartItems: [], bill: 0 });
    }

    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

   
    const existingItem = cart.cartItems.find(
      (item) => item.productId.toString() === productId
    );

    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
     
      cart.cartItems.push({ productId, quantity });
    }

    
    cart.bill += product.price * quantity;

    
    cart = await cart.save();

    res.status(201).send(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate("cartItems.productId");

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching cart" });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { cartItems } = req.body;

    await Promise.all(
      cartItems.map(async (cartItem) => {
        const { productId, quantity } = cartItem;
        const updatedCartItem = await Cart.findOneAndUpdate(
          { "cartItems.productId": productId },
          { $set: { "cartItems.$.quantity": quantity } },
          { new: true }
        );

        console.log(updatedCartItem);
        if (!updatedCartItem) {
          console.log(`Cart item with productId ${productId} not found.`);
        }
      })
    );
    
    res.status(200).json({ success: true, message:'cart Item updated sucessfully' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error updating cart item quantity" });
  }
};

module.exports = { addToCart, getUserCart, updateCart };
