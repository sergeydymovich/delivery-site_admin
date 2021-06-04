import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import { Box, CssBaseline } from "@material-ui/core";
import Layout from "components/elements/Layout/Layout";
import { useAppInit } from "hooks/useAppInit";
import OrdersPage from "components/pages/OrdersPage/OrdersPage";
import ProductsListPage from "components/pages/ProductsPages/ProductsListPage/ProductsListPage";
import CreateProductsPage from "components/pages/ProductsPages/CreateProductPage/CreateProductPage";
import CategoriesPage from "components/pages/CategoriesPage/CategoriesPage";
import IngredientsPage from "components/pages/IngredientsPage/IngredientsPage";
import ExtraIngredientsPage from "components/pages/ExtraIngredientsPage/ExtraIngredientsPage";

function App() {
  useAppInit();

  return (
    <Box display="flex">    
      <CssBaseline />       
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Layout>
          <Redirect from="/" to="/orders" />
          <Route path="/orders" component={OrdersPage} />
          <Route path="/categories" component={CategoriesPage} />
          <Route path="/ingredients" component={IngredientsPage} />
          <Route path="/extra-ingredients" component={ExtraIngredientsPage} />
          <Route exact strict path="/products" component={ProductsListPage} />
          <Route path="/products/create" component={CreateProductsPage} />
        </Layout>
      </Switch>
    </Box>
  );
}

export default App;
