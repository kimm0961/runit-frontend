let t; // navn på timeout - sættes "gloabalt" så begge funktioner kan kalde på variablen/navnet

export const stopTimer = () => {
  clearTimeout(t); // stop/slet timeout
};

export const runSlideshow = () => {
  // Click event - fjernet fra html og tilføjet her:

  // Prev og next navigation
  document.querySelector(".prev").addEventListener("click", function () {
    plusSlides(-1);
  });
  document.querySelector(".next").addEventListener("click", function () {
    plusSlides(1);
  });

  // Dot-navigation
  document.querySelector(".dot1").addEventListener("click", function () {
    currentSlide(1);
  });
  document.querySelector(".dot2").addEventListener("click", function () {
    currentSlide(2);
  });
  document.querySelector(".dot3").addEventListener("click", function () {
    currentSlide(3);
  });
  document.querySelector(".dot4").addEventListener("click", function () {
    currentSlide(4);
  });

  // start slideshow - start med index 1 = foto 1
  var slideIndex = 1;
  showSlides(slideIndex);

  // Next/previous controls
  function plusSlides(n) {
    showSlides((slideIndex += n)); // slideindex = slideindex + 1 Eller slideindex = slideindex +-1
  }

  // Dots controls
  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  function showSlides(n) {

    clearTimeout(t); //Stop/slet eventuelle ekstra timeouts

    var i;
    var slides = document.getElementsByClassName("mySlides"); // alle slides i collection []
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    // Timeout som kalde "next"-funktionalitet efter x antal millisekunder
    t = setTimeout(function () {
      plusSlides(1);
    }, 3000);
  }
};
