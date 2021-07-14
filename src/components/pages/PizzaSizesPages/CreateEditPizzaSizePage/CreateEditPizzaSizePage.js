import React, { useEffect, useState } from "react";
import { pizzaSizesApi } from 'api/api';
import { addPizzaSize, editPizzaSize } from 'reducers/pizzaSizesSlice';
import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Chip,
  Box,
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: '30px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: '0 auto',
  },
  submitBtn: {
    marginTop: '30px',
  },
  doughWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px'
  },
  doughList: {
    display: 'flex',
    flexWrap: 'wrap',
    border: `1px dashed ${theme.palette.grey[400]}`,
    minHeight: '50px'
  },
  doughItem: {
    margin: 5,
  }
}));

function CreateEditPizzaSizePage() {
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [dough, setDough] = useState('');
  const [doughArr, setDoughArr] = useState([]);
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataObj = {
      name,
      size,
      dough: doughArr
    };

    if (location.state) {
      dataObj._id = location.state.pizzaSize._id
      pizzaSizesApi.edit(dataObj)
      .then((res) => {
        const { pizza_size } = res.data;
        dispatch(editPizzaSize(pizza_size));
        history.push('/pizza-sizes');
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      pizzaSizesApi.create(dataObj)
      .then((res) => {
        const { pizza_size } = res.data;
        dispatch(addPizzaSize(pizza_size));
        history.push('/pizza-sizes');
      })
      .catch((err) => {
        console.log(err);
      });
    }

  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeSize = (e) => {
    setSize(e.target.value);
  };

  const handleChangeDough = (e) => {
    setDough(e.target.value);
  };

  const handleAddDough = () => {
    const isNameExist = doughArr.find((el) => el.name === dough);

    if (!isNameExist) {
      setDoughArr([...doughArr, { name: dough }]);
      setDough('');
    }
  };

  const handleDeleteDough = (name) => {
    const newDoughArr = doughArr.filter((dough) => dough.name !== name)
    setDoughArr(newDoughArr);
  };

  useEffect(() => {
    if (location.state) {
      const { name, size, dough } = location.state.pizzaSize;
      setName(name);
      setSize(size);
      setDoughArr(dough);
    }
  }, [location])

  return (
      <Container>
        <Typography className={classes.title} variant="h4" component="h2">
          {location.state ? 'Форма редактирования размера пиццы' : 'Форма создания размера пиццы'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label="Название"
            variant="outlined"
            color="primary"
            margin="normal"
            onChange={handleChangeName}
            value={name}
          />
          <TextField
            label="Диаметр(см)"
            variant="outlined"
            color="primary"
            margin="normal"
            onChange={handleChangeSize}
            value={size}
          />
          <Box className={classes.doughWrapper}>
            <TextField
              label="Тесто"
              variant="outlined"
              color="primary"
              margin="normal"
              onChange={handleChangeDough}
              value={dough}
            />
            <IconButton onClick={handleAddDough} disabled={!dough}>
              <AddCircleIcon
                aria-label="change"
                color={dough ? 'primary' : 'disabled'}
                size="medium"
                fontSize='large'
              />
            </IconButton>
          </Box>
          <Box className={classes.doughList}>
          {doughArr.map((dough) => (
            <Chip
              label={dough.name}
              onDelete={() => handleDeleteDough(dough.name)}
              className={classes.doughItem}
            />
          ))}
          </Box>
   
          <Button
            className={classes.submitBtn}
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            disabled={!name || !size || !doughArr.length}
          >
            {location.state ? 'Изменить' : 'Добавить'}
          </Button>
        </form>   
      </Container>
  );
}

export default CreateEditPizzaSizePage;