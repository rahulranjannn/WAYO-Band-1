// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzk9LJwH9kcH9ylSp9qYrs3zHe_LxiaK0",
  authDomain: "wayo-723f8.firebaseapp.com",
  projectId: "wayo-723f8",
  storageBucket: "wayo-723f8.firebasestorage.app",
  messagingSenderId: "934366191139",
  appId: "1:934366191139:web:d2947dfad9d6779a20db96",
  measurementId: "G-M9EBB66NLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
