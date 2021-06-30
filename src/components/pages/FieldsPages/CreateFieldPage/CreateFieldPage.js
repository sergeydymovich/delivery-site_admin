import {
  Button,
  makeStyles,
  TextField,
  FormControlLabel,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import React, { useState } from "react";
import { fetchAddField } from "api/api";
import { addField } from "reducers/fieldsSlice";
import { useDispatch } from "react-redux";
import { Checkbox } from "@material-ui/core";

const UI_TYPES = [
  { 
    name: 'INPUT_TEXT',
    value: 'текстовое поле'
  },
  { 
    name: 'INPUT_NUMBER',
    value: 'числовое поле'
  },
  {
     name: 'INPUT_IMAGE',
     value: 'изображение'
  }, 
  {
    name: 'MULTI_SELECT',
    value: 'множественный выбор имеющихся элементов + создание новых'
  }
]

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

function CreateFieldPage() {
  const [isDefault, setIsDefault] = useState(false);
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [UIType, setUIType] = useState('');
  const [unit, setUnit] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchAddField({ name, label, description, is_default: isDefault, unit, ui_type: UIType})
      .then((res) => {
        const { field } = res.data;
        dispatch(addField(field));
        setName("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeLabel = (e) => {
    setLabel(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangeIsDefault = (e) => {
    setIsDefault((prev) => !prev);
  };

  const handleUITypeChange = (e) => {
    setUIType(e.target.value);
  };

  const handleChangeUnit = (e) => {
    setUnit(e.target.value);
  };



  return (
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControlLabel
            control={<Checkbox onChange={handleChangeIsDefault} size='medium' color="primary" />}
            label="Базовое поле"
            labelPlacement="start"
          />
          <TextField
            className={classes.input}
            label="Name"
            variant="outlined"
            color="primary"
            margin="normal"
            onChange={handleChangeName}
          />
          <TextField
            className={classes.input}
            label="Название"
            variant="outlined"
            color="primary"
            margin="normal"
            onChange={handleChangeLabel}
          />
          <TextField
            className={classes.input}
            label="Описание"
            variant="outlined"
            color="primary"
            margin="normal"
            onChange={handleChangeDescription}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={UIType}
              onChange={handleUITypeChange}
            >  
              {UI_TYPES.map((type) => (
                <MenuItem value={type.name}>{type.value}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className={classes.input}
            label="Ед. исчисления"
            variant="outlined"
            color="primary"
            margin="normal"
            onChange={handleChangeUnit}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            disabled={!name}
          >
            Добавить
          </Button>
        </form>
  );
}

export default CreateFieldPage;