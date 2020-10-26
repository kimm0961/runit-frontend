import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AdminEvents from "./AdminEvents";
import { useGlobal } from "reactn";
import Opret from "./AdminFeatures/Opret";
import Ret from "./AdminFeatures/Ret";
import Slet from "./AdminFeatures/Slet";
import AdminHome from "./AdminHome";
import AdminNavbar from "./AdminNavbar";

function AdminApp() {


  const [loggedIn] = useGlobal("loggedIn");

    if (!loggedIn) {
    return <Redirect to={{pathname: '/login'}} />
  }

  return (
    <>
      <header>
        <AdminNavbar />
      </header>
      <Switch>
        <Route exact path="/admin" component={AdminHome} />
        <Route path="/admin/adminevents" component={AdminEvents} />
        <Route path="/admin/opret" component={Opret} />
        <Route path="/admin/slet/:event_id" component={Slet} />
        <Route path="/admin/ret/:event_id" component={Ret} />
      </Switch>
    </>
  );
}

export default AdminApp;
