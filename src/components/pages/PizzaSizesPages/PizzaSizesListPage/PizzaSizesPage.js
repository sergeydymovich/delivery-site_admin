import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPizzaSizes, deletePizzaSize } from "reducers/pizzaSizesSlice";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
  Button,
} from "@material-ui/core";
import PizzaSizesTableRow from "./PizzaSizesTableRow";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { fetchDeletePizzaSize } from 'api/api';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: '100px',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

function PizzaSizesPage() {
  const pizzaSizes = useSelector(state => state.pizzaSizes.pizzaSizesArr);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleDeletePizzaSize = (id) => { 
    fetchDeletePizzaSize({ _id: id })
    .then((res) => {
      dispatch(deletePizzaSize(id));
    })
    .catch((err) => {
      console.log(err);
    });
  }


  useEffect(() => {
    if (!pizzaSizes.length) {
      dispatch(getPizzaSizes());
    }
  }, [dispatch, pizzaSizes.length]);

  return (
    <Container maxWidth="xl"> 
      <Box className={classes.wrapper}>
        <Typography variant="h4" component="h2">
          Размеры пиццы
        </Typography>
        <Link className={classes.link} to="/pizza-sizes/create">
          <Button variant="contained" size="large" color="primary">
            Добавить размер
          </Button>
        </Link>
      </Box>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell align='center'>Диаметр(см)</TableCell>
              <TableCell align='center'>Виды теста</TableCell>
              <TableCell align="right">Инструменты</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pizzaSizes.map((pizzaSize) => (
              <PizzaSizesTableRow
                key={pizzaSize._id}
                pizzaSize={pizzaSize}
                handleDeleteSize={handleDeletePizzaSize}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default PizzaSizesPage;