import React from "react";
import { IconButton, TableCell, TableRow } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link } from "react-router-dom";

function PizzaSizesTableRow({ pizzaSize, handleDeleteSize }) {
 
  return (
          <TableRow>
            <TableCell component="th" scope="row">
              {pizzaSize.name}
            </TableCell>
            <TableCell align='center'>
              {pizzaSize.size}
            </TableCell>
            <TableCell align='center'>
              {pizzaSize.dough.map((size) => size.name).join(', ')}
            </TableCell>
            <TableCell component="th" align="right" scope="row">
            <Link
              to={{
                  pathname: "/pizza-sizes/change",
                  state: {
                    pizzaSize
                  },
                }}
            >
              <IconButton>
                <CreateIcon size="small" />
              </IconButton>
            </Link>
                <IconButton onClick={() => handleDeleteSize(pizzaSize._id)}>
                  <DeleteForeverIcon size="small" />
                </IconButton>
            </TableCell>
          </TableRow>
  );
}

export default PizzaSizesTableRow;