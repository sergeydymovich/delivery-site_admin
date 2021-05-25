import authSlice from "reducers/authSlice";
import categoriesSlice from "reducers/categoriesSlice";

const rootReducer = {
  auth: authSlice,
  categories: categoriesSlice,
};

export default rootReducer;
