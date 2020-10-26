import React, { useState, useEffect } from 'react'

//  api kald
import { hentAlleBestyrelse } from '../helpers/APIkald/apikald'

const Bestyrelse = () => {


    // state til bestyrelse
    const [bestyrelse, setBestyrelse] = useState()

    // hovedperson - bestyrelsesmedlem (ID) som skal vises
    const [hovedperson, setHovedperson] = useState()


    // kald api - hent alle bestyrelse
    useEffect(() => {

        hentAlleBestyrelse().then(response => {
            if (response !== "error") {

                setBestyrelse(response) // put bestyrelsesmedlemmer i state

                //find formand og put dennes ID i hovedperson-state
                response.forEach(b => {
                    if (b.bestyrelsespost.post === "Formand") setHovedperson(b._id);
                })
            }
        })

    }, [])



    // loop/map bestyrelse ud
    let bestyrelsesliste = <h2>Loading ...</h2>
    let bestyrelsesoptions = <option>Loader ....</option>

    if (bestyrelse && bestyrelse.length) {

        // VISNING af bestyrelsesmedlemmer
        bestyrelsesliste = bestyrelse.filter(b => {

            return b._id === hovedperson

        }).map(b => (

            <div key={b._id}>
                <h4>{b.fornavn} {b.efternavn}</h4>
                <img src={"http://localhost:5021/images/bestyrelse/" + b.billede} alt={"Foto af: " + b.fornavn + " " + b.efternavn} width="200px" />
            </div>

        ))

        // OPTIONS til selectboxen
        bestyrelsesoptions = bestyrelse.map(b => (

            <option value={b._id} key={b._id}>{b.fornavn} {b.efternavn} </option>

        ))

    }



    return (

        <div>

            <form>
                <select name="bestyrelse" defaultValue="" onChange={(e) => { setHovedperson(e.target.value) }}>
                    {bestyrelsesoptions}
                </select>
            </form>


            <h3>Vis valgt bestyrelsesmedlem</h3>
            { bestyrelsesliste}
        </div >
    )
}

export default Bestyrelse
