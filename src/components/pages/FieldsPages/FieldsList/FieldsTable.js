import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { useSelector } from "react-redux";
import FieldsTableRow from "components/pages/FieldsPages/FieldsList/FieldsTableRow";



function FieldsTable() {
  const fields = useSelector((state) => state.fields.fieldsArr);

  return (
    <TableContainer>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Название поля</TableCell>
          <TableCell>Описание</TableCell>
          <TableCell>Единица исчисления</TableCell>
          <TableCell>Базовое поле</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {fields.map((field) => (
          <FieldsTableRow key={field._id} field={field} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}

export default FieldsTable;