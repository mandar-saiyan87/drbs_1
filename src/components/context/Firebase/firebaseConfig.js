// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCUsbNKIiDG0YVMhFGjV3jVg9ZbtFr5fA",
  authDomain: "drbs-6f8bc.firebaseapp.com",
  projectId: "drbs-6f8bc",
  storageBucket: "drbs-6f8bc.appspot.com",
  messagingSenderId: "866973011045",
  appId: "1:866973011045:web:5ce11e7a94aab7bff74a8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app)
export default app;

// 