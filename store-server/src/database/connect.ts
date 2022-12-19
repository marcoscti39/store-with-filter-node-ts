import mongoose from "mongoose";
import dotenv from "dotenv";
import { Products } from "../models";
import { readProducts } from "../getProducts";

dotenv.config();

export const connectToMongoDB = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DB_ACCESS!);
  console.log("conected");
  const productsData = await readProducts();

  await Products.deleteMany();
  Products.insertMany(JSON.parse(productsData!), (err, docs) => {
    if (err) {
      return console.log(err);
    }
  });
};
