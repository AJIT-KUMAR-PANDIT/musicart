import express from "express";

import { varifyToken } from "../Authentication/vairifyUserToken.js";
import {
  addToCart,
  increaseQuantity,
  removeAllFromCart,
  removeFromCart,
} from "../Controller/cart.js";
const router = express.Router();

router
  .post("/add/product", varifyToken, addToCart)
  .post("/increase/qty", varifyToken, increaseQuantity)
  .delete("/delete/all", varifyToken, removeAllFromCart)
  .post("/remove/product", varifyToken, removeFromCart);

export default router;
