import React, { useEffect, useState } from "react";
import { IconButton, makeStyles, TableCell, TableRow, TextField } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { extraIngredientsApi } from "api/api";
import { useDispatch } from "react-redux";
import { editExtraIngredient } from "reducers/extraIngredientsSlice";
import { Avatar } from "@material-ui/core";
import UploadPhoto from "components/ui-kit/uploadPhoto/uploadPhoto";
import { cfg } from 'config';

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    minHeight: "100px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  imageWrapper: {
    marginRight: "auto",
    marginLeft: "auto",
  },
  uploadContainer: {
    width: '65px',
    height: '65px',
    border: '1px dashed lightgrey',
    marginRight: "auto",
    marginLeft: "auto",
  }
}));


function  ExtraIngredientsTableRow({ ingredient }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newIngredientName, setNewIngredientName] = useState('');
  const [newIngredientPrice, setNewIngredientPrice] = useState('');
  const [newIngredientImage, setNewIngredientImage] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = () => {

    if (newIngredientName) {
      const formData = new FormData();

      if (typeof newIngredientImage === 'object') {
        formData.append("image", newIngredientImage, newIngredientImage.name);
      } else {
          formData.append("image_src", newIngredientImage);
      }

      formData.append("name", newIngredientName);
      formData.append("price", newIngredientPrice);
      formData.append("_id", ingredient._id);


      extraIngredientsApi.edit(formData)
      .then((res) => {
        dispatch(editExtraIngredient(res.data.ingredient));
        setIsEditMode(false);
      })
      .catch((err) => {
        console.log(err);
      });
    }

  }

  const handleChangeIngredientName = (e) => {
    setNewIngredientName(e.target.value);
  }

  const handleChangeIngredientPrice = (e) => {
    setNewIngredientPrice(e.target.value);
  }

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewIngredientImage(file)
    }
  }

  const handleDeleteImage = () => {  
    setNewIngredientImage('');
  };

  const activateEditMode = () => {
    setIsEditMode(true);
  }

  const deactivateEditMode = () => {
    setIsEditMode(false);
  }

  useEffect(() => {
    const { image_src, name, price } = ingredient;
    setNewIngredientImage(image_src);
    setNewIngredientName(name);
    setNewIngredientPrice(price);
  }, [ingredient])

  return (
        <TableRow>
          <TableCell component="th" scope="row">
            {!isEditMode && ingredient.name}
            {isEditMode &&
              <TextField  
                label="????????????????"
                variant="outlined"
                size='small'
                defaultValue={ingredient.name}
                onChange={handleChangeIngredientName}
              />
            }
          </TableCell>
          <TableCell component="th" align="center" scope="row">
            {!isEditMode &&
              <Avatar
                className={classes.imageWrapper}
                alt="extra-ingredient"
                src={`${cfg.imageBaseUrl}${ingredient.image_src}`}
              />
            }
            {isEditMode && 
              <UploadPhoto
                handleUploadImage={handleUploadImage}
                handleDeleteImage={handleDeleteImage}
                image={newIngredientImage}
                className={classes.uploadContainer}
              />
            }     
          </TableCell>
          <TableCell component="th" align="right" scope="row">
            {!isEditMode && ingredient.price}
            {isEditMode &&
              <TextField  
                label="????????"
                variant="outlined"
                size='small'
                defaultValue={ingredient.price}
                onChange={handleChangeIngredientPrice}
              />
            }
          </TableCell>
          <TableCell align="right">
            {new Date(ingredient.createdAt).toLocaleDateString()}
          </TableCell>
          <TableCell component="th" align="right" scope="row">
            {!isEditMode &&
                <IconButton onClick={activateEditMode} aria-label="change">
                  <CreateIcon aria-label="change" size="small" />
                </IconButton>
            }
            {isEditMode &&
              <>
                <IconButton onClick={deactivateEditMode} aria-label="change">
                  <CloseIcon aria-label="change" size="small" />
                </IconButton>
                <IconButton onClick={handleSubmit} aria-label="change">
                  <CheckIcon aria-label="change" size="small" />
                </IconButton>
              </>
            }
          </TableCell>
        </TableRow>
  );
}

export default ExtraIngredientsTableRow;