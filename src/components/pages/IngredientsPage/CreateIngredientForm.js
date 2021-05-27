import {
  Button,
  Container,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import React, { useState } from "react";
import { fetchAddIngredient } from "api/api";
import { addIngredient } from "reducers/ingredientsSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    minHeight: "100px",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginRight: "15px",
  },
  closeBtn: {
    marginRight: "10px",
  },
}));

function CreateIngredientForm() {
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchAddIngredient(name)
      .then((res) => {
        const { ingredient } = res.data;
        dispatch(addIngredient(ingredient));
        setName("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleIngredientName = (e) => {
    setName(e.target.value);
  };

  const toogleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <Container maxWidth="xl" className={classes.wrapper}>
      {!showForm && (
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={toogleShowForm}
        >
          Добавить ингредиент
        </Button>
      )}
      {showForm && (
        <form className={classes.form} onSubmit={handleSubmit}>
          <IconButton
            className={classes.closeBtn}
            size="small"
            aria-label="close"
          >
            <CancelIcon onClick={toogleShowForm} />
          </IconButton>
          <TextField
            className={classes.input}
            id="outlined-secondary"
            label="Название ингредиента"
            variant="outlined"
            color="primary"
            margin="normal"
            onChange={handleIngredientName}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            disabled={!name}
          >
            Добавить
          </Button>
        </form>
      )}
    </Container>
  );
}

export default CreateIngredientForm;
