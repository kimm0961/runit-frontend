import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import AdminApp from "./components/ADMIN/AdminApp";
import Login from "./components/Login/Login";

function AppController() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="*/admin*" component={AdminApp} />
          <Route path="/login" component={Login} />
          <Route path="/" component={App} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default AppController;
