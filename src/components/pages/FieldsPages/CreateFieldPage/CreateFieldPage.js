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

    if (name && label && description && UIType) {
      const dataObj = {
        name,
        label,
        description,
        is_default: isDefault,
        unit,
        ui_type: UIType
      }
  
      fetchAddField(dataObj)
        .then((res) => {
          const { field } = res.data;
          dispatch(addField(field));
          setName('');
          setLabel('');
          setDescription('');
          setUIType('');
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



  return (
      <Container>
        <Typography variant="h4" component="h2">
          Форма создания поля
        </Typography>
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
            // disabled={!name}
          >
            Добавить
          </Button>
        </form>
      </Container>
  );
}

export default CreateFieldPage;