const express = require("express");
const { addToCart, getUserCart,updateCart } = require("../controllers/cartController");

const router = express.Router();

router.post("/addtoCart/:userId", addToCart);
router.get("/userCart/:userId", getUserCart);
router.put("/updateCart/:userId",updateCart);


module.exports = router;
