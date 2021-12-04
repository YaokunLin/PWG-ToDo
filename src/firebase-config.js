
// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, updateDoc
} from 'firebase/firestore'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut
} from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQaAtiEoC5SrhLiirt5yxHOlQhVA5DbKk",
  authDomain: "pwg-todo.firebaseapp.com",
  projectId: "pwg-todo",
  storageBucket: "pwg-todo.appspot.com",
  messagingSenderId: "197838593153",
  appId: "1:197838593153:web:c4524c8e859ca4bb044180",
  measurementId: "G-HBLG62XS8N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);




