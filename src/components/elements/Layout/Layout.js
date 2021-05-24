import Navigation from "components/elements/Navigation/Navigation";
import { Route } from "react-router-dom";
import OrdersPage from "components/pages/OrdersPage/OrdersPage";
import { makeStyles } from "@material-ui/core";
import ProductsListPage from "components/pages/ProductsPages/ProductsListPage/ProductsListPage";
import CreateProductsPage from "components/pages/ProductsPages/CreateProductPage/CreateProductPage";
import CategoriesListPage from "components/pages/CategoriesPages/CategoriesListPage/CategoriesListPage";
import CreateCategoryPage from "components/pages/CategoriesPages/CreateCategoryPage/CreateCategoryPage";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function Layout() {
  const classes = useStyles();

  return (
    <>
      <Navigation />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path="/orders" component={OrdersPage} />
        <Route exact strict path="/products" component={ProductsListPage} />
        <Route
          exact
          strict
          path="/products/create"
          component={CreateProductsPage}
        />
        <Route exact strict path="/categories" component={CategoriesListPage} />
        <Route
          exact
          strict
          path="/categories/create"
          component={CreateCategoryPage}
        />
      </main>
    </>
  );
}

export default Layout;
