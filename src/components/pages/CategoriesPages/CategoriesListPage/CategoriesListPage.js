import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";

function CategoriesListPage() {
  return (
    <Link to="/categories/create">
      <Button variant="outlined" color="primary">
        Добавить категорию
      </Button>
    </Link>
  );
}

export default CategoriesListPage;
