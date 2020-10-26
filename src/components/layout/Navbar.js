import React, { } from 'react';
import { Link, useHistory } from 'react-router-dom';



function Navbar() {

    let history = useHistory();

    const handleSoeg = (e) => {

        e.preventDefault(); // undgå at component reloader/re-mounter
        history.push("/soeg/" + e.target.soeg.value)

    }


    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/events">Events</Link>
                    </li>
                    <li>
                        <Link to="/slider">Slider</Link>
                    </li>
                    <li>
                        <Link to="/slider2">Slider 2</Link>
                    </li>
                    <li>
                        <Link to="/demo1">Demo 1</Link>
                    </li>
                    <li>
                        <Link to="/kontakt">Kontakt</Link>
                    </li>
                    <li>
                        <Link to="/omrunit">Om RunIT</Link>
                    </li>
                    <li>
                        <Link to="/sponsorer">Sponsorer</Link>
                    </li>
                    <li>
                        <form onSubmit={handleSoeg}>
                            <input name="soeg" type="search" />
                            <input type="submit" value="Søg" />
                        </form>
                    </li>
                </ul>
            </nav>

        </>
    )
}

export default Navbar

