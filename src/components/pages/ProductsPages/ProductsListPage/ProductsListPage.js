import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "reducers/categoriesSlice";
import { getIngredients } from "reducers/ingredientsSlice";
import { getExtraIngredients } from "reducers/extraIngredientsSlice";

function ProductsListPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
    dispatch(getExtraIngredients());
  }, [dispatch]);

  return (
    <Link to="/products/create">
      <Button variant="contained" size="large" color="primary">
        Добавить продукт
      </Button>
    </Link>
  );
}

export default ProductsListPage;
