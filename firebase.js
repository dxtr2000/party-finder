// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw9ePm6V0xK7_TeAM4NW7m6OzTeW1YPSg",
  authDomain: "party-finder-3e8d2.firebaseapp.com",
  projectId: "party-finder-3e8d2",
  storageBucket: "party-finder-3e8d2.appspot.com",
  messagingSenderId: "3812287322",
  appId: "1:3812287322:web:f7c930f002662d06810963",
  measurementId: "G-7BGQ6XMHPY",
};

// Initialize Firebase
app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
