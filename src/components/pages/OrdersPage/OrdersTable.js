import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import OrdersTableRow from "./OrdersTableRow";
import { changeActivePage, getOrders } from 'reducers/ordersSlice';
import Pagination from "@material-ui/lab/Pagination";
import { format, startOfToday } from "date-fns";

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px',
  }
}));

function OrdersTable() {
  const orders = useSelector((state) => state.orders.ordersArr);
  const activePage = useSelector((state) => state.orders.requestOptions.activePage);
  const pagesAmount = useSelector((state) => state.orders.requestOptions.pagesAmount);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handlePageChange = (event, value) => {
    dispatch(changeActivePage(value));
   };

   useEffect(() => {
    const startDate = format(startOfToday(), 'Pp') ;
    dispatch(getOrders({ startDate }));
  },[activePage, dispatch])

  return (
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Номер заказа</TableCell>
              <TableCell>Продукты</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Дата/Время</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Номер</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
             <OrdersTableRow key={order._id} order={order} />
            ))}
          </TableBody>
        </Table>
        <Pagination
          className={classes.pagination}
          count={pagesAmount}
          page={activePage}
          onChange={handlePageChange}
        />
      </TableContainer>
  );
}

export default OrdersTable;