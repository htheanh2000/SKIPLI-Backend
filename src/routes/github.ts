import express from "express";
import axios from 'axios';
import { db } from "../models/firebase";
import { firestore } from "firebase-admin";
import { log } from "console";
import {checkLiked} from '../models/github'
const router = express.Router();

router.get("/searchGithubUsers", async (req, res) => {
    const query = req.query;
    const user = req.headers.user as string;
    try {
        const response:any = await axios.get('https://api.github.com/search/users', {params: query});
        
        let newItems = [];
        for (const item of response.data.items) {
            const isLiked = await  checkLiked(user,item.id)
            newItems.push({
                ...item,
                isLiked
            })
          }
        
        const merged = {
            ...response.data,
            items: newItems
        };
        res.json(merged);
    } catch (error) {
      res.status(400).send({ error });
    }
  });

  router.post("/likeGithubUser", async (req, res) => {
    const {github_user_id, user } = req.body;
    try {
        const favoriteRef = db.collection(`/users`).doc(user);
        const userData = (await favoriteRef.get()).data()
        let response 
        if(await checkLiked(user, github_user_id)) {
            // remove the user from array
            response = await favoriteRef.update({
                githubUserId: firestore.FieldValue.arrayRemove(github_user_id)
            });
        }
        else {
            response = await favoriteRef.update({
                githubUserId: firestore.FieldValue.arrayUnion(github_user_id)
            });
        }
        res.status(201).send({message: 'Likes User Successfully', data: response});
    } catch (error) {
      res.status(400).send({ error });
    }
  });



export default router;