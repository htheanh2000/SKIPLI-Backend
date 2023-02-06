import express from "express";
import firebase from "firebase-admin";
import { Request, Response } from 'express';


// import  serviceAccount from "../firebase-config.json";
var serviceAccount = require("../firebase-config.json");
// console.log(serviceAccount);

const router = express.Router();
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});
router.post("/login", async (req:Request, res: Response) => {
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

export default router;