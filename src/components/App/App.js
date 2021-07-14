import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import { Box, CssBaseline } from "@material-ui/core";
import Layout from "components/elements/Layout/Layout";
import { useAppInit } from "hooks/useAppInit";
import OrdersPage from "components/pages/OrdersPage/OrdersPage";
import ProductsListPage from "components/pages/ProductsPages/ProductsListPage/ProductsListPage";
import CreateEditProductsPage from "components/pages/ProductsPages/CreateEditProductPage/CreateEditProductPage";
import CategoriesListPage from "components/pages/CategoriesPages/CategoriesListPage/CategoriesPage";
import IngredientsPage from "components/pages/IngredientsPage/IngredientsPage";
import ExtraIngredientsPage from "components/pages/ExtraIngredientsPage/ExtraIngredientsPage";
import PizzaSizesPage from "components/pages/PizzaSizesPages/PizzaSizesPage/PizzaSizesPage";
import CreateEditPizzaSizePage from "components/pages/PizzaSizesPages/CreateEditPizzaSizePage/CreateEditPizzaSizePage";
import FieldsListPage from "components/pages/FieldsPages/FieldsList/FieldsListPage";
import CreateEditFieldPage from "components/pages/FieldsPages/CreateEditFieldPage/CreateEditFieldPage";
import CreateEditCategoryPage from "components/pages/CategoriesPages/CreateEditCategoryPage/CreateEditCategoryPage";

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
          <Route path="/categories/create" component={CreateEditCategoryPage} />
          <Route path="/categories/change" component={CreateEditCategoryPage} />

          <Route path="/ingredients" component={IngredientsPage} />

          <Route path="/extra-ingredients" component={ExtraIngredientsPage} />

          <Route exact strict path="/products" component={ProductsListPage} />
          <Route path="/products/create" component={CreateEditProductsPage} />
          <Route path="/products/change" component={CreateEditProductsPage} />

          <Route exact strict path="/pizza-sizes" component={PizzaSizesPage} />
          <Route path="/pizza-sizes/create" component={CreateEditPizzaSizePage} />
          <Route path="/pizza-sizes/change" component={CreateEditPizzaSizePage} />
          
          <Route exact strict path="/fields" component={FieldsListPage} />
          <Route path="/fields/create" component={CreateEditFieldPage} />
          <Route path="/fields/change" component={CreateEditFieldPage} />
        </Layout>
      </Switch>
    </Box>
  );
}

export default App;
