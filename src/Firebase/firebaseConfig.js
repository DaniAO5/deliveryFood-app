// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBl8MOs-fKHoa_4lSvY4PHaRa8zEtVo_eU",
  authDomain: "food-delivery-27d7b.firebaseapp.com",
  projectId: "food-delivery-27d7b",
  storageBucket: "food-delivery-27d7b.appspot.com",
  messagingSenderId: "945034368747",
  appId: "1:945034368747:web:79a67b1271493818dd10ae",
  measurementId: "G-KZLLE6VHGY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const dataBase = getFirestore(app);
export const google = new GoogleAuthProvider();
export const facebook = new FacebookAuthProvider();