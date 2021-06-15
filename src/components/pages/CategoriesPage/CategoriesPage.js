import React, { useEffect, useState } from "react";
import CreateCategoryForm from "./CreateCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "reducers/categoriesSlice";
import {
  Box,
  Button,
  Container,
  makeStyles,
} from "@material-ui/core";
import CategoriesTable from "./CategoriesTable";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    minHeight: "100px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

function CategoriesPage() {
  const categories = useSelector((s) => s.categories.categoriesArr);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const toggleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  useEffect(() => {
    if (!categories.length) {
      dispatch(getCategories());
    }
  }, [dispatch, categories.length]);

  return (
    <Container maxWidth="xl">
      <Box className={classes.formWrapper}>
        {!showForm && (
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={toggleShowForm}
          >
            Добавить категорию
          </Button>
        )}
        {showForm &&
          <CreateCategoryForm toggleShowForm={toggleShowForm} />
        }  
      </Box>
      <CategoriesTable />     
    </Container>
  );
}

export default CategoriesPage;
