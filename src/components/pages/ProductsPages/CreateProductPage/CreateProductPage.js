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
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import UploadPhoto from 'components/ui-kit/uploadPhoto/uploadPhoto';
import { fetchAddProduct, fetchChangeProduct } from 'api/api';
import { useLocation, useHistory } from "react-router-dom";
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
  const history = useHistory();

  const { control, watch, setValue, reset, handleSubmit, register } = useForm({
     defaultValues:  {
      category: categories.length && categories[0],
      is_available: true,
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

    if (ingredientsIds.length) {
      formData.append("ingredients", ingredientsIds);
    }
    
    if (extraIngredientsIds.length) {
      formData.append("extra_ingredients", extraIngredientsIds);
    }
    
    if (newIngredients.length) {
      formData.append("new_ingredients", newIngredients);
    }

    if (newExtraIngredients.length) {
      formData.append("new_extra_ingredients", newExtraIngredients);
    }

    if (typeof product.image_src === 'object') {
      formData.append("image", product.image_src, product.image_src.name);
    } else {
        const img = product.image_src.length ? product.image_src : "";
        formData.append("image", img);
    }

    if (product.pizza_sizes) {
      formData.append('pizza_sizes', JSON.stringify(product.pizza_sizes))
    }

    formData.append('category', product.category._id);


    for (const key in product) {
      if (
        key !== 'ingredients' &&
        key !== 'extra_ingredients' &&
        key !== 'image_src' &&
        key !== 'category' &&
        key !== 'pizza_sizes'
      ) {
        formData.append(key, product[key])
      }
    }
  
    if (location.state) {
      formData.append("_id", location.state.product._id);

      try {
        fetchChangeProduct(formData);
        history.push('/products');
      } catch (e) {
        console.log(e.response.data.errorMessage);
      } 
    
    } else {
        try {
          fetchAddProduct(formData);
          history.push('/products');
        } catch (e) {
          console.log(e.response.data.errorMessage);
        } 
      }
  };

  const handleChangeCategory = (e) => {
    reset({});
    setValue('category', e.target.value);
    setValue('is_available', true);
  }

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('image_src', file);
    }
  }

  const handleDeleteImage = () => {  
    setValue('image_src', '');
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

  useEffect(() => {
    register('ingredients');
    register('extra_ingredients');
    register('category');

    if (product) {
      for (const key in product) {
        if (key === 'category') {
          const activeCategory = categories.find((category) => category._id === product.category._id)
          setValue(key, activeCategory);
        } else {
          setValue(key, product[key])
        }   
      }
    } 
  }, []) 

  return (
    <Container>
      <Typography className={classes.title} variant="h4" component="h2">
        Форма {location.state ? 'редактирования' : 'создания'} продукта
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <FormControl className={classes.field} variant="outlined">
          <InputLabel>
            Категория
          </InputLabel>
            <Select
              className={classes.categoriesField}
              disabled={!!location.state}
              label="Категория"
              onChange={handleChangeCategory}
              value={watchFields.category}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
        </FormControl>
        <Box className={classes.fieldsWrapper}>
          <UploadPhoto
              handleUploadImage={handleUploadImage}
              handleDeleteImage={handleDeleteImage}
              image={watchFields.image_src}
              className={classes.uploadContainer}
          />
          <Box className={classes.mainInfo}>
           {watchFields.category?.fields.map((field) => {
              switch (field.ui_type) {
                case 'INPUT_TEXT':
                  return  <InputText
                            key={field._id}
                            className={classes.field}
                            field={field}
                            control={control}
                          />;
                case 'INPUT_NUMBER':
                  return  <InputNumber 
                            key={field._id}
                            className={classes.field}
                            field={field}
                            control={control}
                          />;
                case 'MULTI_SELECT_INGREDIENTS':
                  return field.name === 'ingredients' ?
                          <MultiSelect
                            key={field._id}
                            className={classes.field}
                            ingredients={ingredients}
                            handleChange={handleChangeIngredients}
                            stateIngredients={watchFields.ingredients}
                            label={field.label}
                          />
                          :
                          <MultiSelect
                            key={field._id}
                            className={classes.field}
                            ingredients={extraIngredients}
                            handleChange={handleChangeExtraIngredients}
                            stateIngredients={watchFields.extra_ingredients}
                            label={field.label}
                          />;
                case 'PIZZA_SIZES':
                  return  <PizzaSizes
                            key={field._id}
                            pizzaSizes={watchFields.pizza_sizes ?? pizzaSizes}
                            handleChangePizzaSizes={handleChangePizzaSizes}
                          />;
                case 'SWITCH':
                  return  <Switcher
                            key={field._id}
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
          {location.state ? 'Изменить' : "Добавить"}
        </Button>
      </form>
    </Container>
  );
}

export default CreateProductPage;
