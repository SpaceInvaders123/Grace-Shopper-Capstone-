import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import SingleSock from "./components/SingleSock";
import NotFound from "./components/NotFound";

/* This component uses this Switch component from React-Router that 
renders the first matching route that is defined within it. 
For now we only have a single route, 
it looks for / and renders the Home component when matched.
 We are also using the exact prop to ensure that it matches 
 the / route exactly. This is because the path / will also 
 match any route that starts with a / */

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/socks/:sockId">
        <SingleSock />
      </Route>
      <NotFound />
    </Switch>
  );
}
