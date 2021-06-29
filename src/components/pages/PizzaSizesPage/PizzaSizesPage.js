import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPizzaSizes } from "reducers/pizzaSizesSlice";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import PizzaSizesTableRow from "./PizzaSizesTableRow";

function PizzaSizesPage() {
  const pizzaSizes = useSelector(state => state.pizzaSizes.pizzaSizesArr);
  const dispatch = useDispatch();


  useEffect(() => {
    if (!pizzaSizes.length) {
      dispatch(getPizzaSizes());
    }
  }, [dispatch, pizzaSizes.length]);

  return (
    <Container maxWidth="xl"> 
      <Typography variant="h4" component="h2">
          Размеры пиццы
      </Typography> 
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell align='center'>Диаметр(см)</TableCell>
              <TableCell align="right">Инструменты</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pizzaSizes.map((pizzaSize) => (
             <PizzaSizesTableRow key={pizzaSize._id} pizzaSize={pizzaSize} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default PizzaSizesPage;