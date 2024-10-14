const express = require("express");
const { placeOrder, getAllOrders, getSingleOrder } = require("../controllers/orderController");

const router = express.Router();

router.post("/placeOrder/:userId", placeOrder);
router.get('/allorders/:userId',getAllOrders)
router.get('/getorder/:orderId',getSingleOrder);

module.exports = router;
