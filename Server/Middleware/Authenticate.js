import jwt from "jsonwebtoken";
import UserSchema from "../Models/UserSchema.js";

const keysecret = process.env.KEY;

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.eccomerce;

    const verifyToken = jwt.verify(token, keysecret);

    const rootUser = await UserSchema.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User Not Found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (error) {
    res.status(401).send("Unauthorized: No token provided");
    console.log(error);
  }
};

export default Authenticate;
