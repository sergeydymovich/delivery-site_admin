import React from "react";
import { TableCell, TableRow } from "@material-ui/core";
import { format } from "date-fns";


function OrdersTableRow({ order }) {

  return (
          <TableRow>
            <TableCell component="th" scope="row">
              №{order.orderNumber}
            </TableCell>
            <TableCell>
              {order.products.map((product, i) => i === order.products.length - 1 ? product :  product + ", ")}
            </TableCell>
            <TableCell>
              {order.status}
            </TableCell>
            <TableCell>
              {format(new Date(order.createdAt), 'd/M/yy HH:mm')}
            </TableCell>
            <TableCell>
              {order.name}
            </TableCell>
            <TableCell>
              {order.phone}
            </TableCell>
          </TableRow>
  );
}

export default OrdersTableRow;