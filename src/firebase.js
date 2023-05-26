// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXtka8d0OWiEF1m-V9rgYxZ941wpRtBV8",
  authDomain: "camtom-b6444.firebaseapp.com",
  databaseURL: "https://camtom-b6444-default-rtdb.firebaseio.com",
  projectId: "camtom-b6444",
  storageBucket: "camtom-b6444.appspot.com",
  messagingSenderId: "457055614874",
  appId: "1:457055614874:web:52b5e6b7b6a52cdef7ac23",
  measurementId: "G-MECF6GYS0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
const analytics = getAnalytics(app);