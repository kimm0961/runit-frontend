import React, { useState, useEffect } from 'react'
import { useGlobal } from "reactn";

import { Link } from 'react-router-dom'

// dayjs
import dayjs from 'dayjs';
import 'dayjs/locale/da'

// apikald
import { hentNaesteEvent } from '../helpers/APIkald/apikald'

const KommendeEvent = () => {

    // global - opdateres ved tilmeld event
    const [eventopdateret] = useGlobal("eventopdateret");


    // state til næste event
    const [event, setEvent] = useState()

    // kald api når comp er loadet/mountet
    useEffect(() => {

        let d = new Date();
        console.log(d)

        hentNaesteEvent(d).then(response => {

            // hvis der ikke er fejl så filtrer responset så kun næstkommende event med mere end 0 pladser bliver gemt i state
            if (response !== "error") {

                let nexteventmedplads = response.filter(e => {
                    return e.pladsertilbage > 0
                })

                // Gem øverste/første (kommende) event i state - ligger på plads "nul"
                setEvent(nexteventmedplads[0]);

            }
        })


    }, [eventopdateret])


    let visevent = <h2>Loader ...</h2>

    let status = "Få pladser tilbage";



    // Hvis der er et event klar i state
    if (event) {


        // hvis der er mere end 25% pladser tilbage
        if (event.pladsertilbage > event.antalpladser * 0.25) {
            status = "MANGE pladser tilbage"
        }




        visevent = (

            <div>
                <div>
                    NÆSTE LØB - {event.antalpladser - event.pladsertilbage} / {event.antalpladser} PLADSER OPTAGET
                </div>
                <div>
                    {status}
                    <p>Dato: {event.dato}</p>
                    <p>Dato: {new Date(event.dato).toLocaleDateString('da-dk')} {new Date(event.dato).toLocaleTimeString('da-dk')}</p>

                    <p>Dato: {dayjs(event.dato).locale('da').format('DD. MMMM YYYY kl. HH:mm')}</p>

                </div>
                <h2>{event.titel}</h2>
                <Link to={"/event/" + event._id}> Læs mere </Link>

            </div>

        )
    }


    return (

        <div className="box">

            {visevent}


        </div>
    )
}

export default KommendeEvent
