import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useGlobal } from "reactn";

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import KommendeEvent from './components/partials/KommendeEvent';
import Nyhedsbrev from './components/partials/Nyhedsbrev';
import Sponsor from './components/partials/Sponsor';
import Home from './components/pages/Home';
import Events from './components/pages/Events';
import Event from './components/pages/Event';
import Om from './components/pages/Om';
import Kontakt from './components/pages/Kontakt';
import Sponsorer from './components/pages/Sponsorer';

// dayjs
import dayjs from 'dayjs';
import 'dayjs/locale/da'

// api-kald - hent næste event
import { hentNaesteEvent } from './components/helpers/APIkald/apikald'


// CSS
import './App.css';
import Soegeresultat from './components/pages/Soegeresultat';
import Slide1 from './components/pages/Slide1';
import Slide2 from './components/pages/Slide2';
import DocTitle1 from './components/pages/DocTitle1';
import DocTitle2 from './components/pages/DocTitle2';


function App() {

  // Global
  const [global] = useGlobal({"eventopdateret": { "antal": 0 }}); // 

  // STATE: Næste event (uanset om der er ledige pladser eller ej - bare NÆSTE event)
  const [event, setEvent] = useState()


  // USEEFFECT
  useEffect(() => {

    // Dato-tid lige nu
    let d = new Date();

    hentNaesteEvent(d).then(response => {
      // Håndter fejl og hvis ingen fejl -> put i state
      if (response !== "error") {

        // Gem øverste/første (kommende) event i state - ligger på plads "nul"
        setEvent(response[0]);
      }
    })

    // eslint-disable-next-line
  }, [])



  // Lav nedtæller
  let nedtaeller = <h2>Loading .... spinner????</h2>
  let styles = {};

  if (event) {

    let ligenu = new Date();                // Lige - dato og tid
    let eventtidspunkt = dayjs(event.dato);        // Eventets dato og tid

    let dage = eventtidspunkt.diff(ligenu, 'days', false);
    let timer = eventtidspunkt.diff(ligenu, 'hours', false) - (dage * 24);
    let minutter = eventtidspunkt.diff(ligenu, 'minutes', false) - (timer * 60) - (dage * 24 * 60);

    nedtaeller = (
      <div className="countdown">
        {dage} DAGE {timer} TIMER { minutter} MINUTTER TIL { event.titel}
      </div>
    )

    styles = {
      backgroundImage: "url(http://localhost:5021/images/events/" + event.billede + ")",
      imageSize: "cover",
      height: "100vh"

    }
  }

  return (

    <div className="App">
  

        {/* HEADER */}
        <header>
          <Header />
        </header>

        {/* MIDT - contentområde */}
        <div className="content">

          {/* Midt/content */}
          <main className="left" style={styles}>
            {/* <Route exact path="/" component={(props) => <Home  {...props} nt={nedtaeller} />} /> */}
            <Route exact path="/">
              <Home nt={nedtaeller} />
            </Route>
            <Route exact path="/events" component={Events} />
            <Route exact path="/slider" component={Slide1} />
            <Route exact path="/slider2" component={Slide2} />
            <Route exact path="/demo1" component={DocTitle1} />
            <Route exact path="/demo2" component={DocTitle2} />
            <Route exact path="/event/:id" component={Event} />
            <Route exact path="/kontakt" component={Kontakt} />
            <Route exact path="/omrunit" component={Om} />
            <Route exact path="/sponsorer" component={Sponsorer} />
            <Route exact path="/soeg/:soegeordet" component={Soegeresultat} />
          </main>

          {/* højre kolonne */}
          <aside className="right">
            <KommendeEvent />
            <Nyhedsbrev />
            <Sponsor />
          </aside>

        </div>

        {/* FOOTER */}
        <footer>
          <Footer />
        </footer>

   
    </div >

  );
}

export default App;

