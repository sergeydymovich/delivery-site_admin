import React, { useEffect, useState } from "react";
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
import { changeActivePage } from 'reducers/ordersSlice';
import Pagination from "@material-ui/lab/Pagination";
import { sortOrdersArray } from 'utils/sortOrdersArray.utils';

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px',
  }
}));

function OrdersTable({ is24hOrders }) {
  const stateOrders = useSelector((state) => state.orders.ordersArr);
  const stateActivePage = useSelector((state) => state.orders.requestOptions.activePage);
  const pagesAmount = useSelector((state) => state.orders.requestOptions.pagesAmount);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handlePageChange = (event, value) => {
      dispatch(changeActivePage(value));
  };


   useEffect(() => {
    if (is24hOrders) {
      const sortedArr = sortOrdersArray(stateOrders);
      setOrders(sortedArr);
    } else {
      setOrders(stateOrders);
    }
   }, [is24hOrders, stateActivePage, stateOrders])

    
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
        {!is24hOrders && 
          <Pagination
            className={classes.pagination}
            count={pagesAmount}
            page={stateActivePage}
            onChange={handlePageChange}
          />  
        }   
      </TableContainer>
  );
}

export default OrdersTable;