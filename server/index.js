import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./Routes/User.js";
import { connectDB } from "./config/connectDB.js";
import productRouter from "./Routes/Product.js";
import cartRouter from "./Routes/cart.js";
import orderRouter from "./Routes/order.js";
dotenv.config();
const server = express();
server.use(express.json());
server.use(cors());
connectDB();

server.use("/api/v1/user", userRouter);
server.use("/api/v1/products", productRouter);
server.use("/api/v1/cart", cartRouter);
server.use("/api/v1/order", orderRouter);

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
