import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import { Box, CssBaseline } from "@material-ui/core";
import Layout from "components/elements/Layout/Layout";
import { useAppInit } from "hooks/useAppInit";
import OrdersPage from "components/pages/OrdersPage/OrdersPage";
import ProductsListPage from "components/pages/ProductsPages/ProductsListPage/ProductsListPage";
import CreateProductsPage from "components/pages/ProductsPages/CreateProductPage/CreateProductPage";
import CategoriesListPage from "components/pages/CategoriesPages/CategoriesListPage/CategoriesPage";
import IngredientsPage from "components/pages/IngredientsPage/IngredientsPage";
import ExtraIngredientsPage from "components/pages/ExtraIngredientsPage/ExtraIngredientsPage";
import PizzaSizesPage from "components/pages/PizzaSizesPages/PizzaSizesPage/PizzaSizesPage";
import CreatePizzaSizePage from "components/pages/PizzaSizesPages/CreatePizzaSizePage/CreatePizzaSizePage";
import FieldsListPage from "components/pages/FieldsPages/FieldsList/FieldsListPage";
import CreateFieldPage from "components/pages/FieldsPages/CreateFieldPage/CreateFieldPage";
import CreateCategoryPage from "components/pages/CategoriesPages/CreateCategoryPage/CreateCategoryPage";

function App() {
  useAppInit();

  return (
    <Box display="flex">    
      <CssBaseline />       
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Layout>
          <Redirect from="/" to="/orders" />
          <Route exact strict path="/orders" component={OrdersPage} />
          <Route exact strict path="/categories" component={CategoriesListPage} />
          <Route path="/categories/create" component={CreateCategoryPage} />
          <Route path="/categories/change" component={CreateCategoryPage} />
          <Route path="/ingredients" component={IngredientsPage} />
          <Route path="/extra-ingredients" component={ExtraIngredientsPage} />
          <Route exact strict path="/products" component={ProductsListPage} />
          <Route path="/products/create" component={CreateProductsPage} />
          <Route path="/products/change" component={CreateProductsPage} />
          <Route exact strict path="/pizza-sizes" component={PizzaSizesPage} />
          <Route path="/pizza-sizes/create" component={CreatePizzaSizePage} />
          <Route path="/pizza-sizes/change" component={CreatePizzaSizePage} />
          <Route exact strict path="/fields" component={FieldsListPage} />
          <Route path="/fields/create" component={CreateFieldPage} />
          <Route path="/fields/change" component={CreateFieldPage} />
        </Layout>
      </Switch>
    </Box>
  );
}

export default App;
