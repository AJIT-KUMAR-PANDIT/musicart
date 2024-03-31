import express from "express";

import { varifyToken } from "../Authentication/vairifyUserToken.js";
import {
  addMultipleProductsToOrder,
  addToOrder,
  deleteAllOrders,
  deleteFromOrder,
} from "../Controller/order.js";

const router = express.Router();

router
  .post("/add/single/order", varifyToken, addToOrder)
  .post("/add/multiple/orders", varifyToken, addMultipleProductsToOrder)
  .post("/delete/single/order", varifyToken, deleteFromOrder)
  .delete("/delete/all/orders", varifyToken, deleteAllOrders);

export default router;
