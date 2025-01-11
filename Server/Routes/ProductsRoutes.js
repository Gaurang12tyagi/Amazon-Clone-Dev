import express from "express";
import {
  GetProducts,
  registerUser,
  loginUser,
  getIndividualProduct,
  addToCart,
  getCartDetails,
  getValidUser,
  logoutUser,
  removeItemFromCart,
} from "../Controller/ProductsApi.js";
import Authenticate from "../Middleware/Authenticate.js"

const router = express.Router();

router.get("/getProducts", GetProducts);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getproductsone/:id", getIndividualProduct);
router.post("/addcart/:id", Authenticate, addToCart);
router.get("/cartdetails", getCartDetails);
router.get("/validuser", getValidUser);
router.get("/logout", logoutUser);
router.get("/remove/:id", removeItemFromCart);

export default router;
