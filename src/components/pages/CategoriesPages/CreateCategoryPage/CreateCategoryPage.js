import React, { useEffect, useState } from "react";
import { fetchAddCategory, fetchChangeCategory } from "api/api";
import { addCategory, changeCategory } from "reducers/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Checkbox,
  Container,
  List,
  ListItemText,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
  },
  title: {
    marginBottom: '30px',
  },
  input: {
    marginBottom: '20px',
  },
  selectWrapper: {
    marginBottom: '30px',
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function CreateCategoryPage() {
  const fields = useSelector(state => state.fields.fieldsArr);
  const [name, setName] = useState("");
  const [leftFields, setLeftFields] = useState([]);
  const [rightFields, setRightFields] = useState([]);
  const countDefaultFields = rightFields.filter((field) => field.is_default).length;
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryFields = rightFields.map((field) => field._id);


    if (location.state) {
      fetchChangeCategory({
        _id: location.state.category._id,
        name,
        fields: categoryFields
      })
      .then((res) => {
        const { category } = res.data;
        dispatch(changeCategory(category));
        history.push('/categories');
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      fetchAddCategory({
        name,
        fields: categoryFields
      })
        .then((res) => {
          const { category } = res.data;
          dispatch(addCategory(category));
          history.push('/categories');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCategoryName = (e) => {
    setName(e.target.value);
  };

  const toggleCheckedField = (id, isLeftFields) => {
    if (isLeftFields) {
      const updatedFields = leftFields.map((field) => (
        field._id === id ?  {...field, isChecked: !field.isChecked} : field
      ));
      setLeftFields(updatedFields);
    } else {
      const updatedFields = rightFields.map((field) => (
        field._id === id ? {...field, isChecked: !field.isChecked} : field
      ));
      setRightFields(updatedFields);
    }

  }

  const handleAllRight = () => {
    setRightFields([...rightFields, ...leftFields]);;
    setLeftFields([]);
  };

  const handleCheckedRight = () => {
    const updatedLeftFields = leftFields.filter((field) => !field.isChecked);
    const checkedLeftFields = leftFields.filter((field) => field.isChecked);
    setLeftFields(updatedLeftFields);
    setRightFields([...rightFields, ...checkedLeftFields]);
  };

  const handleCheckedLeft = () => {
    const updatedRightFields = rightFields.filter((field) => !field.isChecked);
    const checkedRightFields = rightFields.filter((field) => (field.isChecked && !field.is_default));
    setRightFields(updatedRightFields);
    setLeftFields([...leftFields, ...checkedRightFields]);
  };

  const handleAllLeft = () => {
    const updatedRightFields = rightFields.filter((field) => field.is_default);
    const newLeftFields = rightFields.filter((field) => !field.is_default);
    setRightFields(updatedRightFields);
    setLeftFields([...leftFields, ...newLeftFields]);
  };

  useEffect(() => {
    if (location.state) {
      const { category } = location.state;
      const leftValues = fields.filter((field) => category.fields.find((elem) =>  field._id === elem._id) === undefined);
      setRightFields(category.fields);
      setLeftFields(leftValues);
      setName(category.name);
    } else {
      const leftValues = fields.filter((field) => !field.is_default)
      const rightValues = fields.filter((field) => field.is_default)
      setLeftFields(leftValues);
      setRightFields(rightValues);
    }
  }, [fields, location.state])

  const CustomList = ({ fields, isLeftFields }) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {fields.map((field) => (
            <ListItem key={field._id} role="listitem" button>
                <Checkbox
                  color="primary"
                  onChange={() => toggleCheckedField(field._id, isLeftFields)}
                  checked={field.is_default || field.isChecked}
                  disabled={field.is_default}
                />
              <ListItemText primary={field.description} />
            </ListItem>
          )
        )}
      </List>
    </Paper>
  );

  return (
      <Container maxWidth="xl">
        <Typography className={classes.title} variant="h4" component="h2">
            Форма {location.state ? 'редактирования' : 'создания'} категории
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            className={classes.input}
            id="outlined-secondary"
            label="Название категории"
            variant="outlined"
            color="primary"
            margin="normal"
            onChange={handleCategoryName}
            value={name}
          />   
          <Grid 
            container
            spacing={2}
            justify="center"
            alignItems="center"
            className={classes.selectWrapper}
          >
            <Grid item>
              <CustomList isLeftFields fields={leftFields} />
            </Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  onClick={handleAllRight}
                  disabled={leftFields.length === 0}
                >
                  ≫
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  onClick={handleCheckedRight}
                  disabled={leftFields.filter((field) => field.isChecked).length === 0}
                >
                  &gt;
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  onClick={handleCheckedLeft}
                  disabled={rightFields.filter((field) => field.isChecked).length === 0}
                >
                  &lt;
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  onClick={handleAllLeft}
                  disabled={rightFields.length === countDefaultFields}
                >
                  ≪
                </Button>
              </Grid>
              </Grid>
            <Grid item>
              <CustomList fields={rightFields} />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            disabled={!name}
          >
            {location.state ? 'Изменить' : 'Добавить'}
          </Button>
        </form>
      </Container>
  );
}

export default CreateCategoryPage;
