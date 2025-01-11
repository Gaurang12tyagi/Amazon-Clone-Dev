import { getProducts } from "../Actions/Action";
const products = [];
export const ProductsReducer = (state = { products }, action) => {
  switch (action.type) {
    case "SUCCESS_PRODUCT_FETCHED":
      return { products: action.payload };
    case "FAILED_PRODUCT_FETCHED":
      return { products: action.payload };
    default:
      return state;
  }
};
