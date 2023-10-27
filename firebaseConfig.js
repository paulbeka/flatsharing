// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD5H5qw9yGTSz64JIgIQXDw-iIa8I-cy0",
  authDomain: "flatsharing-c0dfe.firebaseapp.com",
  projectId: "flatsharing-c0dfe",
  storageBucket: "flatsharing-c0dfe.appspot.com",
  messagingSenderId: "211032401088",
  appId: "1:211032401088:web:d1066629784cd9382ab925",
  measurementId: "G-TGHW6GKH0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);