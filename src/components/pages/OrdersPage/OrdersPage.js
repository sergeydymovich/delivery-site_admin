import { Box, Container, makeStyles, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, changeFilterWord, setInitialState } from "reducers/ordersSlice";
import OrdersTable from "./OrdersTable";
import { format, subDays } from 'date-fns'
import { debounce } from 'throttle-debounce';
import { Button } from "@material-ui/core";

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
  searchInput: {
    marginLeft: 'auto',
    marginRight: '50px',
  },
  toggleBtn: {
    width: '200px',
  }
}));

function OrdersPage() {
  const activePage = useSelector((state) => state.orders.requestOptions.activePage);
  const filterWord = useSelector((state) => state.orders.requestOptions.filterWord);
  const [is24hOrders, setIs24hOrders] = useState(true);
  const dispatch = useDispatch();
  const classes = useStyles(); 

  const toggleShowOrders = () => {
    setIs24hOrders(prev => !prev);
    dispatch(setInitialState());
  }

  const handleChangeFilterWord = (e) => {
    dispatch(changeFilterWord(e.target.value.trim()));
  }

  const debounceFunc = debounce(700, handleChangeFilterWord);

  useEffect(() => { 
    const findObj = {};

    if (is24hOrders) {
      findObj.startDate = format(subDays(new Date(), 1), 'Pp');
      findObj.noLimit = true;        
    }

    dispatch(getOrders(findObj));
  },[activePage, is24hOrders, filterWord, dispatch])

  return (
    <Container  maxWidth="xl">
      <Box className={classes.linkWrapper}>
        <Typography variant="h4" component="h2">
          {is24hOrders ? 'Заказы за 24 часа' : 'История заказов'}
        </Typography>
        {!is24hOrders &&
          <TextField
            className={classes.searchInput}
            onChange={debounceFunc}
            defaultValue={filterWord}
            label="Поиск по номеру тел."
            type="search"
            variant="outlined"
            size='small'
          />
        }    
        <Button
          className={classes.toggleBtn}
          onClick={toggleShowOrders} 
          variant="contained"
          size="large"
          color="primary"
        >
          {is24hOrders ? 'История заказов' : 'Заказы за 24 часа'}
        </Button>
      </Box>    
      <OrdersTable is24hOrders={is24hOrders} />
    </Container>
  );
}

export default OrdersPage;
