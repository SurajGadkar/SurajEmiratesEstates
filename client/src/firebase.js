// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "emiratesestate-2829e.firebaseapp.com",
  projectId: "emiratesestate-2829e",
  storageBucket: "emiratesestate-2829e.appspot.com",
  messagingSenderId: "33280776386",
  appId: "1:33280776386:web:5b1c065c6c4048bf5b435b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
