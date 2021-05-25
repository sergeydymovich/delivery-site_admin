import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";

function ProductsListPage() {
  return (
    <Link to="/products/create">
      <Button variant="contained" size="large" color="primary">
        Добавить продукт
      </Button>
    </Link>
  );
}

export default ProductsListPage;
