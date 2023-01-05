// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkFqQJ0n3B6s2Xl8S7WMiAY66WLvSRBIA",
  authDomain: "drbs-f24ae.firebaseapp.com",
  projectId: "drbs-f24ae",
  storageBucket: "drbs-f24ae.appspot.com",
  messagingSenderId: "309930952665",
  appId: "1:309930952665:web:dd600bbcb17822fb7fbbc8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app)
export default app;

// 