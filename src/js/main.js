// import "./styles.css";
import "../scss/style.scss";
import * as bootstrap from "bootstrap";

// timer
// Set the date we're counting down to
const countDownDate = new Date("Apr 30, 2022 15:00:00").getTime();
let x = setInterval(function () {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //
  document.getElementById("timer-day").innerHTML = days;
  document.getElementById("timer-hour").innerHTML = hours;
  document.getElementById("timer-minute").innerHTML = minutes;
  document.getElementById("timer-second").innerHTML = seconds;
  

  if (distance < 0) {
    document.getElementById("timer-day").innerHTML = '0';
    document.getElementById("timer-hour").innerHTML = '00';
    document.getElementById("timer-minute").innerHTML = '00';
    document.getElementById("timer-second").innerHTML = '00';
  }
}, 1000);


window.scrollTo(0, document.getElementById("secondSection").scrollHeight);