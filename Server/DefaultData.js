import ProductsData from "../server/Constants/ProductsData.js";
import ProductsSchema from "./Models/ProductSchema.js";

const DefaultData = async () => {
  try {
    const storeData = await ProductsSchema.insertMany(ProductsData);
  
  } catch (error) {
    console.log("ERROR IS : ", error.message);
  }
};

export default DefaultData;
