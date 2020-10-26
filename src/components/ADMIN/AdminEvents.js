import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { hentAlleEvents } from "../helpers/APIkald/apikald"
  

function AdminEvents() {
  //* State Admin */

  const [Admin, setAdmin] = useState([]);

  //* useEffect */

  useEffect(() => {

      hentAlleEvents().then(setAdmin);


  }, []);

  //* Map */

  let AdminList = <h2>Loader...</h2>;

  if (Admin.length > 0) {
    AdminList = Admin.map(e => {
      return (
        <tr key={e._id}>
          <td className="font-weight-lighter">{e._id}</td>
          <td className="font-weight-bold">{e.titel}</td>
          <td className="font-italic">{e.dato}</td>
          <td>{e.distance}</td>
          <td>{e.pris}</td>
          <td>{e.antalpladser}</td>
          <td>
            <Link to={"/admin/ret/" + e._id}>
            <button type="button" className="btn btn-primary">
              <span role="img" aria-label="ret">
                &#9998;
              </span>
              </button>
            </Link>
          </td>
          <td>
            <Link to={"/admin/slet/" + e._id}>
            <button type="button" className="btn btn-danger"><span role="img" aria-label="delete">
                &#10060;
              </span></button>
            </Link>
          </td>
        </tr>
      );
    });
  } else {
    return <div>Ingen events endnu</div>;
  }

  //* Udskriv her */

  return (
    <div>
      <h1 className="text-center m-5">Event List</h1>
      <Link to="/admin/opret">
              <button type="button" className="btn btn-success mb-5">
                <span role="img" className="mr-2" aria-label="plus">
                  &#10133;
                </span>
                Opret ny
                </button>
              </Link>
      <div className="container">
      <table className="table table-striped">
        <thead>
          <tr className="thead-dark">
            <th scope="col">ID</th>
            <th scope="col">Titel</th>
            <th scope="col">Dato</th>
            <th scope="col">Distance</th>
            <th scope="col">Pris</th>
            <th scope="col">Antalpladser</th>
            <th scope="col">Slet</th>
            <th scope="col">Opret</th>
          </tr>
        </thead>
        <tbody>
          {AdminList}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default AdminEvents;
