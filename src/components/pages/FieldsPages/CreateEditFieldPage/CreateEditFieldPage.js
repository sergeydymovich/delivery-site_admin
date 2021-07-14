import {
  Button,
  makeStyles,
  TextField,
  FormControlLabel,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Container,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { fieldsApi } from "api/api";
import { addField, editField } from "reducers/fieldsSlice";
import { useDispatch } from "react-redux";
import { Checkbox } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";

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
    name: 'SWITCH',
    value: 'переключатель'
  },
  {
    name: 'MULTI_SELECT_INGREDIENTS',
    value: 'мультиселект'
  },
  {
    name: 'PIZZA_SIZES',
    value: 'размеры пиццы'
  },
  
]

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    margin: '0 auto',
  },
  selectWrapper: {
    width: '100%',
  },
  input: {
    width: '100%',
  },
  submitBtn: {
    marginTop: '30px',
  },
}));

function CreateEditFieldPage() {
  const [isDefault, setIsDefault] = useState(false);
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [UIType, setUIType] = useState('');
  const [unit, setUnit] = useState("");
  const isValidField = name && label && description && UIType;
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataObj = {
      name,
      label,
      description,
      is_default: isDefault,
      unit,
      ui_type: UIType
    }

    if (location.state) {
      dataObj._id = location.state.field._id;

      fieldsApi.edit(dataObj)
      .then((res) => {
        const { field } = res.data;
        dispatch(editField(field));
        history.push('/fields');
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      fieldsApi.edit(dataObj)
      .then((res) => {
        const { field } = res.data;
        dispatch(addField(field));
        history.push('/fields');
      })
      .catch((err) => {
        console.log(err);
      });
    } 
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

  useEffect(() => {
    if (location.state) {
      const { name, label, description, is_default, unit, ui_type } = location.state.field;
      setName(name);
      setLabel(label);
      setDescription(description);
      setIsDefault(is_default);
      setUIType(ui_type);
      setUnit(unit);
    }
  }, [location])

  return (
      <Container>
        <Typography className={classes.title} variant="h4" component="h2">
          {location.state ? 'Форма редактирования поля' : 'Форма создания поля'}  
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControlLabel
            control={<Checkbox 
                      onChange={handleChangeIsDefault}
                      value={isDefault}
                      size='medium'
                      color="primary"
                    />}
            label="Базовое поле(для всех продуктов)"
            labelPlacement="start"
          />
          <TextField
            className={classes.input}
            label="Name"
            variant="outlined"
            color="primary"
            margin="normal"
            onChange={handleChangeName}
            value={name}
          />
          <TextField
            className={classes.input}
            label="Название"
            variant="outlined"
            color="primary"
            margin="normal"
            onChange={handleChangeLabel}
            value={label}
          />
          <TextField
            className={classes.input}
            label="Описание"
            variant="outlined"
            color="primary"
            margin="normal"
            onChange={handleChangeDescription}
            value={description}

          />
          <FormControl className={classes.selectWrapper}>
            <InputLabel id="demo-simple-select-label">Тип поля</InputLabel>
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
            label="Ед. исчисления/измерения"
            variant="outlined"
            color="primary"
            margin="normal"
            onChange={handleChangeUnit}
          />
          <Button
            className={classes.submitBtn}
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            disabled={!isValidField}
          >
            {location.state ? 'Изменить' : 'Добавить'}
          </Button>
        </form>
      </Container>
  );
}

export default CreateEditFieldPage;