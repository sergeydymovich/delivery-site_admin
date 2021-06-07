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
import { useDispatch, useSelector } from "react-redux";
import UploadPhoto from 'components/ui-kit/uploadPhoto/uploadPhoto';
import { fetchAddProduct } from 'api/api';
import { addProduct } from 'reducers/productsSlice';

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  field: {
    marginBlock: "10px",
  },
  uploadContainer: {
    width: '200px',
    height:'200px',
    border: '1px dashed lightgrey',
  }
}));

function CreateProductPage() {
  const categories = useSelector((state) => state.categories.categoriesArr);
  const ingredients = useSelector((state) => state.ingredients.ingredientsArr);
  const extraIngredients = useSelector(
    (state) => state.extraIngredients.extraIngredientsArr
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  const { control, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      category: "",
      isAvailable: "",
      price: "",
      portionAmount: "",
      volume: "",
      weight: "",
      image: "",
      ingredients: [],
      extraIngredients: [],
    },
  });

  const watchFields = watch();
  console.log(watchFields)

  const onSubmit = (data, e) => {
    const ingredients = data['ingredients'].map((ingredient) => ingredient._id);
    const extraIngredients = data['extraIngredients'].map((ingredient) => ingredient._id);
    const formData = new FormData();

    formData.append("name", data["name"]);
    formData.append("category", data["category"]);
    formData.append("isAvailable", data["isAvailable"]);
    formData.append("price", data["price"]);
    formData.append("portionAmount", data["portionAmount"]);
    formData.append("volume", data["volume"]);
    formData.append("weight", data["weight"]);
    formData.append("ingredients", ingredients);
    formData.append("extraIngredients", extraIngredients);
    formData.append("image", data["image"], data["image"].name);
 
    fetchAddProduct(formData)
    .then((res) => {
      const { product } = res.data;
      dispatch(addProduct(product));
      e.target.reset();
    })
    .catch((err) => {
      console.log(err);
    });


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


  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('image', file);
    }
  }

  const handleDeleteImage = () => {  
    setValue('image', '');
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
          <InputLabel>
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
          <InputLabel >
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
          <InputLabel >
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

        <UploadPhoto
        handleUploadImage={handleUploadImage}
        handleDeleteImage={handleDeleteImage}
        image={watchFields.image}
        className={classes.uploadContainer}
        />

        <Button type='submit' variant="contained" size="large" color="primary">
          Добавить
        </Button>
      </form>
    </Box>
  );
}

export default CreateProductPage;
