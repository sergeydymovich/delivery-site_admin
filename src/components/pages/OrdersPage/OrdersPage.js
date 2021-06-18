import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOrders } from "reducers/ordersSlice";
import OrdersTable from "./OrdersTable";
import { Link } from "react-router-dom";
import { format, startOfToday } from 'date-fns'

const useStyles = makeStyles((theme) => ({
  linkWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  link: {
    color: 'blue'
  },
}));

function OrdersPage() {
  const dispatch = useDispatch();
  const classes = useStyles(); 

  useEffect(() => {
    const startDate = format(startOfToday(), 'Pp') ;
    dispatch(getOrders({ startDate }));
  },[dispatch])

  return (
    <Container  maxWidth="xl">
      <Box className={classes.linkWrapper}>
        <Typography variant="h4" component="h2">
          Текущие заказы
        </Typography>
        <Link className={classes.link} to="#">
           История заказов
        </Link>
      </Box> 
     
      <OrdersTable />
    </Container>
  );
}

export default OrdersPage;
