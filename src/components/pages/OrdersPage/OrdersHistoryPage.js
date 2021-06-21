import { Box, Container, debounce, makeStyles, TextField, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActivePage, getOrders } from "reducers/ordersSlice";
import OrdersTable from "./OrdersTable";

const useStyles = makeStyles((theme) => ({
  searchWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: "100px",
  }
}));

function OrdersHistoryPage() {
  const activePage = useSelector((state) => state.orders.requestOptions.activePage);
  const dispatch = useDispatch();
  const classes = useStyles(); 

  const handleChangeFilterWord = (e) => {
      console.log(e.target.value)
  }

  const debounceFunc = debounce(700, handleChangeFilterWord);

  useEffect(() => {
    dispatch(getOrders({}));
  },[dispatch, activePage])

  return (
    <Container  maxWidth="xl">
      <Box className={classes.searchWrapper}>
        <Typography variant="h4" component="h2">
          История заказов
        </Typography>
        <TextField
          onChange={debounceFunc}
          label="Поиск по номеру тел."
          type="search"
          variant="outlined"
          size='small'
        />
      </Box> 
      <OrdersTable />
    </Container>
  );
}

export default OrdersHistoryPage;