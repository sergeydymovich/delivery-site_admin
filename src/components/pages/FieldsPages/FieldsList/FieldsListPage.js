import { Box, Button, Container, Typography} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFields } from 'reducers/fieldsSlice';
import { getPizzaSizes } from 'reducers/pizzaSizesSlice';
import FieldsTable from "components/pages/FieldsPages/FieldsList/FieldsTable";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: '100px',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

function FieldsPage() {
  const fields = useSelector(state => state.fields.fieldsArr);
  const pizzaSizes = useSelector(state => state.pizzaSizes.pizzaSizesArr);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (!fields.length) {
      dispatch(getFields());
    }

    if (!pizzaSizes.length) {
      dispatch(getPizzaSizes());
    }

  }, [dispatch, fields.length, pizzaSizes.length]);

  return (
    <Container  maxWidth="xl">
      <Box className={classes.wrapper}>
        <Typography variant="h4" component="h2">
          Поля продуктов
        </Typography>
        <Link className={classes.link} to="/fields/create">
          <Button variant="contained" size="large" color="primary">
            Добавить поле
          </Button>
        </Link>
      </Box>
      <FieldsTable />
    </Container>
  );
}

export default FieldsPage;