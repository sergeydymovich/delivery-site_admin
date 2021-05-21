import Navigation from "../elements/Navigation/Navigation";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import { useAppInit } from "../../hooks/useAppInit";
import OrdersPage from "components/pages/OrdersPage/OrdersPage";
import { makeStyles } from "@material-ui/core";
import ProductsPage from "components/pages/ProductsPage/ProductsPage";
import CreateProductsPage from "components/pages/ProductsPage/CreateProductsPage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function App() {
  // useAppInit();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/">
          <Navigation />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Route path="/orders" component={OrdersPage} />
            <Route exact strict path="/products" component={ProductsPage} />
            <Route
              exact
              strict
              path="/products/create"
              component={CreateProductsPage}
            />
          </main>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
