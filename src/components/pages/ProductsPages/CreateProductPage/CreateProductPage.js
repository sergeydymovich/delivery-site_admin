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
  Typography,
  Box,
  MenuItem
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import UploadPhoto from 'components/ui-kit/uploadPhoto/uploadPhoto';
import { fetchAddProduct, fetchChangeProduct } from 'api/api';
import { addProduct } from 'reducers/productsSlice';
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    alignItems: "center",
    justifyContent: 'space-between',
  },
  mainInfo: {
    display: "flex",
    flexDirection: 'column',
    marginRight: "20px",
    width: "200px",
  },
  additionalInfo: {
    display: "flex",
    flexDirection: 'column',
    marginRight: "20px",
  },
  field: {
    marginBlock: "10px",
  },
  uploadContainer: {
    width: '300px',
    height:'400px',
    border: `2px dashed ${theme.palette.grey[300]}`,
    marginRight: "20px",
  },
  multiSelect: {
    width: "350px",
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
  console.log('watchFields',watchFields)

  const onSubmit = (product) => {
    console.log("form:::::::",product)
    const newIngredients = [];
    const ingredientsIds = []; 
    const newExtraIngredients = [];
    const extraIngredientsIds = []; 
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


    if (typeof product.image === 'object') {
      formData.append("image", product.image, product.image.name);
    }
    
    if (product.image && typeof product.image === 'string') {
      formData.append("image", product.image);
    }
    
    if (!product.image) {
      formData.append("image", '');
    }

    console.log('точно пошел запрос', typeof product.image);

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
      <Typography className={classes.title} variant="h4" component="h2">
        Форма создания продукта
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>    
        <UploadPhoto
          handleUploadImage={handleUploadImage}
          handleDeleteImage={handleDeleteImage}
          image={watchFields.image}
          className={classes.uploadContainer}
        />

        <Box className={classes.mainInfo}>
          <FormControl className={classes.field} variant="outlined">
            <InputLabel>
              Категория
            </InputLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select label="Категория" {...field}>
                  <MenuItem value=''></MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

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

        <Controller
            name="portionAmount"
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
        </Box>

        <Box className={classes.additionalInfo}>
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
                labelPlacement='top'
              />
            )}
          />
        </Box>

        <Button type='submit' variant="contained" size="large" color="primary">
          Добавить
        </Button>
      </form>
    </Container>
  );
}

export default CreateProductPage;
