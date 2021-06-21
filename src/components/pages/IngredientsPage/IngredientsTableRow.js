import React, { useEffect, useState } from "react";
import { IconButton, TableCell, TableRow, TextField } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { fetchChangeIngredient} from "api/api";
import { useDispatch } from "react-redux";
import { changeIngredient } from "reducers/ingredientsSlice";


function IngredientsTableRow({ ingredient }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newIngredientName, setNewIngredientName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {

    if (newIngredientName) {
      fetchChangeIngredient({name: newIngredientName, _id: ingredient._id})
      .then((res) => {
        const { ingredient } = res.data;
        dispatch(changeIngredient(ingredient));
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

  const activateEditMode = () => {
    setIsEditMode(true);
  }

  const deactivateEditMode = () => {
    setIsEditMode(false);
  }

  useEffect(() => {
    setNewIngredientName(ingredient.name);
  }, [ingredient.name]);

  return (
          <TableRow>
            <TableCell component="th" scope="row">
              {!isEditMode && ingredient.name}
              {isEditMode &&
                <>
                <TextField  
                  label="Название"
                  variant="outlined"
                  size='small'
                  defaultValue={ingredient.name}
                  onChange={handleChangeIngredientName}
                  />
                  <IconButton onClick={deactivateEditMode} aria-label="change">
                    <CloseIcon aria-label="change" size="small" />
                  </IconButton>
                  <IconButton onClick={handleSubmit} aria-label="change">
                    <CheckIcon aria-label="change" size="small" />
                  </IconButton>
                </>
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
          
            </TableCell>
          </TableRow>
  );
}

export default IngredientsTableRow;