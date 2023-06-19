// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB39049lZfBF7EmA_z3JLQpsFkAPOT9M1w",
  authDomain: "podcast-app-react-56795.firebaseapp.com",
  projectId: "podcast-app-react-56795",
  storageBucket: "podcast-app-react-56795.appspot.com",
  messagingSenderId: "847279296146",
  appId: "1:847279296146:web:b69ce64096bcca2f36204b",
  measurementId: "G-QMXJTSE82K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const storage=getStorage(app);
const auth=getAuth(app);
export{auth,db,storage}
