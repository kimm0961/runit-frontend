import React from 'react'
import { sendKontaktbesked } from '../helpers/APIkald/apikald'



const Kontaktform = () => {

    const handleBesked = (e) => {
        e.preventDefault(); // forhindre submit i at genindlæse siden/component

        sendKontaktbesked(e.target).then(response => {

            if (response !== "error") {

                console.log(response)
                alert("Din besked er sendt - mange tak :-)")
                

            }
        })

        e.target.reset();
        
    }


    return (

        <div>

            <form onSubmit={handleBesked}>

                <label>
                    Navn:<br />
                    <input type="text" name="navn" placeholder="Dit navn her" required />
                </label>
                <br />

                <label>
                    Emne:<br />
                    <input type="text" name="emne" placeholder="Emnet her" required />
                </label>
                <br />

                <label>
                    Email:<br />
                    <input type="email" name="emailadresse" placeholder="Husk din emailadresse" required />
                </label>
                <br />

                <label>
                    Besked:<br />
                    <textarea rows="4" name="besked" placeholder="Besked her" required></textarea>
                </label>
                <br />

                <button type="reset">Annuller</button>

                <button type="submit">Send besked</button>



            </form>



        </div>
    )
}

export default Kontaktform
