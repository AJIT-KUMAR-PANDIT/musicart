import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    colour: { type: String, required: true },
    useType: { type: String, required: true },
    quantity: { type: Number, required: true },

    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("MusicArtProduct", productSchema);

export default Product;
