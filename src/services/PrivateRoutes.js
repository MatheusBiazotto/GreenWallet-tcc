import { Route, Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Register_Login from "../pages/Register_Login";
import Dashboard from "../pages/Dashboard.js";
import Erro from "../pages/Error404.js"

import isLogged from "./auth";
const auth = isLogged();

function PrivateRoute() {
  const pathname = useLocation().pathname

  if (auth === true) {
    switch (pathname) {
      case "/dashboard/panel":
        return <Route path="/dashboard/panel" component={Dashboard} />
      
      case "/dashboard/settings":
        return <Route path="/dashboard/settings" component={Dashboard} />
      
      case "/dashboard/quotation":
        return <Route path="/dashboard/quotation" component={Dashboard} />
      
      case "/dashboard/history":
        return <Route path="/dashboard/history" component={Dashboard} />
      
      case "/dashboard/wallet":
        return <Route path="/dashboard/wallet" component={Dashboard} />
      
      case "/login":
        return (
          <>          
            <Route path="/login">
              <Redirect from="/login" to="/dashboard/panel" />
            </Route>      
          </>
        );
      
      case "/register":
        return (
          <>              
            <Route path="/register">
              <Redirect from="/login" to="/dashboard/panel" />
            </Route>      
          </>
        );
      
      default: return <Route component={Erro} />
    }
  } else {
    
    switch (pathname) {
      case "/dashboard/panel":
        return (
          <Route path="/dashboard/panel">
            <Redirect from="/dashboard/panel" to="/login" />
          </Route>
        )
      
      case "/dashboard/settings":
        return (
          <Route path="/dashboard/settings">
            <Redirect from="/dashboard/settings" to="/login" />
          </Route>
        )
      
      case "/dashboard/quotation":
        return (
          <Route path="/dashboard/quotation">
            <Redirect from="/dashboard/quotation" to="/login" />
          </Route>
        )
      
      case "/dashboard/history":
        return (
          <Route path="/dashboard/history">
            <Redirect from="/dashboard/history" to="/login" />
          </Route>
        )
      
      case "/dashboard/wallet":
        return (
          <Route path="/dashboard/wallet">
            <Redirect from="/dashboard/wallet" to="/login" />
          </Route>
        )
      
      case "/login":
        return <Route exact path="/login" component={Register_Login} />
      
      case "/register":
        return <Route path="/register" component={Register_Login} />
      
      default: return <Route component={Erro} />
    }
  }
}

export default PrivateRoute;
