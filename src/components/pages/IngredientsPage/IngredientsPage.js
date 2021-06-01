import React, { useEffect } from "react";
import CreateIngredientForm from "./CreateIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "reducers/ingredientsSlice";
import CreateIcon from "@material-ui/icons/Create";
import {
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

function IngredientsPage() {
  const ingredients = useSelector((s) => s.ingredients.ingredientsArr);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients.length]);

  return (
    <Container maxWidth="xl">
      <CreateIngredientForm />
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell align="right">Дата создания</TableCell>
              <TableCell align="right">Инструменты</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((ingredient) => (
              <TableRow key={ingredient._id}>
                <TableCell component="th" scope="row">
                  {ingredient.name}
                </TableCell>
                <TableCell align="right">
                  {new Date(ingredient.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell component="th" align="right" scope="row">
                  <IconButton aria-label="change">
                    <CreateIcon aria-label="change" size="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default IngredientsPage;
