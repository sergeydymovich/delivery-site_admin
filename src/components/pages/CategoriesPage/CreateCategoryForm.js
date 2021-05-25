import {
  Button,
  Container,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import React, { useState } from "react";
import { fetchAddCategory } from "api/api";
import { useSelector } from "react-redux";
import { addCategory } from "reducers/categoriesSlice";
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

function CreateCategoryPage() {
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const token = useSelector((s) => s.auth.token);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchAddCategory(name, token)
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
          Добавить категорию
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
      )}
    </Container>
  );
}

export default CreateCategoryPage;
