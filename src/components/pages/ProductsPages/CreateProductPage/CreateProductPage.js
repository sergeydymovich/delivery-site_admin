import React, { useEffect } from "react";
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
import { fetchAddProduct, fetchChangeProduct } from 'api/api';
import { addProduct } from 'reducers/productsSlice';
import { useLocation } from "react-router-dom";

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

function CreateProductPage() {
  const location = useLocation();
  const { product } = location.state || {};
  const categories = useSelector((state) => state.categories.categoriesArr);
  const ingredients = useSelector((state) => state.ingredients.ingredientsArr);
  const extraIngredients = useSelector(
    (state) => state.extraIngredients.extraIngredientsArr
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  const { control, watch, setValue, reset, handleSubmit, register } = useForm({
     defaultValues:  {
      name: product?.name || "",
      category: product?.category._id ||"",
      isAvailable: product?.isAvailable || true,
      price: product?.price || "",
      portionAmount: product?.portionAmount || "",
      volume: product?.volume || "",
      weight: product?.weight ||"",
      image: product?.image || '',
      ingredients: product?.ingredients || [],
      extraIngredients: product?.extraIngredients || [],
     } 

   });

  const watchFields = watch();
  console.log(watchFields)

  const onSubmit = (product) => {
    console.log("form:::::::",product)
    let newIngredients = [];
    let ingredientsIds = []; 
    let newExtraIngredients = [];
    let extraIngredientsIds = []; 
    product.ingredients?.forEach((ingredient) =>
      ingredient._id ? ingredientsIds.push(ingredient._id) : newIngredients.push(ingredient.name)
    )
    product.extraIngredients?.forEach((ingredient) => 
    ingredient._id ? extraIngredientsIds.push(ingredient._id) : newExtraIngredients.push(ingredient.name)
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

    if (ingredientsIds.length) {
      formData.append("ingredients", ingredientsIds);
    }
    
    if (extraIngredientsIds.length) {
      formData.append("extraIngredients", extraIngredientsIds);
    }
    
    if (newIngredients.length) {
      formData.append("newIngredients", newIngredients);
    }

    if (newExtraIngredients.length) {
      formData.append("newExtraIngredients", newExtraIngredients);
    }


    if (product.image) {
      formData.append("image", product.image, product.image.name);
    } else {
      formData.append("image", '');
 
    }

    if (location.state) {
      formData.append("id", location.state.product._id);

      try {
        fetchChangeProduct(formData)
      } catch (e) {
        console.log(e.response.data.errorMessage);
      } 
    
    } else {
      fetchAddProduct(formData) 
      .then((res) => {
        const { product } = res.data;
        dispatch(addProduct(product));
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
    }
 
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
    if (typeof ingredients[ingredients.length - 1] === 'string') {
      ingredients[ingredients.length - 1] = { name: ingredients[ingredients.length - 1] }    
    }

    setValue('ingredients', ingredients)
  }

  const handleChangeExtraIngredients =  (e, ingredients) => {
    if (typeof ingredients[ingredients.length - 1] === 'string') {
      ingredients[ingredients.length - 1] = { name: ingredients[ingredients.length - 1] }  
    }

    setValue('extraIngredients', ingredients)
  }

  useEffect(() => {
    if (location.state) {
      register('ingredients');
      register('extraIngredients');
      setValue('ingredients', product.ingredients)
      setValue('extraIngredients', product.extraIngredients)
      setValue('image', product.imageSrc)
    }
  }, [register])


  return (
    <Container>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      
        <Autocomplete
          className={classes.multiSelect}
          multiple
          id="tags-filled"
          options={ingredients}
          getOptionLabel={(option) => option.name}
          onChange={handleChangeIngredients}
          defaultValue={watchFields.ingredients}
          filterSelectedOptions
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip variant="outlined" label={option.name} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="ингредиенты" placeholder="добавить..." />
          )}
        />


        <Autocomplete
          className={classes.multiSelect}
          multiple
          id="tags-filled"
          options={extraIngredients}
          getOptionLabel={(option) => option.name}
          onChange={handleChangeExtraIngredients}
          defaultValue={watchFields.extraIngredients}
          filterSelectedOptions
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip variant="outlined" label={option.name} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Доп ингредиенты" placeholder="добавить..." />
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
