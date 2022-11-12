// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj3By2km8BQH69aaIaGjMOYLwxn-W74Go",
  authDomain: "alap-ac48f.firebaseapp.com",
  databaseURL: "https://alap-ac48f-default-rtdb.firebaseio.com",
  projectId: "alap-ac48f",
  storageBucket: "alap-ac48f.appspot.com",
  messagingSenderId: "839716037978",
  appId: "1:839716037978:web:5bf73b0b62073528743f63",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default firebaseConfig;
