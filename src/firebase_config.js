import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite"
import { getAuth } from "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB6d_aWBnZOw7nxAXt7-dtJe_dyO1v3MzA",
  authDomain: "moveo-3a660.firebaseapp.com",
  projectId: "moveo-3a660",
  storageBucket: "moveo-3a660.appspot.com",
  messagingSenderId: "457183404273",
  appId: "1:457183404273:web:cd86f1b64a0931819b0950",
  measurementId: "G-PCFNJD264Q"
};

  const app = initializeApp(firebaseConfig);
  const db=getFirestore(app);
  const auth = getAuth(app);

  export {auth,db, app}

  