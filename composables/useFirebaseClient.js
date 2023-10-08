// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxwpXvwH1-CWaWyc7N4tKMHpCN2ZbEc20",
  authDomain: "nuxt3-yugioh.firebaseapp.com",
  projectId: "nuxt3-yugioh",
  storageBucket: "nuxt3-yugioh.appspot.com",
  messagingSenderId: "28457974785",
  appId: "1:28457974785:web:a058d2bc3d5a99e9485400",
  measurementId: "G-1ZSEZ1SG5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function useFirebaseClient() {
  const auth = getAuth(app)
  return { auth, app}
}