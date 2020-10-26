import React from "react";
import { useGlobal } from "reactn";
import { useHistory } from "react-router-dom";
import { BrugerLogin} from "../helpers/APIkald/apikald";

function Login() {

    const [global, setGlobal] = useGlobal("loggedIn")

  const history = useHistory();

  //* Submit */
  const handleLogin = (e) => {
    e.preventDefault();

    // // Hvis der ikke bliver brugt Formdata i Backend
    // let brugerInfo = {
    //     brugernavn: e.target.brugernavn.value,
    //     password: e.target.password.value
    // }

  BrugerLogin(e.target).then(response => {

    if (response !== "error") {
        console.log(response);   

        setGlobal(true);
        history.push("/admin/adminevents");  
    } else {
        alert("Noget gik galt");
    }

})

}

  return (
    <div
      className="container border border-secondary rounded mt-5 p-4 bg-light"
      style={{ width: "18rem" }}
    >
      <h1 className="mb-4 text-center text-success">Login</h1>
      <form
        className="mb-5"
        onSubmit={handleLogin}
      >
        <div className="form-group">
          <label htmlFor="text">Brugernavn</label>
          <input
            type="text"
            name="brugernavn"
            placeholder="Brugernavn"
            required
            className="form-control"
            aria-describedby="brugernavn"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="form-control"
            aria-describedby="password"
            autoComplete="on"
          />
        </div>
        <button className="btn btn-success" type="submit" aria-label="Bruger login knap">
          Indsend
        </button>
      </form>
      {/* <p className="text-danger font-italic m-0">Har du ikke en profil?</p>
        <a href='/register'>Register</a> */}
    </div>
  );
}


export default Login;
