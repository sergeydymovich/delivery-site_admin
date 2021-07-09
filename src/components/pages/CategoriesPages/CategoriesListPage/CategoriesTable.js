import React from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import CategoriesTableRow from "./CategoriesTableRow";


function CategoriesTable() {
  const categories = useSelector((s) => s.categories.categoriesArr);

  return (
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell align='center'>Поля</TableCell>
              <TableCell align="right">Инструменты</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
             <CategoriesTableRow key={category._id} category={category} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}

export default CategoriesTable;