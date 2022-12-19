import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  featured: Boolean,
  company: String,
});

export const Products = mongoose.model("Products", productSchema);
