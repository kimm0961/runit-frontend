import React, { useEffect } from "react";
import { useState } from "reactn";

import "../../assets/styles/slider.css";
import { runSlideshow, stopTimer } from "../../assets/scripts/slider_dynamisk";

import { hentAlleEvents } from "../helpers/APIkald/apikald";

// "dynamisk" slider som tilpasser sig (Looper!) efter antal billeder i slideshow

//**BOOTSTRAP ER I KONFLIKT MED NOGLE AF CLASSNAME, SÅ DEN VIRKER KUN, HVIS MAN ENTEN BRUGER ANDRE CLASSNAME ELLER IKKE BRUGER BOOTSTRAP */

const Slide2 = () => {
  // State til events
  const [events, setEvents] = useState();

  // Useeffect - kald api og hent events
  useEffect(() => {
    // hent alle events
    hentAlleEvents().then((response) => {
      if (response !== "error") setEvents(response);

      // Sæt slideshow igang når comp er loadet/mountet
      runSlideshow();
    });

    return () => {
      // "Stop" slideshow (fjerner timeout)
      stopTimer();
    };
  }, []);

  // Lav html til events-billeder og dots
  let slidebilleder = "Loader ...";
  let dots = "Loader ...";

  if (events && events.length) {
    // Loop/map billeder ud i div'er
    slidebilleder = events.map((e, i) => {
      return (
        <div className="mySlides fade" key={e._id}>
          <div className="numbertext">2 / 4</div>
          <img
            src={"http://localhost:5021/images/events/" + e.billede}
            style={{ width: "100%" }}
            alt={e.titel}
          />
          <div className="text">{e.titel}</div>
        </div>
      );
    });

    dots = events.map((e) => {
      return <span className="dot" key={e._id}></span>;
    });
  }

  return (
    <div>
      {/* <!-- Slideshow container --> */}
      <div className="slideshow-container">
        {/* Billeder indsættes dynmaiske i/fra useffect herover */}

        {slidebilleder}
        {/* <!-- Next and previous buttons --> */}
        <button className="prev">&#10094;</button>
        <button className="next">&#10095;</button>
      </div>
      <br />

      {/* <!-- The dots/circles --> */}
      <div style={{ textAlign: "center" }}>
        {/* Dots indsættes dynmaiske i/fra useffect herover */}
        {dots}
      </div>
    </div>
  );
};

export default Slide2;
