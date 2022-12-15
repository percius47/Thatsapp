import "firebase/auth";
import "firebase/firestore";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/storage';


import { getStorage } from "@firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})


const provider = new GoogleAuthProvider();
// const auth = app.auth()
const auth = getAuth();
const db = firebase.firestore();
// const provider = new firebase.auth.GoogleAuthProvider();
const storage=getStorage(app);
export { app,db,storage,auth,provider }