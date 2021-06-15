import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "reducers/categoriesSlice";
import { getIngredients } from "reducers/ingredientsSlice";
import { getExtraIngredients } from "reducers/extraIngredientsSlice";
import { getProducts } from "reducers/productsSlice";
import { Box, Button, Container, makeStyles } from "@material-ui/core";
import ProductsTable from "./ProductsTable";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  linkWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignContent: 'center',
    marginBottom: '20px',
    marginTop: '20px',
  },
}));

function ProductsListPage() {
  const activeProductsPage = useSelector(state => state.products.requestOptions.activePage);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getIngredients());
    dispatch(getExtraIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  },[activeProductsPage, dispatch])

  return (
    <Container  maxWidth="xl">
      <Box className={classes.linkWrapper}>
        <Link className={classes.link} to="/products/create">
          <Button variant="contained" size="large" color="primary">
            Добавить продукт
          </Button>
        </Link>
      </Box>

      <ProductsTable />
    </Container>

  );
}

export default ProductsListPage;
