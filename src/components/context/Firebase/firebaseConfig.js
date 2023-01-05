// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEDUWUMS-ByWkUjbO4Vcx0sj-HorBBNEk",
  authDomain: "drbs-80927.firebaseapp.com",
  projectId: "drbs-80927",
  storageBucket: "drbs-80927.appspot.com",
  messagingSenderId: "973748628011",
  appId: "1:973748628011:web:b3fb8ba42a9d528bc2186e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app)
export default app;

// 