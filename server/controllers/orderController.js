const express = require("express");
const Order = require("../models/Order");

const placeOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const { cartItems, deliveryAddress, paymentMethod, totalPrice, deliveryFee } =
      req.body;
    const order = new Order({
      userId,
      cartItems,
      deliveryAddress,
      paymentMethod,
      totalPrice,
      deliveryFee,
    });
    const savedOrder = await order.save();

    res.status(201).json({ sucess: true, order: savedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ sucess: false, message: "Error placing the order" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const {userId}=req.params;
    const orders = await Order.find({userId}).populate('userId', 'name email'); 

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching orders' });
  }
};

const getSingleOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate('userId', 'name email').populate({
      path: 'cartItems.productId',
      select: 'name images color', 
    }); 

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching order' });
  }
};


module.exports = { placeOrder,getAllOrders,getSingleOrder};
