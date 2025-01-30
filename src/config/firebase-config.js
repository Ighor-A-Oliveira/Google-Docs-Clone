// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7PFMWtknOvU7_lWvj5FOgeeI-M_n4bAo",
  authDomain: "docs-clone-488f2.firebaseapp.com",
  projectId: "docs-clone-488f2",
  storageBucket: "docs-clone-488f2.firebasestorage.app",
  messagingSenderId: "998590469822",
  appId: "1:998590469822:web:a791a4cdddeb196c0570ef"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);