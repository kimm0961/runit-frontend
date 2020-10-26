import React from "react";
import { useGlobal } from "reactn";
import { NavLink, useHistory } from "react-router-dom";
import { BrugerLogout } from "../helpers/APIkald/apikald";

function AdminNavbar() {

  const [global, setGlobal] = useGlobal("loggedIn")

  const history = useHistory();

  const handleLogout = () => {

    BrugerLogout().then(response => {
      setGlobal(false);
      history.push("/");

    })
  };

  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-danger col-lg-9 py-0">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto text-uppercase">
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin">
              Home Admin
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/adminevents">
              Admin Events
            </NavLink>
          </li>
          <li className="nav-item">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logud
          </button>
        </li>
        </ul>
      </div>
    </nav>
  );
}

export default AdminNavbar;
