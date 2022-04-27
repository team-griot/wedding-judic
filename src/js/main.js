// import "./styles.css";
import "../scss/style.scss";
import * as bootstrap from "bootstrap";
import db from "./firebase";
import { collection, getDocs, where, query, addDoc, Timestamp } from "firebase/firestore";

// Set the date we're counting down to
const countDownDate = new Date("Apr 30, 2022 15:00:00").getTime();
if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
  window.scrollTo(0, document.getElementById("secondSection").scrollHeight);
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
      document.getElementById("timer-day").innerHTML = "0";
      document.getElementById("timer-hour").innerHTML = "00";
      document.getElementById("timer-minute").innerHTML = "00";
      document.getElementById("timer-second").innerHTML = "00";
    }
  }, 1000);
}

if (window.location.pathname === "/guestbook.html") {
  const submitBtn = document.getElementById("submitBtn").addEventListener("click", addComment);
  const noMsg = document.getElementById("no-msg");


  // Display commentaire valider 
  getComments().then((commentList) => {
    const cmtWrapper = document.getElementById("comment-wrapper");
    commentList.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      //
      const author = document.createElement("h4");
      author.classList.add("comment-author-link");
      author.innerHTML = titleCase(`${doc.data().nom} ${doc.data().prenom}`);
      //
      const date = document.createElement("h6");
      date.classList.add("comment-date");
      date.innerHTML = getDateFromTimestamp(doc.data().date.seconds);
      //
      const message = document.createElement("p");
      message.classList.add("comment-message");
      message.innerHTML = doc.data().message;
      //
      const cm = document.createElement("div");
      cm.classList.add("comment-meta");
      cm.appendChild(author);
      cm.appendChild(date);
      //
      const cc = document.createElement("div");
      cc.classList.add("comment-content");
      cc.appendChild(cm)
      cc.appendChild(message)
      //
      const comment = document.createElement("div");
      comment.classList.add("comment");
      comment.appendChild(cc);
      //
      //
      cmtWrapper.appendChild(comment);
    });


  }).catch((e) => {
    noMsg.style.display = "block";
  })
}

/** Get list of comment from base */
function getComments() {
  return new Promise(async (resolve, reject) => {
    const q = query(collection(db, "comments"), where("isValid", "==", true) );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      resolve(querySnapshot);
    } else {
      reject(null);
    }
  });
}

/**save comment to base */
async function addComment() {
  const _nom = document.getElementById("fieldNom").value;
  const _prenom = document.getElementById("fieldPrenom").value;
  const _message = document.getElementById("fieldMsg").value;
  const _notifSuccess = document.getElementById("notif-success");
  const _commentForm = document.getElementById("comment-form");

  try {
    const docRef = await addDoc(collection(db, "comments"), {
      nom: _nom,
      prenom: _prenom,
      date: Timestamp.fromDate(new Date()),
      message: _message,
      isValid: false
    });
    _notifSuccess.style.display = "block";
    _commentForm.classList.add("hide");
  } catch (e) {
  }
}

// get date and time now in the format DD/MM/YYYY HH:MM
function getDateTime() {
  var now = new Date();
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var year = now.getFullYear();
  var hour = ("0" + now.getHours()).slice(-2);
  var minute = ("0" + now.getMinutes()).slice(-2);
  var second = ("0" + now.getSeconds()).slice(-2);
  return day + "/" + month + "/" + year + " " + hour + ":" + minute ;
}

// get date from timestamp in format DD MMMM YYYY HH:MM:SS
function getDateFromTimestamp(timestamp) {
  var date = new Date(timestamp * 1000);
  var day = ("0" + date.getDate()).slice(-2);
  var month = getMonth(date.getMonth());
  var year = date.getFullYear();
  var hour = ("0" + date.getHours()).slice(-2);
  var minute = ("0" + date.getMinutes()).slice(-2);
  var second = ("0" + date.getSeconds()).slice(-2);
  return day + " " + month + " " + year + " " + hour + ":" + minute + ":" + second;
}

// function for get litteral month
function getMonth(month) {
  switch (month) {
    case 0:
      return "Janvier";
    case 1:
      return "Février";
    case 2:
      return "Mars";
    case 3:
      return "Avril";
    case 4:
      return "Mai";
    case 5:
      return "Juin";
    case 6:
      return "Juillet";
    case 7:
      return "Août";
    case 8:
      return "Septembre";
    case 9:
      return "Octobre";
    case 10:
      return "Novembre";
    case 11:
      return "Décembre";
    default:
      return "";
  }
}

// function for titlecase string 
function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}