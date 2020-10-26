import React, { useState, useEffect } from 'react'
import { hentAlleSponsorer } from '../helpers/APIkald/apikald'

const Sponsor = () => {

    // state til den udvalgte (tilfældig) sponsor
    const [udvalgt, setUdvalgt] = useState()

    // api-kald hent alle sponsorer
    useEffect(() => {

        hentAlleSponsorer().then(response => {


            if (response !== "error") {

                let antalsponsorer = response.length;
                let tilftal = Math.floor(Math.random() * antalsponsorer)

                setUdvalgt(response[tilftal])

            }

        })

    }, [])

    let tilfsponsor = <h2>Loader ...</h2>

    // Når state udvalgt er fyldt ud med en sponsor:
    if (udvalgt) {

        // Vælg en class ud fra sponsorens kategori
        let sponsorclass = "alm";
        if(udvalgt.sponsorkategori.kategori === "Guld") sponsorclass = "gold"
        if(udvalgt.sponsorkategori.kategori === "Sølv") sponsorclass = "silver"

        tilfsponsor = (

            <div className={sponsorclass}>
                <img src={"http://localhost:5021/images/sponsorer/" + udvalgt.logo} alt="Vores sponsor" width="80" />
            </div>

        )


    }


    return (
        <div>
            {tilfsponsor}
        </div>
    )
}

export default Sponsor
