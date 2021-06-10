import React from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  Select,
  TextField,
  Switch,
  Container,
  Chip,
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
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
  },
  multiSelect: {
    minWidth: '250px',
    marginBottom: '15px',
  }
}));


const DEFAULT_VALUES = {
  name: "",
  category: "",
  isAvailable: true,
  price: "",
  portionAmount: "",
  volume: "",
  weight: "",
  image: "",
  ingredients: [],
  extraIngredients: [],
}

function CreateProductPage() {
  const categories = useSelector((state) => state.categories.categoriesArr);
  const ingredients = useSelector((state) => state.ingredients.ingredientsArr);
  const extraIngredients = useSelector(
    (state) => state.extraIngredients.extraIngredientsArr
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  const { control, watch, setValue, reset, handleSubmit } = useForm({ defaultValues: DEFAULT_VALUES });

  const watchFields = watch();
  console.log(watchFields)

  const onSubmit = (product) => {
    let newIngredients = [];
    let ingredientsIds = []; 
    let newExtraIngredients = [];
    let extraIngredientsIds = []; 
    product.ingredients.forEach((ingredient) =>
      typeof ingredient === 'string' ? newIngredients.push(ingredient) : ingredientsIds.push(ingredient._id)
    )
    product.extraIngredients.forEach((ingredient) => 
      typeof ingredient === 'string' ? newExtraIngredients.push(ingredient) : extraIngredientsIds.push(ingredient._id)
    )

    const formData = new FormData();
;
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("isAvailable", product.isAvailable);
    formData.append("price", product.price);
    formData.append("portionAmount", product.portionAmount);
    formData.append("volume", product.volume);
    formData.append("weight", product.weight);
    formData.append("ingredients", ingredientsIds);
    formData.append("extraIngredients", extraIngredientsIds);
    formData.append("newIngredients", newIngredients);
    formData.append("newExtraIngredients", newExtraIngredients);

    formData.append("image", product.image, product.image.name);
 
    fetchAddProduct(formData)
    .then((res) => {
      const { product } = res.data;
      dispatch(addProduct(product));
      reset();
    })
    .catch((err) => {
      console.log(err);
    });


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

  const handleChangeIngredients = (e, ingredients) => {
    setValue("ingredients", ingredients);
  }

  const handleChangeExtraIngredients = (e, ingredients) => {
    setValue("extraIngredients", ingredients);
  }

  return (
    <Container>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Autocomplete
          className={classes.multiSelect}
          multiple
          id="tags-filled"
          options={ingredients}
          getOptionLabel={(option) => option.name}
          freeSolo
          onChange={handleChangeIngredients}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip variant="outlined"  label={option.name || option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Ингредиенты" placeholder="Добавить..." />
          )}
        />


        <Autocomplete
          className={classes.multiSelect}
          multiple
          id="tags-filled"
          options={extraIngredients}
          getOptionLabel={(option) => option.name}
          freeSolo
          onChange={handleChangeExtraIngredients}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip variant="outlined"  label={option.name || option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Доп ингредиенты" placeholder="Добавить..." />
          )}
        />

        <Controller
          name="isAvailable"
          control={control}
          className={classes.field}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch checked={field.value} color="primary" {...field} />}
              label="Доступен"
              labelPlacement="start"
            />
          )}
        />

        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          className={classes.field}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error}
              required='true'
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
    </Container>
  );
}

export default CreateProductPage;
