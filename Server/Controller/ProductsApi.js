import express from "express";
import mongoose from "mongoose";
import ProductsData from "../Constants/ProductsData.js";
import Products from "../Models/ProductSchema.js";
import UserSchema from "../Models/UserSchema.js";
const router = express.Router();

export const GetProducts = async () => {
  try {
    const producstdata = await ProductsData.find();
    console.log(producstdata + "data mila hain");
    return producstdata;
  } catch (error) {
    console.log("error" + error.message);
    throw error;
  }
};

export const registerUser = async (req, res) => {
  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    res.status(422).json({ error: "fill the all details" });
    console.log("bhai nathi present badhi details");
    return;
  }

  try {
    const preuser = await UserSchema.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "This email is already exist" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "password are not matching" });
    } else {
      const finaluser = new UserSchema({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });

      const storedata = await finaluser.save();
      res.status(201).json(storedata);
    }
  } catch (error) {
    console.log(
      "error the bhai catch ma for registratoin time" + error.message
    );
    res.status(422).send(error);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "fill the details" });
    return;
  }

  try {
    const userlogin = await UserSchema.findOne({ email: email });
    console.log(userlogin);

    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);
      console.log(isMatch);

      if (!isMatch) {
        res.status(400).json({ error: "invalid crediential pass" });
      } else {
        const token = await userlogin.generatAuthtoken();
        console.log(token);
// Yha par hum cookie generate karwayenge
        res.cookie("ecommerce", token, {
          expires: new Date(Date.now() + 2589000),
          httpOnly: true,
        });
        res.status(201).json(userlogin);
      }
    } else {
      res.status(400).json({ error: "UserSchema not exist" });
    }
  } catch (error) {
    res.status(400).json({ error: "invalid crediential pass" });
    console.log("error the bhai catch ma for login time" + error.message);
  }
};

 export const getIndividualProduct = async (id) => {
  try {
    const individual = await Products.findOne({ id: id });
    console.log(individual + "ind mila hai");
    return individual;
  } catch (error) {
    throw error;
  }
};

 export const addToCart = async (id, userID) => {
  try {
    console.log("perfect 6");
    const cart = await Products.findOne({ id: id });
    console.log(cart + "cart milta hain");

    const Usercontact = await UserSchema.findOne({ _id: userID });
    console.log(Usercontact + "UserSchema milta hain");

    if (Usercontact) {
      const cartData = await Usercontact.addcartdata(cart);
      await Usercontact.save();
      console.log(cartData + " thse save wait kr");
      console.log(Usercontact + "userjode save");
      return Usercontact;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCartDetails = async (userID) => {
  try {
    const buyuser = await UserSchema.findOne({ _id: userID });
    console.log(buyuser + "UserSchema hain buy pr");
    return buyuser;
  } catch (error) {
    console.log(error + "error for buy now");
    throw error;
  }
};

export const getValidUser = async (userID) => {
  try {
    const validuserone = await UserSchema.findOne({ _id: userID });
    console.log(validuserone + "UserSchema hain home k header main pr");
    return validuserone;
  } catch (error) {
    console.log(error + "error for valid UserSchema");
    throw error;
  }
};

export const logoutUser = async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });

    res.clearCookie("eccomerce", { path: "/" });
    req.rootUser.save();
    res.status(201).json(req.rootUser.tokens);
    console.log("UserSchema logout");
  } catch (error) {
    console.log(error + "jwt provide then logout");
    throw error;
  }
};

export const removeItemFromCart = async (id, userID) => {
  try {
    req.rootUser.carts = req.rootUser.carts.filter((curel) => {
      return curel.id != id;
    });

    req.rootUser.save();
    console.log("iteam remove");
    return req.rootUser;
  } catch (error) {
    console.log(error + "jwt provide then remove");
    throw error;
  }
};

