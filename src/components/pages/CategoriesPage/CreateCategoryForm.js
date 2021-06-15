import React, { useState } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import { fetchAddCategory } from "api/api";
import { addCategory } from "reducers/categoriesSlice";
import { useDispatch } from "react-redux";
import {
  Button,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";

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

function CreateCategoryForm({ toggleShowForm }) {
  const [name, setName] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchAddCategory(name)
      .then((res) => {
        const { category } = res.data;
        dispatch(addCategory(category));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCategoryName = (e) => {
    setName(e.target.value);
  };

  return (
        <form className={classes.form} onSubmit={handleSubmit}>
          <IconButton
            className={classes.closeBtn}
            size="small"
            aria-label="close"
          >
            <CancelIcon onClick={toggleShowForm} />
          </IconButton>
          <TextField
            className={classes.input}
            id="outlined-secondary"
            label="Название категории"
            variant="outlined"
            color="primary"
            margin="normal"
            onChange={handleCategoryName}
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

export default CreateCategoryForm;
