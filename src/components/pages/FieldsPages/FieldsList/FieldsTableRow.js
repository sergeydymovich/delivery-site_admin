import React from "react";
import {  makeStyles, TableCell, TableRow, IconButton, Tooltip } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link } from "react-router-dom";
import cn from "classnames/bind";

const useStyles = makeStyles((theme) => ({
  tableRow: {
    height: '80px',
  },
  baseField: {
    backgroundColor: theme.palette.grey[100],
  },
  noPizzaSizes: {
    backgroundColor: theme.palette.warning.light,
  }
}));

function FieldsTableRow({ field, handleDeleteField, pizzaSizes }) {
  const classes = useStyles();

  return (
          <TableRow 
            className={cn({
              [classes.tableRow]: true,
              [classes.baseField]: field.is_base,
              [classes.noPizzaSizes]: field.name === 'pizza_sizes' && !pizzaSizes,
            })}
          >
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
            {}
            <TableCell>
              {!field.is_base &&
              <>
                <Link
                    to={{
                      pathname: "/fields/change",
                      state: {
                        field
                      },
                    }}
                  >
                    <IconButton  aria-label="change">
                      <CreateIcon aria-label="change" size="small" />
                    </IconButton>
                </Link>
                <IconButton onClick={() => handleDeleteField(field._id)}>
                  <DeleteForeverIcon size="small" />
                </IconButton>
              </>
              }
              {field.name === 'pizza_sizes' &&
              <Link to="/pizza-sizes">
                <IconButton  aria-label="change">
                  <Tooltip
                    open={!pizzaSizes}
                    title="для использования данного поля, его необходимо настроить"
                    arrow
                  >
                    <CreateIcon aria-label="change" size="small" />
                  </Tooltip>
                </IconButton>   
              </Link>
              }
            </TableCell>
          </TableRow>
  );
}

export default FieldsTableRow;