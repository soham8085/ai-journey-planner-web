// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgGtA6NW629e3hNjqIcG49xsgnkee7bow",
  authDomain: "ai-trip-planner-c8437.firebaseapp.com",
  projectId: "ai-trip-planner-c8437",
  storageBucket: "ai-trip-planner-c8437.firebasestorage.app",
  messagingSenderId: "520378096120",
  appId: "1:520378096120:web:8e698bbec87be953655e0d",
  measurementId: "G-CGWH8ZDVV9"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
//const analytics = getAnalytics(app);