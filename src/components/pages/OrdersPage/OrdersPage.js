import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActivePage, getOrders } from "reducers/ordersSlice";
import OrdersTable from "./OrdersTable";
import { Link } from "react-router-dom";
import { format, startOfToday } from 'date-fns'

const useStyles = makeStyles((theme) => ({
  linkWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: "100px",
  },
  link: {
    color: 'blue'
  },
}));

function OrdersPage() {
  const activePage = useSelector((state) => state.orders.requestOptions.activePage);
  const dispatch = useDispatch();
  const classes = useStyles(); 

  useEffect(() => { 
    const startDate = format(startOfToday(), 'Pp');
    dispatch(getOrders({ startDate }));
  },[activePage, dispatch])

  return (
    <Container  maxWidth="xl">
      <Box className={classes.linkWrapper}>
        <Typography variant="h4" component="h2">
          Текущие заказы
        </Typography>
        <Link className={classes.link} to="/orders/history">
           История заказов
        </Link>
      </Box>    
      <OrdersTable />
    </Container>
  );
}

export default OrdersPage;
