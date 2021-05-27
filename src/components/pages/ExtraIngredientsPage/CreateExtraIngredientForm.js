import {
  Box,
  Button,
  Container,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import React, { useState } from "react";
import { fetchAddExtraIngredient } from "api/api";
import { addExtraIngredient } from "reducers/extraIngredientsSlice";
import { useDispatch } from "react-redux";
import { PhotoCamera, Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    minHeight: "100px",
    transition: "height 2s",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginRight: "15px",
  },
  closeBtn: {
    marginRight: "10px",
  },
  inputImage: {
    display: "none",
  },
  uploadLabel: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  uploadWrapper: {
    height: "200px",
    width: "200px",
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "15px",
  },
  deleteImageBtn: {
    position: "absolute",
    right: "10px",
    top: "10px",
  },
}));

function CreateExtraIngredientForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image, image.name);
    formData.append("name", name);
    formData.append("price", price);

    fetchAddExtraIngredient(formData)
      .then((res) => {
        const { ingredient } = res.data;
        dispatch(addExtraIngredient(ingredient));
        setName("");
        setPrice("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleIngredientName = (e) => {
    setName(e.target.value);
  };

  const handleIngredientPrice = (e) => {
    setPrice(e.target.value);
  };

  const handleUploadImage = (file) => {
    if (file) {
      setImage(file);
    }
  };

  const handleDeleteImage = () => {
    setImage("");
  };

  const toogleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <Container maxWidth="xl" className={classes.wrapper}>
      {!showForm && (
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={toogleShowForm}
        >
          Добавить ингредиент
        </Button>
      )}
      {showForm && (
        <form className={classes.form} onSubmit={handleSubmit}>
          <IconButton
            className={classes.closeBtn}
            size="small"
            aria-label="close"
          >
            <CancelIcon onClick={toogleShowForm} />
          </IconButton>
          <input
            accept="image/*"
            className={classes.inputImage}
            id="icon-button-file"
            type="file"
            onChange={(e) => handleUploadImage(e.target.files[0])}
          />
          <Box className={classes.uploadWrapper}>
            {!image && (
              <Box
                component="label"
                className={classes.uploadLabel}
                htmlFor="icon-button-file"
              >
                <PhotoCamera color="primary" />
              </Box>
            )}
            {image && (
              <Box className={classes.imageWrapper}>
                <img
                  className={classes.image}
                  src={URL.createObjectURL(image)}
                  alt="ingredient"
                />
                <IconButton
                  className={classes.deleteImageBtn}
                  size="small"
                  aria-label="close"
                >
                  <Close onClick={handleDeleteImage} />
                </IconButton>
              </Box>
            )}
          </Box>

          <TextField
            className={classes.input}
            id="outlined-secondary"
            label="Название ингредиента"
            variant="outlined"
            color="primary"
            margin="normal"
            onChange={handleIngredientName}
          />
          <TextField
            className={classes.input}
            id="outlined-secondary"
            label="Цена"
            variant="outlined"
            color="primary"
            margin="normal"
            onChange={handleIngredientPrice}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            disabled={!name || !price || !image}
          >
            Добавить
          </Button>
        </form>
      )}
    </Container>
  );
}

export default CreateExtraIngredientForm;
