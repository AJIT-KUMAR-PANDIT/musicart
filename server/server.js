const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => {
  console.error.bind(console, "MongoDB Connection error:");
});
db.once("open", () => {
  console.log("Connected to MongoDB Database!");
});

app.use(cors());
app.use(bodyParser.json());

app.use("/api/items", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/feedback", feedbackRoutes);

app.get("/api/check", (req, res) => {
  res.status(200).send("Server is Working,you Can go ahead!");
});
app.listen(port, () => {
  console.log("Connected to Server!");
});
