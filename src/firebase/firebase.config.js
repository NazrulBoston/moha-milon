// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPQBHJdtanjbht0JHT99RhYWbrY0Lw4bI",
  authDomain: "moha-milon-d2f16.firebaseapp.com",
  projectId: "moha-milon-d2f16",
  storageBucket: "moha-milon-d2f16.appspot.com",
  messagingSenderId: "167678192344",
  appId: "1:167678192344:web:90e89b2c5b7d4b65fcc5ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
