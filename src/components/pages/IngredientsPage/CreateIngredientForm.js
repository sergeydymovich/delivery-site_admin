import {
  Button,
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

function CreateIngredientForm({ toggleShowForm }) {
  const [name, setName] = useState("");
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



  return (
        <form className={classes.form} onSubmit={handleSubmit}>
          <IconButton
            className={classes.closeBtn}
            size="small"
            aria-label="close"
            onClick={toggleShowForm}
          >
            <CancelIcon />
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
  );
}

export default CreateIngredientForm;
