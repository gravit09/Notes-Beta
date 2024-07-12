import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "notes-fd0ba.firebaseapp.com",
  projectId: "notes-fd0ba",
  storageBucket: "notes-fd0ba.appspot.com",
  messagingSenderId: "114277320549",
  appId: "1:114277320549:web:61df2f0c083335b6a7838c",
  measurementId: "G-X74WCXS51J",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
