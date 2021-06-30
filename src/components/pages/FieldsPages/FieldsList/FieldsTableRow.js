import React from "react";
import {  TableCell, TableRow } from "@material-ui/core";

function FieldsTableRow({ field }) {

  return (
          <TableRow>
            <TableCell>
              {field.name}
            </TableCell>
            <TableCell>
              {field.label}
            </TableCell>
            <TableCell>
              {field.description}
            </TableCell>
            <TableCell>
              {field.unit || '-'}
            </TableCell>
            <TableCell>
              {field.is_default ? 'Да' : "Нет"}
            </TableCell>
          </TableRow>
  );
}

export default FieldsTableRow;