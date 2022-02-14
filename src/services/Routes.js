import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoutes.js";
import Welcome from "../pages/Welcome.js";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Welcome} />
      <PrivateRoute />
    </Switch>
  </BrowserRouter>
);

export default Routes;
