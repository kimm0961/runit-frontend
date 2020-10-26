import React from 'react'
import Bestyrelse from '../partials/Bestyrelse'
import Kontaktform from '../partials/Kontaktform'

const Kontakt = () => {
    return (
        <div className="box">

            <h1>Kontakt</h1>
            <Kontaktform />

            <br /><br />
            
            <h2>Bestyrelse</h2>
            <Bestyrelse />
            
        </div>
    )
}

export default Kontakt
