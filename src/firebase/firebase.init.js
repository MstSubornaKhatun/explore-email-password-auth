// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsvOGz3SAEkIxtU9NBq-U1na4SwdzyPmQ",
  authDomain: "explore-email-password-a-89140.firebaseapp.com",
  projectId: "explore-email-password-a-89140",
  storageBucket: "explore-email-password-a-89140.firebasestorage.app",
  messagingSenderId: "713379165161",
  appId: "1:713379165161:web:2f9fd02e948621eaf3d178"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);