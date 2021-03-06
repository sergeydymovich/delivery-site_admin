import {
  Button,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import React, { useState } from "react";
import { extraIngredientsApi } from "api/api";
import { addExtraIngredient } from "reducers/extraIngredientsSlice";
import { useDispatch } from "react-redux";
import UploadPhoto from "components/ui-kit/uploadPhoto/uploadPhoto";

const useStyles = makeStyles((theme) => ({
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
  uploadContainer: {
    width: '100px',
    height:'100px',
    border: '1px dashed lightgrey',
    marginRight: '10px'
  }
}));

function CreateExtraIngredientForm({ toggleShowForm }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    if (image) {
      formData.append("image", image, image.name);
    } 
    
    formData.append("name", name);
    formData.append("price", price);

    extraIngredientsApi.create(formData)
      .then((res) => {
        dispatch(addExtraIngredient(res.data.ingredient));
        setName("");
        setPrice("");
        setImage("");
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

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleDeleteImage = () => {
    setImage("");
  };

  return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <IconButton
              className={classes.closeBtn}
              size="small"
              aria-label="close"
            >
              <CancelIcon onClick={toggleShowForm} />
            </IconButton>
            <UploadPhoto
              handleDeleteImage={handleDeleteImage}
              handleUploadImage={handleUploadImage}
              image={image}
              className={classes.uploadContainer}
            />
            <TextField
              className={classes.input}
              label="????????????????"
              variant="outlined"
              color="primary"
              margin="normal"
              onChange={handleIngredientName}
              value={name}
            />
            <TextField
              className={classes.input}
              label="????????"
              variant="outlined"
              color="primary"
              margin="normal"
              onChange={handleIngredientPrice}
              value={price}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              disabled={!name}
            >
              ????????????????
            </Button>
        </form>
  );
}

export default CreateExtraIngredientForm;
