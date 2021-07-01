import React from "react";
import { IconButton, TableCell, TableRow } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import { Link } from "react-router-dom";

function CategoriesTableRow({ category }) {

  return (
          <TableRow>
            <TableCell component="th" scope="row">
              {category.name}
            </TableCell>
            <TableCell align="right">
              {category.fields.map((field) => field.label).join(', ')}
            </TableCell>
            <TableCell component="th" align="right" scope="row">
              <Link
                  to={{
                    pathname: "/categories/change",
                    state: {
                      category
                    },
                  }}
                >
                  <IconButton  aria-label="change">
                    <CreateIcon aria-label="change" size="small" />
                  </IconButton>
              </Link>
            </TableCell>
          </TableRow>
  );
}

export default CategoriesTableRow;