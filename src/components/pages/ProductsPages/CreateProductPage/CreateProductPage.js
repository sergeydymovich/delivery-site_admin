import React from "react";
import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function CreateProductPage() {
  const classes = useStyles();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      category: "",
      isAvailable: "",
      price: "",
      size: "",
      portionAmount: "",
      volume: "",
      weight: "",
      imageSrc: "",
      ingredients: [],
      extraIngredients: [],
    },
  });

  const onSubmit = (data, e) => {
    console.log(data);
  };

  return (
    <Box>
      <h5>форма создания продукта</h5>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Название"
              variant="outlined"
              color="primary"
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Цена"
              variant="outlined"
              color="primary"
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Количество"
              variant="outlined"
              color="primary"
            />
          )}
        />
        <Controller
          name="volume"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Объем"
              variant="outlined"
              color="primary"
            />
          )}
        />
        <Controller
          name="weight"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Вес"
              variant="outlined"
              color="primary"
            />
          )}
        />
        <Button type="submit" variant="contained" size="large" color="primary">
          Добавить
        </Button>
      </form>
    </Box>
  );
}

export default CreateProductPage;
