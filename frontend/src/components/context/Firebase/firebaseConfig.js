// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUpI092ArBNHrguueF6hQPrhqxsNUueXE",
  authDomain: "drbs-4d97a.firebaseapp.com",
  projectId: "drbs-4d97a",
  storageBucket: "drbs-4d97a.appspot.com",
  messagingSenderId: "337612622586",
  appId: "1:337612622586:web:39c8412fd72bd92b76d743"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app)
export default app;

// 