import Header from "../elements/Header/Header";
import Navigation from "../elements/Navigation/Navigation";
import { Switch, Route } from "react-router-dom";
import OrdersPage from "../pages/OrdersPage/OrdersPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import styles from "./App.module.css";
import { useAppInit } from "../../hooks/useAppInit";

function App() {
  useAppInit();

  return (
    <div className={styles.app}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/">
          <Header />
          <div className={styles.content}>
            <Navigation />
            <Route path="/orders" component={OrdersPage} />
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
