import React, { useState, useEffect } from 'react'

// api

import { hentAlleSponsorer } from '../helpers/APIkald/apikald'




const Sponsorer = () => {

    const [sponsorer, setSponsorer] = useState()


    useEffect(() => {

        hentAlleSponsorer().then(response => {

            // Hvis der ikke er en fejl, så put event (fra api) i state
            if (response !== "error") setSponsorer(response)
        })

    }, [])


    const hentSponsorerUdfraKategori = (kategori) => {

        let sponsorliste = <h2>Loader ...</h2>

        if (sponsorer && sponsorer.length) {

            sponsorliste = sponsorer.filter(s => {

                return s.sponsorkategori.kategori === kategori

            }).map(s => (

                <div className="sponsorlogo" key={s._id}>
                    <img src={"http://localhost:5021/images/sponsorer/" + s.logo} alt={s.navn} title={"Tak til: " + s.navn} width="50px" />
                </div>

            ))
        }

        return sponsorliste;
    }



    return (
        <div className="box">

            <h2>Guld</h2>
            <div className="gold">
                {hentSponsorerUdfraKategori("Guld")}
            </div>

            <h2>Sølv</h2>
            <div className="slv">
                {hentSponsorerUdfraKategori("Sølv")}
            </div>

            <h2>Almindelig samarbejdspartner</h2>
            <div className="alm">
                {hentSponsorerUdfraKategori("Almindelig samarbejdspartner")}
            </div>


        </div >
    )
}

export default Sponsorer
