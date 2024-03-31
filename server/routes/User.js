import express from "express";
import {
  addFeedBacks,
  deleteUserAccount,
  getUser,
  loginUser,
  registerUser,
} from "../Controller/user.js";
import { varifyToken } from "../Authentication/vairifyUserToken.js";

const router = express.Router();

router
  .post("/add/feedback", varifyToken, addFeedBacks)
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/get", varifyToken, getUser)
  .delete("/delete/user", varifyToken, deleteUserAccount);
export default router;
