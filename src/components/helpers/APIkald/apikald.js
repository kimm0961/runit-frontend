import axios from "axios";

// BASE URL
const api = {
  baseUrl: "http://localhost:5021/",
};

// ----- EVENTS -------------------------

// Get alle events
export const hentAlleEvents = () => {
  let response = axios
    .get(api.baseUrl + "event")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "error";
    });

  return response;
};

// Get udvalgt event (send id med)
export const hentUdvalgtEvent = (eventID) => {
  let response = axios
    .get(api.baseUrl + "event/" + eventID) // http://localhost:5021/event/5f3fd2207e525a19cce3b687
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "error";
    });

  return response;
};

// Get events ud fra dato - response i datoorden med kommende events "øverst"
export const hentNaesteEvent = (dato) => {
  let response = axios
    .get(api.baseUrl + "event/soegdato?dato_fra=" + dato) //http://localhost:5021/event/soegdato?dato_fra=2020-10-01
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "error";
    });

  return response;
};

// PUT - ret
export const retEvent = (event_id, eventData) => {
  let formdata = new FormData(eventData);

  let response = axios
    .put(api.baseUrl + "event/admin/" + event_id, formdata, { withCredentials: true })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "error";
    });

  return response;
};

// DELETE - slet
export const sletEvent = async (event_id) => {
  try {
    let res = await axios.delete(api.baseUrl + "event/admin/" + event_id, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log("Fejl:", error);
  }
};

// POST - opret
export const opretEvent = (eventData) => {
  let formdata = new FormData(eventData);

  let response = axios
    .post(api.baseUrl + "event/admin", formdata, { withCredentials: true })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "error";
    });

  return response;
};

// Get events - soeg event
export const soegEvent = (soeg) => {
  let response = axios
    .get(api.baseUrl + "event/soeg/" + soeg) //http://localhost:5021/event/soeg/strand
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "error";
    });

  return response;
};

// Post/send en eventtilmelding
export const tilmeldEvent = (tilmelding) => {
  //tilmelding = email + eventID = e.target

  let formdata = new FormData(tilmelding);

  let response = axios
    .post(api.baseUrl + "eventtilmelding/", formdata) // http://localhost:5021/eventtilmelding/
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "error";
    });

  return response;
};

// ----- REGIONER -------------------------

// Get alle regioner
export const hentAlleRegioner = () => {
  let response = axios
    .get(api.baseUrl + "region") // http://localhost:5021/region
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "error";
    });

  return response;
};

// ----- SPONSORER -------------------------

// Get alle sponsorer
export const hentAlleSponsorer = () => {
  let response = axios
    .get(api.baseUrl + "sponsor") // http://localhost:5021/sponsor
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "error";
    });

  return response;
};

// ----- KONTAKT

// Post/send en kontaktbesked
export const sendKontaktbesked = (besked) => {
  // besked = e.target

  let formdata = new FormData(besked);

  let response = axios
    .post(api.baseUrl + "kontakt", formdata) // http://localhost:5021/kontakt/
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "error";
    });

  return response;
};

// ----- NYHEDSBREV tilmelding

// Post/send en nyhedsbrevstilmelding
export const tilmeldNyhedsbrev = (email) => {
  // email = e.target

  let formdata = new FormData(email);
  //let formdata = Object.fromEntries(new FormData(email)); // hvis email er et objekt {email: "djfkd@jdkf.dk"} og det SKAL være formdata

  let response = axios
    .post(api.baseUrl + "nyhedsbrevtilmelding", formdata) // http://localhost:5021/nyhedsbrevtilmelding/
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "error";
    });

  return response;
};

// ----- BESTYRELSE

// Get alle bestyrelse
export const hentAlleBestyrelse = () => {
  let response = axios
    .get(api.baseUrl + "bestyrelse") // http://localhost:5021/bestyrelse
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "error";
    });

  return response;
};

// ---- Login

// login
export const BrugerLogin = (brugerInfo) => {

  let formdata = new FormData(brugerInfo);

  let response = axios
    .post(api.baseUrl + "login/login", formdata, { withCredentials: true })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "error";
    });

  return response;
};

// logout
export const BrugerLogout =  () => {

    let response = axios
    .get(api.baseUrl + "login/logout", { withCredentials: true })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "error";
    });

  return response;
};

// loggedin
export const BrugerLoggedin = async () => {
  try {
    let res = await axios.get(api.baseUrl + "login/loggedin", {
      withCredentials: true,
    });
    // console.log(res.data)
    return res.data;
  } catch (error) {
    console.log("Fejl:", error);
  }
};
