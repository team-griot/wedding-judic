import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBiaz0Sr6fWNsWQ5ZchnfT2Lxoy59lbBH8",
    authDomain: "jp-wedding-comment.firebaseapp.com",
    projectId: "jp-wedding-comment",
    storageBucket: "jp-wedding-comment.appspot.com",
    messagingSenderId: "520675207059",
    appId: "1:520675207059:web:d44d6bdd232307d09f6a66",
    measurementId: "G-H5WGJ15SVY"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export default db;