import React, { useState } from "react";
import { IconButton, TableCell, TableRow, TextField } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { fetchChangeCategory } from "api/api";
import { useDispatch } from "react-redux";
import { changeCategory } from "reducers/categoriesSlice";
import { useEffect } from "react";


function CategoriesTableRow({ category }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {

    if (newCategoryName) {
      fetchChangeCategory({name: newCategoryName, _id: category._id})
      .then((res) => {
        const { category } = res.data;
        dispatch(changeCategory(category));
        setIsEditMode(false);
      })
      .catch((err) => {
        console.log(err);
      });
    }

  }

  const handleChangeCategoryName = (e) => {
    setNewCategoryName(e.target.value);
  }

  const activateEditMode = () => {
    setIsEditMode(true);
  }

  const deactivateEditMode = () => {
    setIsEditMode(false);
  }

  useEffect(() => {
    setNewCategoryName(category.name);
  }, [category.name]);

  return (
          <TableRow key={category._id}>
            <TableCell component="th" scope="row">
              {!isEditMode && category.name}
              {isEditMode &&
                <>
                  <TextField  
                    label="Название"
                    variant="outlined"
                    size='small'
                    defaultValue={category.name}
                    onChange={handleChangeCategoryName}
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
              {new Date(category.createdAt).toLocaleDateString()}
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

export default CategoriesTableRow;