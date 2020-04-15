import React from "react";
import Register from './components/register/register';
import Landing from './components/landing.page.js';
import Login from './components/login/login'
import Dashboard from './components/authentication/dashboard/dashboard';
import PrivateRoute from './components/authentication/privateRoutes';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

export default function App() {
  return (
    <Router>
    
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/login" render={(props) => <Login {...props} />}/>
          {/* <Route
            exact
            path="/login/needSignIn"
            render={(props) => <Login {...props} />}
          /> */}
          <Route path="/register">
            <Register/>
          </Route>
          <Route exact path="/">
            <Landing/>
          </Route>
        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
         <Route path="*">
           404 GG
         </Route>
         
        </Switch>
    </Router>
  );
}
