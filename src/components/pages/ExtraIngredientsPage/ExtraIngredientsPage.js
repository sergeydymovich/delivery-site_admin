import React, { useEffect, useState } from "react";
import CreateExtraIngredientForm from "./CreateExtraIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import { getExtraIngredients } from "reducers/extraIngredientsSlice";
import {
  Box,
  Button,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ExtraIngredientsTable from "./ExtraIngredientsTable";

const useStyles = makeStyles((theme) => ({
  imageWrapper: {
    marginRight: "auto",
    marginLeft: "auto",
  },
  formWrapper: {
    height: "100px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }
}));

function ExtraIngredientsPage() {
  const ingredients = useSelector(
    (s) => s.extraIngredients.extraIngredientsArr
  );
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const toggleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getExtraIngredients());
    }
  }, [dispatch, ingredients.length]);

  return (
    <Container maxWidth="xl">
      <Box className={classes.formWrapper}>
        <Typography variant="h4" component="h2">
          Доп. ингредиенты
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
        {showForm && 
        <CreateExtraIngredientForm toggleShowForm={toggleShowForm} />
        }
      </Box>
      <ExtraIngredientsTable />
    </Container>
  );
}

export default ExtraIngredientsPage;
