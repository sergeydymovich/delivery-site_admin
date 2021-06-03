import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  Select,
  TextField,
  Switch,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  field: {
    marginBlock: "10px",
  },
}));

function CreateProductPage() {
  const categories = useSelector((state) => state.categories.categoriesArr);
  const ingredients = useSelector((state) => state.ingredients.ingredientsArr);
  const extraIngredients = useSelector(
    (state) => state.extraIngredients.extraIngredientsArr
  );
  const classes = useStyles();

  const { control, watch, setValue, handleSubmit } = useForm({
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

  const watchFields = watch();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleAddIngredient = (e) => {
    const ingredient = ingredients.find((el) => el._id === e.target.value);
    const newValue = [...watchFields.ingredients, ingredient];
    setValue("ingredients", newValue);
  };

  const handleAddExtraIngredient = (e) => {
    const extraIngredient = extraIngredients.find(
      (el) => el._id === e.target.value
    );
    const newValue = [...watchFields.extraIngredients, extraIngredient];
    setValue("extraIngredients", newValue);
  };

  return (
    <Box>
      <h5>форма создания продукта</h5>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="isAvailable"
          control={control}
          className={classes.field}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch color="primary" {...field} />}
              label="Доступен"
              labelPlacement="start"
            />
          )}
        />

        <Controller
          name="name"
          control={control}
          className={classes.field}
          render={({ field }) => (
            <TextField
              {...field}
              label="Название"
              variant="outlined"
              color="primary"
            />
          )}
        />

        <FormControl className={classes.field} variant="outlined">
          <InputLabel htmlFor="outlined-age-native-simple">
            Категория
          </InputLabel>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select label="Категория" {...field} native>
                <option aria-label="None" value="" />
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Цена"
              variant="outlined"
              color="primary"
              className={classes.field}
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
              className={classes.field}
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
              className={classes.field}
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
              className={classes.field}
            />
          )}
        />

        <FormControl variant="outlined" className={classes.field}>
          <InputLabel htmlFor="outlined-age-native-simple">
            Ингредиенты
          </InputLabel>
          <Select label="Ингредиенты" onChange={handleAddIngredient} native>
            <option aria-label="None" value="" />
            {ingredients.map((ingredient) => (
              <option key={ingredient._id} value={ingredient._id}>
                {ingredient.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.field}>
          <InputLabel htmlFor="outlined-age-native-simple">
            Доп. ингредиенты
          </InputLabel>
          <Select
            label="Доп. ингредиенты"
            onChange={handleAddExtraIngredient}
            native
          >
            <option aria-label="None" value="" />
            {extraIngredients.map((ingredient) => (
              <option key={ingredient._id} value={ingredient._id}>
                {ingredient.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" size="large" color="primary">
          Добавить
        </Button>
      </form>
    </Box>
  );
}

export default CreateProductPage;
