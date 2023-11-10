// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5T8fA70kZNvXi0wu11DNuKLQNV9QCh3E",
  authDomain: "calcraft-17854.firebaseapp.com",
  projectId: "calcraft-17854",
  storageBucket: "calcraft-17854.appspot.com",
  messagingSenderId: "987663253944",
  appId: "1:987663253944:web:8b124781695b58cd344f4d",
  measurementId: "G-H9Z5JW6M86"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };