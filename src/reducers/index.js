import authSlice from "reducers/authSlice";
import categoriesSlice from "reducers/categoriesSlice";
import ingredientsSlice from "reducers/ingredientsSlice";
import extraIngredientsSlice from "reducers/extraIngredientsSlice";

const rootReducer = {
  auth: authSlice,
  categories: categoriesSlice,
  ingredients: ingredientsSlice,
  extraIngredients: extraIngredientsSlice,
};

export default rootReducer;
