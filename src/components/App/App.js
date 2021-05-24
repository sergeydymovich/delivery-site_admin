import { Switch, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import { Box, CssBaseline } from "@material-ui/core";
import Layout from "components/elements/Layout/Layout";
import { useAppInit } from "hooks/useAppInit";

function App() {
  useAppInit();
  return (
    <Box display="flex">
      <CssBaseline />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/">
          <Layout />
        </Route>
      </Switch>
    </Box>
  );
}

export default App;
