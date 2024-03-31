import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    orders: { type: Array, default: [] },
    feedbacks: { type: Array, default: [] },
    cart: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("MusicArtUser", userSchema);

export default User;
