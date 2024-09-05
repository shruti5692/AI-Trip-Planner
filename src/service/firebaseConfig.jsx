// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4QAbOrcw5p4yW2bsbwsgL693FeuCMmGg",
  authDomain: "ai-trip-planner-811ea.firebaseapp.com",
  projectId: "ai-trip-planner-811ea",
  storageBucket: "ai-trip-planner-811ea.appspot.com",
  messagingSenderId: "357187689532",
  appId: "1:357187689532:web:00e8fe49a1da84be57f739",
  measurementId: "G-SRFFSYPRHV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)
// const analytics = getAnalytics(app);