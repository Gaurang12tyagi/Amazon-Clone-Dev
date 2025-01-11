import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import ProductsSchema from "./Models/ProductSchema.js";
import DefaultData from "./DefaultData.js";
import ProuductRoutes from "./Routes/ProductsRoutes.js";
import cookieParser from "cookie-parser";
const app = express();
const PORT = 5000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json());
app.use(ProuductRoutes);
app.use(cookieParser(""));

const CONNECTION_URL =
  "mongodb+srv://GaurangTyagi95:gaurang_mongodb@cluster0.bba8orh.mongodb.net/Amazonweb?retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
  })
  .then(({ data }) => {
    console.log("Connection succesfully");

    app.listen(PORT, () => {
      console.log(`Server Running on Port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });
DefaultData();
