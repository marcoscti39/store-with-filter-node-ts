import { connectToMongoDB } from "./database/connect";

import express from "express";
import cors from "cors";
import { Products } from "./models";

const app = express();

const PORT = 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

connectToMongoDB();

interface queryObjectTypes {
  name?: RegExp;
  price?: { $lte: string };
  company?: string;
}

app.get("/api/v1/get-all-products", async (req, res) => {
  const queryObject: queryObjectTypes = {};

  if (req.query?.name) {
    queryObject.name = new RegExp(`${req.query.name}`, "gi");
  }

  if (req.query?.price) {
    queryObject.price = { $lte: req.query.price as string };
  }

  if (req.query?.company) {
    req.query.company === "all"
      ? ""
      : (queryObject.company = req.query.company as string);
  }

  if (req.query?.sortby) {
    if (req.query.sortby === "highest") {
      res.json(await Products.find(queryObject).sort({ price: -1 }));
      return;
    }
    if (req.query.sortby === "lowest") {
      res.json(await Products.find(queryObject).sort({ price: 1 }));
      return;
    }
    if (req.query.sortby === "A-Z") {
      res.json(await Products.find(queryObject).sort({ name: 1 }));
      return;
    }

    if (req.query.sortby === "Z-A") {
      res.json(await Products.find(queryObject).sort({ name: -1 }));
      return;
    }
    return;
  }
  res.json(await Products.find(queryObject));
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
