import React, { useState, useEffect } from "react";
import { IconButton, TableCell, TableRow, TextField } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { fetchChangePizzaSize } from "api/api";
import { useDispatch } from "react-redux";
import { changePizzaSize } from "reducers/pizzaSizesSlice";


function PizzaSizesTableRow({ pizzaSize }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newPizzaSize, setNewPizzaSize] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {

    if (newPizzaSize) {
      fetchChangePizzaSize({size: newPizzaSize, _id: pizzaSize._id})
      .then((res) => {
        const { pizzaSize } = res.data;
        dispatch(changePizzaSize(pizzaSize));
        setIsEditMode(false);
      })
      .catch((err) => {
        console.log(err);
      });
    }

  }

  const handleChangePizzaSize = (e) => {
    setNewPizzaSize(e.target.value);
  }

  const activateEditMode = () => {
    setIsEditMode(true);
  }

  const deactivateEditMode = () => {
    setIsEditMode(false);
  }

  useEffect(() => {
    setNewPizzaSize(pizzaSize.size);
  }, [pizzaSize.size]);

  return (
          <TableRow>
            <TableCell component="th" scope="row">
              {pizzaSize.name}
            </TableCell>
            <TableCell align='center'>
              {!isEditMode && pizzaSize.size}
              {isEditMode &&
                <>
                  <TextField  
                    label="Размер"
                    variant="outlined"
                    size='small'
                    defaultValue={pizzaSize.size}
                    onChange={handleChangePizzaSize}
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

export default PizzaSizesTableRow;