import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { fetchAddCategory } from "api/api";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginRight: "15px",
  },
}));

function CreateCategoryPage() {
  const [name, setName] = useState("");
  const token = useSelector((s) => s.auth.token);
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchAddCategory(name, token)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCategoryName = (e) => {
    setName(e.target.value);
  };

  return (
    <Container maxWidth="xs">
      <form className={classes.form} onSubmit={handleSubmit}>
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
    </Container>
  );
}

export default CreateCategoryPage;
