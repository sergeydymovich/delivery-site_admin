import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import ExtraIngredientsTableRow from "./ExtraIngredientsTableRow";

function ExtraIngredientsTable() {
  const ingredients = useSelector((state) => state.extraIngredients.extraIngredientsArr);

  return (
    <TableContainer>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Название</TableCell>
          <TableCell align="center">Фото</TableCell>
          <TableCell align="right">Цена</TableCell>
          <TableCell align="right">Дата создания</TableCell>
          <TableCell align="right">Инструменты</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {ingredients.map((ingredient) => (
          <ExtraIngredientsTableRow ingredient={ingredient} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}

export default ExtraIngredientsTable;