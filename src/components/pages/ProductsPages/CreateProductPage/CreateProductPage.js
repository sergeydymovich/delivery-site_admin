import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  makeStyles,
  Select,
  Container,
  Typography,
  Box,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import UploadPhoto from 'components/ui-kit/uploadPhoto/uploadPhoto';
import { fetchAddProduct, fetchChangeProduct } from 'api/api';
import { addProduct } from 'reducers/productsSlice';
import { useLocation } from "react-router-dom";
import InputNumber from 'components/pages/ProductsPages/CreateProductPage/ProductFormFields/InputNumber';
import InputText from 'components/pages/ProductsPages/CreateProductPage/ProductFormFields/InputText';
import MultiSelect from "components/pages/ProductsPages/CreateProductPage/ProductFormFields/MultiSelect";
import PizzaSizes from "components/pages/ProductsPages/CreateProductPage/ProductFormFields/PizzaSizes";
import Switcher from "components/pages/ProductsPages/CreateProductPage/ProductFormFields/Switcher";

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
    minHeight: '500px'
  },
  mainInfo: {
    display: "flex",
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  categoriesField: {
    width: '200px',
  },
  field: {
    marginBottom: "10px",
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
      category: product?.category._id || categories.find((_, i) => i === 0),
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
    product.extra_ingredients?.forEach((ingredient) => 
    ingredient._id ? extraIngredientsIds.push(ingredient._id) : newExtraIngredients.push(ingredient.name)
    )

    const formData = new FormData();
;
    formData.append("name", product.name);
    formData.append("category", product.category._id);
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
    

    console.log('точно пошел запрос', formData);

    // if (location.state) {
    //   formData.append("id", location.state.product._id);

    //   try {
    //     fetchChangeProduct(formData)
    //   } catch (e) {
    //     console.log(e.response.data.errorMessage);
    //   } 
    
    // } else {
    //   fetchAddProduct(formData) 
    //   .then((res) => {
    //     const { product } = res.data;
    //     dispatch(addProduct(product));
    //     reset();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // }
 
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

    setValue('extra_ingredients', ingredients)
  }

  const handleChangePizzaSizes = (sizesArr) => {
    setValue('pizza_sizes', sizesArr);
  }

  // useEffect(() => {
  //   register('ingredients');
  //   register('extraIngredients');

  //   if (location.state) {
  //     setValue('ingredients', product.ingredients)
  //     setValue('extraIngredients', product.extraIngredients)
  //     setValue('image', product.imageSrc)
  //   }
  // }, [register])

  // useEffect(() => {
  //   const initActiveCategory = categories.find((_, i) => i === 0);
  //   initActiveCategory.fields.forEach((field) => register(field.name))
  // }, [register, categories])

  return (
    <Container>
      <Typography className={classes.title} variant="h4" component="h2">
        Форма создания продукта
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <FormControl className={classes.field} variant="outlined">
          <InputLabel>
            Категория
          </InputLabel>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select className={classes.categoriesField} label="Категория" {...field}>
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <Box className={classes.fieldsWrapper}>
          <UploadPhoto
              handleUploadImage={handleUploadImage}
              handleDeleteImage={handleDeleteImage}
              image={watchFields.image}
              className={classes.uploadContainer}
          />
          <Box className={classes.mainInfo}>
           {watchFields.category?.fields.map((field) => {
              switch (field.ui_type) {
                case 'INPUT_TEXT':
                  return  <InputText
                            className={classes.field}
                            field={field}
                            control={control}
                          />;
                case 'INPUT_NUMBER':
                  return  <InputNumber 
                            className={classes.field}
                            field={field}
                            control={control}
                          />;
                case 'MULTI_SELECT_INGREDIENTS':
                  return field.name === 'ingredients' ?
                          <MultiSelect
                            className={classes.field}
                            ingredients={ingredients}
                            handleChange={handleChangeIngredients}
                            stateIngredients={watchFields.ingredients}
                            label={field.label}
                          />
                          :
                          <MultiSelect
                            className={classes.field}
                            ingredients={extraIngredients}
                            handleChange={handleChangeExtraIngredients}
                            stateIngredients={watchFields.extraIngredients}
                            label={field.label}
                          />;
                case 'PIZZA_SIZES':
                  return  <PizzaSizes
                            pizzaSizes={pizzaSizes}
                            handleChangePizzaSizes={handleChangePizzaSizes}
                          />;
                case 'SWITCH':
                  return  <Switcher
                            name={field.name}
                            label={field.label}
                            control={control}
                          />;
                default:
                 return <></>;
            }})}
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
