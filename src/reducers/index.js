import authSlice from "reducers/authSlice";
import productsSlice from 'reducers/productsSlice';
import ordersSlice from 'reducers/ordersSlice';
import categoriesSlice from "reducers/categoriesSlice";
import ingredientsSlice from "reducers/ingredientsSlice";
import extraIngredientsSlice from "reducers/extraIngredientsSlice";
import pizzaSizesSlice from "./pizzaSizesSlice";
import { combineReducers } from "redux";

const reducer = {
  auth: authSlice,
  orders: ordersSlice,
  products: productsSlice,
  categories: categoriesSlice,
  ingredients: ingredientsSlice,
  extraIngredients: extraIngredientsSlice,
  pizzaSizes: pizzaSizesSlice,
};

const rootReducer = combineReducers(reducer);

export default rootReducer;
