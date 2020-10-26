import React, { useState, useEffect } from "react";
import { useGlobal } from "reactn";
import parse from "html-react-parser";

// apikald
import { hentUdvalgtEvent, tilmeldEvent } from "../helpers/APIkald/apikald";

const Event = (props) => {
  // global - opdateres ved tilmeld event
  const [eventopdateret, setEventopdateret] = useGlobal("eventopdateret");

  // state til event fra apikald
  const [event, setEvent] = useState();
  const [besked, setBesked] = useState();

  // kald apiet når component "loader"
  useEffect(() => {
    hentUdvalgtEvent(props.match.params.id).then((response) => {
      // Hvis der ikke er en fejl, så put event (fra api) i state
      if (response !== "error") setEvent(response);
    });
  }, [props.match.params.id]);

  // TILMELD EVENT
  const handleTilmeld = (e) => {
    e.preventDefault();

    // e.target er formularen med dens indhold af input mv.
    tilmeldEvent(e.target).then((response) => {
      if (response !== "error") {
        console.log(response);
        setBesked("Tak for din tilmelding");
        setEventopdateret(!eventopdateret);
        // setEventopdateret(eventopdateret.opdateret + 1);
        // console.log(eventopdateret.opdateret)
      }
    });
  };

  // FORMATER/UDSKRIV EVENT
  let eventet = <h2>Loader ... </h2>;

  if (event) {
    eventet = (
      <>
        <h2>{event.titel}</h2>
        {parse(event.beskrivelse)}
        <p>
          <img
            src={"http://localhost:5021/images/events/" + event.billede}
            alt={"Foto fra: " + event.titel}
            title={"Foto fra: " + event.titel}
            width="300px"
          />
        </p>

        {besked ? (
          besked
        ) : (
          <form onSubmit={handleTilmeld}>
            <input type="email" name="email" placeholder="Din email" required />
            <input
              type="hidden"
              name="event"
              defaultValue={props.match.params.id}
            />
            <br />
            <button type="submit">Tilmeld</button>
          </form>
        )}
      </>
    );
  }

  return (
    <div className="box">
      <h1>Event</h1>

      {eventet}
    </div>
  );
};

export default Event;
