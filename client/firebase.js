// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyAt13T0TBaydAB8JhBHAQXWfTqpRIM8mUs",
  // apikey:import.meta.env.VITE_FIRBASE_API_KEY,
  authDomain: "meran-estate.firebaseapp.com",
  projectId: "meran-estate",
  storageBucket: "meran-estate.appspot.com",
  messagingSenderId: "381148549499",
  appId: "1:381148549499:web:df929ae8b31392db0a2dde"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
