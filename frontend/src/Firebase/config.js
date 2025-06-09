// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADgtpM2wpuAe1kXwTUscT10cM6c56OQL8",
  authDomain: "orderly-be13f.firebaseapp.com",
  projectId: "orderly-be13f",
  storageBucket: "orderly-be13f.firebasestorage.app",
  messagingSenderId: "1062300890523",
  appId: "1:1062300890523:web:77021f02306ef076201d3e",
  measurementId: "G-GKCY165KLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
// const analytics = getAnalytics(app);