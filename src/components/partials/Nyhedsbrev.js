import React, { useState } from 'react'
import { tilmeldNyhedsbrev } from '../helpers/APIkald/apikald'

const Nyhedsbrev = () => {

    // state til at håndtere hvis det går godt med tilmelding
    const [besked, setBesked] = useState()

    const handleSend = (e) => {

        e.preventDefault()

        // e.target er formularen med dens indhold af input mv.
        tilmeldNyhedsbrev(e.target).then(response => {

            if (response !== "error") {
                console.log(response)
                setBesked("Tak for din tilmelding")
            }
        })

    }


    return (
        <div className="box">

            <h1>Nyhedsbrev</h1>

            {
                besked ? <p>{besked}</p>
                    :
                    <form onSubmit={handleSend}>

                        <input type="email" name="email" placeholder="Din email" required />
                        <br />

                        <button type="submit">Tilmeld</button>

                    </form>
            }




        </div>
    )
}

export default Nyhedsbrev
