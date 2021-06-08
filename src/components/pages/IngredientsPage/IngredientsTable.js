import React from "react";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { useSelector } from "react-redux";
import CreateIcon from "@material-ui/icons/Create";


function IngredientsTable() {
  const ingredients = useSelector((s) => s.ingredients.ingredientsArr);

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
  );
}

export default IngredientsTable;