import express from "express";
import firebase from "firebase-admin";
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore'


// import  serviceAccount from "../firebase-config.json";
const serviceAccount = require("../firebase-config.json");
// console.log(serviceAccount);

const router = express.Router();
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://skipli-7fdaf.asia-southeast1.firebaseio.com",

});

const db = getFirestore();


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const userRecord = await firebase.auth().getUserByEmail(email);
      const { uid } = userRecord;
      const token = await firebase.auth().createCustomToken(uid);
      
      res.status(200).send({ token });
    } catch (error) {
      res.status(400).send({ error });
    }
  });

  router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const userRecord = await firebase.auth().createUser({
        email,
        password,
      });
  
      const { uid } = userRecord;
      const token = await firebase.auth().createCustomToken(uid);
  
      res.status(201).send({ token });
    } catch (error) {
      res.status(400).send({ error });
    }
  });

  router.post("/CreateNewAccessCode", async (req, res) => {
    const { user } = req.body;
    const accessCode = Math.floor(100000 + Math.random() * 900000);
  
    try {
      console.log(user, accessCode);
        
        const docRef = db.collection('users').doc(user);
        await docRef.set({
            accessCode
        })
      res.status(201).send({ message: "Phone number and access code saved." });
    } catch (error) {
      res.status(400).send({ error });
    }
  });

  router.post("/ValidateAccessCode", async (req, res) => {
    const { user, accessCode } = req.body;
  
    try {
        const userRef  = db.collection(`users`).doc(user)
        const doc = await userRef.get();
        if (!doc.exists) {
            res.status(201).send({ message: "Can not find this phone number." });
        } else {
            const data = doc.data()
            if(data?.accessCode === accessCode) {
                const docRef = db.collection('users').doc(user);
                await docRef.set({
                    accessCode: ''
                })
                res.status(200).send({ message: "Successfully" });
            }
            else {
                res.status(400).send({ message: "Invalid access code" });
            }
        }
    } catch (error) {
      res.status(400).send({ error: error });
    }
  });

export default router;