import { Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";

const useStyles = makeStyles((theme) => ({
  addBtn: {
    // backgroundColor: "#81c784",
  },
}));

function ProductsListPage() {
  const classes = useStyles();
  return (
    <Link to="/products/create">
      <Button className={classes.addBtn} variant="outlined" color="primary">
        Добавить продукт
      </Button>
    </Link>
  );
}

export default ProductsListPage;
