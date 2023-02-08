
import firebase from "firebase-admin";
import { getFirestore } from 'firebase-admin/firestore'

const serviceAccount = require("../firebase-config.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://skipli-7fdaf.asia-southeast1.firebaseio.com",
  
  });
  
 export const db = getFirestore();
  