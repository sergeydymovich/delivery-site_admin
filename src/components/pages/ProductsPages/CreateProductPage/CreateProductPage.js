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
  MenuItem,
  Checkbox
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
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.grey[400]}`,
    padding: '20px',
    borderRadius: '4px',
  },
  fieldsWrapper: {
    display: "flex",
    marginBottom: '35px',
    width: '100%',
  },
  mainInfo: {
    display: "flex",
    flexDirection: 'column',
    marginRight: "20px",
    minWidth: "170px",
  },
  additionalInfo: {
    display: "flex",
    flexDirection: 'column',
    minWidth: '500px',
  },
  field: {
    marginBlock: "10px",
  },
  uploadContainer: {
    width: '300px',
    height:'auto',
    border: `1px dashed ${theme.palette.grey[400]}`,
    marginRight: "20px",
  },
  multiSelect: {
    marginBottom: '15px',
  },
  pizzaSizeWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: '4px',
    padding: '10px',
    marginBottom: '7px',
    "&:last-child": {
      marginBottom: '0'
    }
  },
  pizzaSizeMainInfo: {
    width: '200px',
    marginRight: '25px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  pizzaDough: {
    width: '100%',
  },
  pizzaWeight: {
    width: '100px',
  },
  pizzaDoughLabel: {
    minWidth: '170px',
  },
  traditionalDough: {
    display: 'flex',
    width: '100%',
    marginRight: '10px',
    marginBottom: '10px',
  },
  thinDough: {
    display: 'flex',
    width: '100%',
  },
  pizzaSizeName: {
    textTransform: 'capitalize',
    marginBottom: '10px'
  },
}));

function CreateProductPage() {
  const location = useLocation();
  const { product } = location.state || {};
  const categories = useSelector((state) => state.categories.categoriesArr);
  const ingredients = useSelector((state) => state.ingredients.ingredientsArr);
  const extraIngredients = useSelector((state) => state.extraIngredients.extraIngredientsArr);
  const pizzaSizes = useSelector((state) => state.pizzaSizes.pizzaSizesArr);
  const classes = useStyles();
  const dispatch = useDispatch();

  const { control, watch, setValue, reset, handleSubmit, register } = useForm({
     defaultValues:  {
      name: product?.name || "",
      category: product?.category._id ||"",
      isAvailable: product?.isAvailable || true,
      price: product?.price || "",
      volume: product?.volume || "",
      weight: product?.weight ||"",
      image: product?.image || '',
      ingredients: product?.ingredients || [],
      extraIngredients: product?.extraIngredients || [],
      sizes: product?.sizes || [],
      pizzaSizes: product?.pizzaSizes || '',
     } 

   });
  const watchFields = watch();
  const isPizzaCategory = watchFields.category === '60dafb4274a7c9236c138dcd';
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
    } else {
        const img = product.image.length ? product.image : "";
        formData.append("image", img);
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
    register('ingredients');
    register('extraIngredients');

    if (location.state) {
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
        <Box className={classes.fieldsWrapper}>    
          <UploadPhoto
            handleUploadImage={handleUploadImage}
            handleDeleteImage={handleDeleteImage}
            image={watchFields.image}
            className={classes.uploadContainer}
          />

          <Box className={classes.mainInfo}>
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

            {isPizzaCategory &&
              <Box className={classes.pizzaSizes}>
              {pizzaSizes.map((pizzaSize) => (
                <Box className={classes.pizzaSizeWrapper}>
                  <Box className={classes.pizzaSizeMainInfo}>
                    <Typography className={classes.pizzaSizeName} component="p">
                      {`${pizzaSize.name}(${pizzaSize.size}см)`}
                    </Typography>
                    <TextField
                      label="Цена"
                      variant="outlined"
                      color="primary"
                      size='small'
                    />
                  </Box>
                  <Box className={classes.pizzaDough}>
                    <Box className={classes.traditionalDough}>
                      <FormControlLabel
                        className={classes.pizzaDoughLabel}
                        control={<Checkbox size='small' color="primary" />}
                        label="Традиционное:"
                        labelPlacement="end"
                      />
                      <TextField
                        className={classes.pizzaWeight}
                        label="Вес"
                        variant="outlined"
                        color="primary"
                        size='small'
                      />
                    </Box>
                    <Box className={classes.thinDough}>
                      <FormControlLabel
                        className={classes.pizzaDoughLabel}
                        control={<Checkbox size='small' color="primary" />}
                        label="Тонкое:"
                        labelPlacement="end"
                      />
                      <TextField
                        className={classes.pizzaWeight}
                        label="Вес"
                        variant="outlined"
                        color="primary"
                        size='small'
                      />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>       
            }

          </Box>
        </Box> 

        <Button 
          type='submit'
          variant="contained"
          size="large"
          color="primary"
        >
          Добавить
        </Button>
      </form>
    </Container>
  );
}

export default CreateProductPage;
