import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { soegEvent } from '../helpers/APIkald/apikald'

const Soegeresultat = (props) => {

    let soegtpaa = props.match.params.soegeordet;

    // state til events som matcher søgning
    const [events, setEvents] = useState()


    // Kald api - send søgeordet med
    useEffect(() => {

        soegEvent(soegtpaa).then(response => {

            console.log(response)

            if (response !== "error") setEvents(response)

        })

    }, [soegtpaa])



    // Liste med alle events (eller "loader" hvis api'et ikke har svaret)
    let eventliste = <h2> Loader ...</h2>

    if (events && events.length) {

        // Filtrer events (ud fra valg i formularen - region og distance)
        eventliste = events.map(e => (

                <div key={e._id} className="box">
                    <h2>{e.titel}</h2>
                    <p>Distance: {e.distance / 1000} km</p>
                    <p>Region: {e.region.regionnavn}</p>
                    <p>{e.dato}</p>
                    <img src={"http://localhost:5021/images/events/" + e.billede} alt="Et foto" width="50px" />
                    <p><Link to={"/event/" + e._id}> Læs mere </Link></p>
                </div>

            ))
    }


    return (
        <div className="box">

            <h1>Søgeresultat</h1>
            { eventliste}

        </div>
    )
}

export default Soegeresultat
