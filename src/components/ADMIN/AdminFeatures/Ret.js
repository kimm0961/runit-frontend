import React, { useState, useEffect } from "react";
import ImageUploader from "react-images-upload";
import { useHistory, useParams } from "react-router-dom";
import {
  hentUdvalgtEvent,
  retEvent,
  hentAlleRegioner,
} from "../../helpers/APIkald/apikald";

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const editorConfiguration = {
    toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']
};

function Ret() {
  //* State */
  const [regioner, setRegioner] = useState({});
  const [event, setEvent] = useState();
  const [beskrivelse, setBeskrivelse] = useState();


  // Params

  const { event_id } = useParams();

  // //* History */
  const history = useHistory();

  //* Region */
  useEffect(() => {
    hentAlleRegioner().then((response) => {
      if (response !== "error") setRegioner(response);
    });

    hentUdvalgtEvent(event_id).then((response) => {
      // Hvis der ikke er en fejl, så put event (fra api) i state
      if (response !== "error") setEvent(response);
    });
  }, [event_id]);

  // Liste med alle regioner
  let regionliste = "";
  if (regioner && regioner.length) {
    regionliste = regioner.map((r) => (
      <option value={r._id} key={r._id}>
        {r.regionnavn}
      </option>
    ));
  }

  //* Submit *
  const handleSubmit = (e) => {
    e.preventDefault();

    retEvent(event_id, e.target).then((response) => {
      console.log(response);
    });

    // redirect
    history.push("/admin/adminevents");
    // })();
  };

  //* Udskriv */

  return (
    <div className="container">
      <h1 className="text-center m-5">Opret en ny event</h1>
      {event ? (
        <div className="container" style={{ maxWidth: "40rem" }}>
          <form onSubmit={handleSubmit}>
            <label>
              Titel
              <input
                name="titel"
                defaultValue={event.titel}
                id="inpTitel"
                type="text"
                placeholder="Titel"
              />
            </label>
            <br />
            <br />
            <label>
              Dato og tid
              <input
                name="dato"
                defaultValue={event.dato}
                id="inpDato"
                type="text"
                placeholder="Vælg dato"
              />
            </label>
            <br />
            <br />
            <label>
              {/* <textarea
                name="beskrivelse"
                defaultValue={event.beskrivelse}
                id="txtBeskrivelse"
                placeholder="Beskrivelse" style={{display: "none"}}
              /> */}
              <textarea
                name="beskrivelse"
                defaultValue={beskrivelse}
                id="txtBeskrivelse"
                placeholder="Beskrivelse" style={{display: "none"}}
              />
            </label>
            <CKEditor
                    editor={ ClassicEditor }
                    data={event.beskrivelse}
                    config={editorConfiguration}
                    onInit={editor => {
                      const data = editor.getData();
                      setBeskrivelse(data);
                    }}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setBeskrivelse(data);
                    } }
                />
            <br />
            <br />
            <label>
              Distance
              <input
                name="distance"
                defaultValue={event.distance}
                type="number"
                min="1"
                max="100000"
                placeholder="Distance i meter"
              />
            </label>
            <br />
            <br />
            <label>
              Pris i kr.
              <input
                name="pris"
                defaultValue={event.pris}
                type="number"
                min="0"
                max="10000"
                placeholder="Pris i kr"
              />
            </label>
            <br />
            <br />
            <label>
              Antal pladser
              <input
                name="antalpladser"
                defaultValue={event.antalpladser}
                type="number"
                min="1"
                max="10000"
                placeholder="Antal pladser"
              />
            </label>
            <br />
            <br />
            <select
              name="region"
              defaultValue={event.region._id}
              id="regionselect"
            >
              {regionliste}
            </select>
            <br />
            <br />

            <div>
              <ImageUploader
                name="billede"
                withIcon={true}
                buttonText="Vælg et billede"
                withLabel={true}
                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                singleImage={true}
                withPreview={true}
                required={true}
                defaultImages={[
                  "http://localhost:5021/images/events/" + event.billede,
                ]}
              />
            </div>
            <br />
            <br />
            <button type="button">Fortryd</button>
            <button type="submit">Ret Event</button>
          </form>
        </div>
      ) : (
        <h2>Vent venligst...</h2>
      )}
    </div>
  );

  //   // Params

  //   const { event_id } = useParams();

  //   // useEffect
  //   useEffect(() => {
  //     (async () => {
  //       setEventData(await hentEvent(event_id));
  //     })();

  //     hentAlleKategorier().then(kat => {
  //       // console.log(kat)
  //       setKategorier(kat);
  //     });
  //   }, [ event_id]);

  //   // console.log(eventData)
  //   // Submit

  //   const handleSubmit = e => {
  //     e.preventDefault();

  //     (async () => {
  //       setEventData(await retEvent(event_id, eventData, eventBillede));
  //       history.push("/admin/adminevents");
  //     })();

  //   };

  //   // Metode 1 - map

  //   let KategoriList = "";

  //   if (kategorier.length > 0) {
  //     KategoriList = kategorier.map(kategori => {
  //       return (
  //         <option key={kategori._id} value={kategori._id}>
  //           {kategori.kategorinavn}
  //         </option>
  //       );
  //     });
  //   } else {
  //     return <div>Ingen kategorier endnu.</div>;
  //   }

  //   // Metode 1 - if

  //   let eventen = "";

  //   if (eventData) {
  //     eventen = (
  //       <div className="container">
  //         <h1 className="text-center mt-5">Ret</h1>
  //         <p className="text-center mb-5">{eventData.kategori.kategorinavn}</p>
  //         <div className="container" style={{ maxWidth: "40rem" }}>
  //           <form className="text-left">
  //             <select
  //               className="custom-select mb-4 bg-light"
  //               onChange={(e) => setEventData({ ...eventData, kategori: e.target.value })}
  //               defaultValue={"DEFAULT"}
  //             >
  //               <option value="DEFAULT" disabled>
  //                 Vælg en kategori ...
  //               </option>
  //               {KategoriList}
  //             </select>
  //             <label htmlFor="navn" className="font-weight-bold">
  //               Titel:
  //             </label>
  //             <input
  //               id="navn"
  //               type="text"
  //               className="form-control mb-3 bg-light"
  //               onChange={(e) => setEventData({ ...eventData, titel: e.target.value })}
  //               value={eventData.titel}
  //             />

  //             <label htmlFor="tekst" className="font-weight-bold">
  //               Beskrivelse:
  //             </label>
  //             <textarea
  //               id="tekst"
  //               type="text"
  //               className="form-control mb-3 bg-light"
  //               rows="3"
  //               onChange={(e) => setEventData({ ...eventData, beskrivelse: e.target.value })}
  //               value={eventData.beskrivelse}
  //             ></textarea>

  //             <img className="img-fluid" style={{width:200}} src={"http://localhost:5021/images/" + eventData.coverbillede.filnavn} alt={eventData.overskrift} />
  //           <ImageUploader
  //                 withIcon={true}
  //                 buttonText='Vælg et billede'
  //                 onChange={(billede) => {setEventBillede(billede[0])}} // Send kun 1 fil, ikke et array med 1 fil
  //                 imgExtension={['.jpg', '.gif', '.png']}
  //                 maxFileSize={5242880}
  //                 withPreview={true}
  //             />
  //           </form>
  //           <Link className="btn btn-secondary mr-3" to="/admin/adminevents" role="button">
  //             Fortryd
  //           </Link>
  //           <Link
  //             className="btn btn-warning"
  //             to="/admin/adminevents"
  //             role="button"
  //             onClick={handleSubmit}
  //           >
  //             Gem
  //           </Link>
  //         </div>
  //       </div>
  //     );
  //   }

  //   // Udskriv her

  //   return <div>{eventen}</div>;
}

export default Ret;
