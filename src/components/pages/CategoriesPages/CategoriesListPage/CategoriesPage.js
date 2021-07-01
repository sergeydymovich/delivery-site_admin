import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "reducers/categoriesSlice";
import { getFields } from "reducers/fieldsSlice";
import {
  Box,
  Button,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CategoriesTable from "./CategoriesTable";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    height: "100px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

function CategoriesPage() {
  const categories = useSelector((state) => state.categories.categoriesArr);
  const fields = useSelector(state => state.fields.fieldsArr);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getCategories());

    if (!fields.length) {
      dispatch(getFields());
    }
  }, [dispatch, fields.length]);

  return (
    <Container maxWidth="xl">
      <Box className={classes.formWrapper}>
        <Typography variant="h4" component="h2">
            Категории
        </Typography>
        <Link className={classes.link} to="/categories/create">
          <Button variant="contained" size="large" color="primary">
            Добавить категорию
          </Button>
        </Link>
      </Box>
      <CategoriesTable />     
    </Container>
  );
}

export default CategoriesPage;
