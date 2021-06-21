import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { useSelector } from "react-redux";
import IngredientsTableRow from "./IngredientsTableRow";



function IngredientsTable() {
  const ingredients = useSelector((state) => state.ingredients.ingredientsArr);

  return (
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
          <IngredientsTableRow key={ingredient._id} ingredient={ingredient} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}

export default IngredientsTable;