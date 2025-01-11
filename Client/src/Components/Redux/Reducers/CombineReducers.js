import { ProductsReducer } from "./ProductReducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers
  ({
    getProductsData: ProductsReducer,
  });
export default rootReducer;
