import { Button, Container, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { fetchAddCategory } from "api/api";
import { useSelector } from "react-redux";

function CreateCategoryPage() {
  const [name, setName] = useState("");
  const token = useSelector((s) => s.auth.token);

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
      <form onSubmit={handleSubmit}>
        <TextField
          id="filled-basic"
          label="Категория"
          variant="filled"
          fullWidth
          margin="normal"
          onChange={handleCategoryName}
        />
        <Button
          type="submit"
          fullWidth
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
