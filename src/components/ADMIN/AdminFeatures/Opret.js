import React, { useState, useEffect } from "react";
import ImageUploader from "react-images-upload";
import { useHistory } from "react-router-dom";
import { opretEvent, hentAlleRegioner } from "../../helpers/APIkald/apikald";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const editorConfiguration = {
    toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']
};

function Opret() {
  //* State */
  const [regioner, setRegioner] = useState({});
 
  const [beskrivelse, setBeskrivelse] = useState();

  // //* History */
  const history = useHistory();

  //* Region */
  useEffect(() => {
    hentAlleRegioner().then(response => {
      if (response !== "error") setRegioner(response)
  })

  }, []);

  // Liste med alle regioner
  let regionliste = "";
  if (regioner && regioner.length) {

      regionliste = regioner.map(r => (
          <option value={r._id} key={r._id}>{r.regionnavn}</option>
      ))

  }

  //* Submit *
  const handleSubmit = (e) => {
    e.preventDefault();

    opretEvent(e.target).then(response => {
      console.log(response);
    })

      // redirect
      history.push("/admin/adminevents");
    // })();
  };
  

  //* Udskriv */

  return (
    <div className="container">
      <h1 className="text-center m-5">Opret en ny event</h1>
      <div className="container" style={{maxWidth: '40rem'}}>
      <form onSubmit={handleSubmit}>
                <label>Titel
                <input name="titel" id="inpTitel" type="text" placeholder="Titel" />
                </label>
                <br /><br />
                <label>Dato og tid 
                <input name="dato" id="inpDato" type="text" placeholder="Vælg dato" />
                </label>
                <br /><br />
                <label>
                    <textarea name="beskrivelse" defaultValue={beskrivelse} id="txtBeskrivelse" style={{display: "none"}} placeholder="Beskrivelse" ></textarea>
                </label>
                <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    config={editorConfiguration}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setBeskrivelse(data);
                    } }
                />
                <br /><br />
                <label>Distance
                <input name="distance" type="number" min="1" max="100000" placeholder="Distance i meter" />
                </label>
                <br /><br />
                <label>Pris i kr.
                <input name="pris" type="number" min="0" max="10000" placeholder="Pris i kr" />
                </label>
                <br /><br />
                <label>Antal pladser
                <input name="antalpladser" type="number" min="1" max="10000" placeholder="Antal pladser" />
                </label>
                <br /><br />
                <select name="region" defaultValue="DEFAULT" id="regionselect">
                    <option value="DEFAULT" disabled>Vælg en region ....</option>
                    {regionliste}
                </select>
                <br /><br />

                <div>
                    <ImageUploader
                        name="billede"
                        withIcon={true}
                        buttonText="Vælg et billede"
                        withLabel={true}
                        imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
                        singleImage={true}
                        withPreview={true}
                        required={true}
                    />
                </div>
                <br /><br />
                <button type="button">Fortryd</button>
                <button type="submit">Gem Event</button>
            </form>
      </div>
    </div>
  );
}

export default Opret;
