import authSlice from "reducers/authSlice";
import productsSlice from 'reducers/productsSlice';
import categoriesSlice from "reducers/categoriesSlice";
import ingredientsSlice from "reducers/ingredientsSlice";
import extraIngredientsSlice from "reducers/extraIngredientsSlice";
import { combineReducers } from "redux";

const reducer = {
  auth: authSlice,
  products: productsSlice,
  categories: categoriesSlice,
  ingredients: ingredientsSlice,
  extraIngredients: extraIngredientsSlice,
};

const rootReducer = combineReducers(reducer);

export default rootReducer;
