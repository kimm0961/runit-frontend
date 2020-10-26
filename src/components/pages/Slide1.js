import React, {useEffect} from "react";
import slide1 from "../../assets/images/img_lights_wide.jpg";
import slide2 from "../../assets/images/img_mountains_wide.jpg";
import slide3 from "../../assets/images/img_nature_wide.jpg";
import slide4 from "../../assets/images/img_snow_wide.jpg";

import "../../assets/styles/slider.css";
import {runSlideshow, stopTimer} from '../../assets/scripts/slider';

//**BOOTSTRAP ER I KONFLIKT MED NOGLE AF CLASSNAME, SÅ DEN VIRKER KUN, HVIS MAN ENTEN BRUGER ANDRE CLASSNAME ELLER IKKE BRUGER BOOTSTRAP */

const Slide1 = () => {

  useEffect(() => {

    // Sæt slideshow igang når comp er loadet/mountet
    runSlideshow();

    return () => {
      // "Stop" slideshow (fjerner timeout)
      stopTimer();
    }

  }, [])

  return (
    <div>
      {/* <!-- Slideshow container --> */}
      <div className="slideshow-container">
        {/* <!-- Full-width images with number and caption text --> */}
        <div className="mySlides fade">
          <div className="numbertext">1 / 4</div>
          <img src={slide1} style={{ width: "100%" }} alt="..." />
          <div className="text">Caption Text</div>
        </div>

        <div className="mySlides fade">
          <div className="numbertext">2 / 4</div>
          <img src={slide2} style={{ width: "100%" }}  alt="..." />
          <div className="text">Caption Two</div>
        </div>

        <div className="mySlides fade">
          <div className="numbertext">3 / 4</div>
          <img src={slide3} style={{ width: "100%" }}  alt="..." />
          <div className="text">Caption Three</div>
        </div>

        <div className="mySlides fade">
          <div className="numbertext">3 / 4</div>
          <img src={slide4} style={{ width: "100%" }}  alt="..." />
          <div className="text">Caption Three</div>
        </div>

        {/* <!-- Next and previous buttons --> */}
        <button className="prev">&#10094;</button>
        <button className="next">&#10095;</button>
      </div>
      <br />

      {/* <!-- The dots/circles --> */}
      <div style={{ textAlign: "center" }}>
        <span className="dot dot1"></span>
        <span className="dot dot2"></span>
        <span className="dot dot3"></span>
        <span className="dot dot4"></span>
      </div>
    </div>
  );
};

export default Slide1;
