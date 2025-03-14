// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpQhEWtscssmq86PZaye8-GEHQ5KBNX-Q",
  authDomain: "chez-flora.firebaseapp.com",
  projectId: "chez-flora",
  storageBucket: "chez-flora.firebasestorage.app",
  messagingSenderId: "1095419534958",
  appId: "1:1095419534958:web:507fc1b2f44567bc02d07f",
  measurementId: "G-CNP0SYD4FR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, auth, storage };
