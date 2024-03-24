const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    unique: false,
  },
  cart: {
    type: Array,
    required: false,
    unique: false,
  },
  orders: {
    type: Array,
    required: false,
    unique: false,
  },
});

module.exports = mongoose.model("User", userSchema);
