import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-spinners/HashLoader'
import parse from "html-react-parser";


// helper apikald
import { hentAlleEvents, hentAlleRegioner } from '../helpers/APIkald/apikald';

const Events = () => {


    // State som rummer alle events
    const [events, setEvents] = useState();

    // State til alle regioner
    const [regioner, setRegioner] = useState()

    // State til valgt region
    const [valgtregion, setValgtregion] = useState("alle")

    // States til valgt distance
    const [minDistance, setMinDistance] = useState(1) // 1
    const [maxDistance, setMaxDistance] = useState(999999999999) // 10000



    // Kald api'et
    useEffect(() => {


        // hent alle regioner
        hentAlleRegioner().then(response => {
            if (response !== "error") setRegioner(response)
        })

        // hent alle events
        hentAlleEvents().then(response => {
            if (response !== "error") setEvents(response)
        })

    }, [])


    // Liste med alle regioner
    let regionliste = "";
    if (regioner && regioner.length) {

        regionliste = regioner.map(r => (
            <option value={r._id} key={r._id}>{r.regionnavn}</option>
        ))

    }


    // Liste med alle events (eller "loader" hvis api'et ikke har svaret)
    let eventliste = <Loader size={35} color={"#9013FE"} />

    if (events && events.length) {

        // Filtrer events (ud fra valg i formularen - region og distance)
        eventliste = events.filter(e => {
            return (e.region._id === valgtregion || valgtregion === "alle") && (e.distance > minDistance && e.distance < maxDistance)
        })
            // ... og map så resultatet ud
            .map(e => (

                <div key={e._id} className="box">
                    <h2>{e.titel}</h2>
                    <p>Distance: {e.distance / 1000} km</p>
                    <p>Region: {e.region.regionnavn}</p>
                    <p>{e.dato}</p>
                    {parse(e.beskrivelse)}
                    <img src={"http://localhost:5021/images/events/" + e.billede} alt="Et foto" width="150px" />
                    <p><Link to={"/event/" + e._id}> Læs mere </Link></p>
                </div>

            ))
    }

    return (
        <div>

            <h1>Events</h1>

            <form className="box">

                <h4>Hvor i landet</h4>

                <select name="regioner" defaultValue="alle" onChange={(e) => { setValgtregion(e.target.value) }}>
                    <option value="alle">Alle regioner</option>
                    {regionliste}
                </select>
                <br />
                <br />


                <h4>Vælg distance</h4>
                <label>
                    <input type="radio" name="distance" onChange={() => { setMinDistance(10000); setMaxDistance(9999999999) }} />
                    Over 10 km
                </label>
                <br />

                <input type="radio" id="kort" name="distance" onChange={() => { setMinDistance(1); setMaxDistance(10001) }} />
                <label htmlFor="kort">10 km og derunder</label>
                <br />

                <input type="radio" id="alle" name="distance" onChange={() => { setMinDistance(1); setMaxDistance(9999999999) }} />
                <label htmlFor="alle">Alle distancer</label>
                <br />

            </form>

            <div className="box">{eventliste}</div>


        </div>



    )
}

export default Events
