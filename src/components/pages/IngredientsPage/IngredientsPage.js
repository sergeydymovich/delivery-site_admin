import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "reducers/ingredientsSlice";
import {
  Box,
  Button,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import IngredientsTable from "components/pages/IngredientsPage/IngredientsTable";
import CreateIngredientForm from "components/pages/IngredientsPage/CreateIngredientForm";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    height: "100px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

function IngredientsPage() {
  const ingredients = useSelector((s) => s.ingredients.ingredientsArr);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const toggleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients.length]);

  return (
    <Container maxWidth="xl">
      <Box className={classes.formWrapper}>
        <Typography variant="h4" component="h2">
          Ингредиенты
        </Typography>
        {!showForm && (
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={toggleShowForm}
          >
            Добавить ингредиент
          </Button>
        )}
        {showForm && <CreateIngredientForm toggleShowForm={toggleShowForm} />}
      </Box>
      <IngredientsTable />
    </Container>
  );
}

export default IngredientsPage;
