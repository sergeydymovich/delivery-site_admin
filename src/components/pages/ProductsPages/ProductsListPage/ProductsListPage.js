import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "reducers/categoriesSlice";
import { getIngredients } from "reducers/ingredientsSlice";
import { getExtraIngredients } from "reducers/extraIngredientsSlice";
import { getProducts, changeFilterWord } from "reducers/productsSlice";
import { Box, Button, Container, makeStyles, TextField } from "@material-ui/core";
import ProductsTable from "./ProductsTable";
import { Link } from "react-router-dom";
import { debounce } from 'throttle-debounce';

const useStyles = makeStyles((theme) => ({
  searchWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: '20px',
    marginTop: '20px',
  },
}));

function ProductsListPage() {
  const activeProductsPage = useSelector(state => state.products.requestOptions.activePage);
  const filterWord = useSelector(state => state.products.requestOptions.filterWord);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChangeFilterWord = (e) => {
    dispatch(changeFilterWord(e.target.value.trim()));
  }

  const debounceFunc = debounce(700, handleChangeFilterWord);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getIngredients());
    dispatch(getExtraIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  },[activeProductsPage, filterWord, dispatch])

  return (
    <Container  maxWidth="xl">
      <Box className={classes.searchWrapper}>
      <TextField
        onChange={debounceFunc}
        label="Поиск продуктов"
        type="search"
        variant="outlined"
        size='small'
      />
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
